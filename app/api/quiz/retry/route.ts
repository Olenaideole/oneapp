import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"
import { Resend } from "resend"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    // Get failed reports from the last 24 hours
    const { data: failedReports, error } = await supabase
      .from("quiz_responses")
      .select("*")
      .eq("report_status", "failed")
      .lt("retry_count", 3)
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    if (error) {
      console.error("Error fetching failed reports:", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    let retryCount = 0
    let successCount = 0

    for (const report of failedReports || []) {
      try {
        retryCount++

        // Re-generate AI response if needed
        if (!report.xai_response) {
          const formattedResponses = Object.entries(report.responses)
            .map(([question, answer]) => `${question}: ${answer}`)
            .join("\n")

          const aiPrompt = `You are an expert AI business coach. The user has just completed a quiz called "The AI Money Test" with the goal of understanding how they can use AI tools to make money based on their personality, skills, time, and risk tolerance.

Based on their answers below, write a clear, motivating personal report (400–600 words) that includes:

1. A monthly income potential in USD (based on similar personas).
2. What type of AI income model fits them best (e.g. content, reselling, productized service, affiliate, expert tools, etc.).
3. Strengths and weak spots in their approach or mindset.
4. An optional motivational name or badge (like "The Quiet Builder" or "The Dopamine Hustler").
5. One AI idea they can implement in 48 hours.

User answers:
${formattedResponses}

Be precise and human. Avoid fluff. Use concrete examples. Assume the user is smart but early in their journey.`

          const { text: aiResponse } = await generateText({
            model: xai("grok-3"),
            prompt: aiPrompt,
            maxTokens: 1000,
          })

          // Update with AI response
          await supabase.from("quiz_responses").update({ xai_response: aiResponse }).eq("id", report.id)

          report.xai_response = aiResponse
        }

        // Parse and send email (reuse logic from submit route)
        const incomeMatch = report.xai_response.match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g)
        const monthlyIncome = incomeMatch ? Number.parseInt(incomeMatch[0].replace(/[$,]/g, "")) : 1000

        const badgeMatch = report.xai_response.match(
          /"([^"]*(?:Builder|Hustler|Creator|Guide|Thinker|Explorer)[^"]*)"|The\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
        )
        const badge = badgeMatch ? badgeMatch[1] || badgeMatch[2] || "AI Entrepreneur" : "AI Entrepreneur"

        // Generate email HTML (simplified version)
        const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your AI Money Test Results</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background: white;">
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 40px 30px; text-align: center;">
      <h1>🧠 Your AI Money Test Results</h1>
      <p>Personalized insights for ${report.email}</p>
    </div>
    
    <div style="padding: 30px;">
      <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 50px; padding: 15px 25px; text-align: center; margin: 20px 0;">
        <h2>🏆 Your AI Archetype: ${badge}</h2>
      </div>
      
      <div style="background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 25px; text-align: center; margin: 20px 0;">
        <h2>💰 Your Monthly Income Potential</h2>
        <div style="font-size: 36px; font-weight: bold; color: #10b981;">$${monthlyIncome.toLocaleString()}</div>
        <p>Based on your skills and commitment level</p>
      </div>
      
      <div style="margin: 25px 0; padding: 20px; background: #f8fafc; border-radius: 8px;">
        <h3>📋 Your Complete Analysis</h3>
        <div style="white-space: pre-line; background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          ${report.xai_response}
        </div>
      </div>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="https://oneappperday.com" style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: bold;">🚀 Get the Complete Guide - $32</a>
        <p style="font-size: 14px; color: #6b7280;">Ready to turn this potential into reality?</p>
      </div>
    </div>
  </div>
</body>
</html>
        `

        // Send email
        const { error: emailError } = await resend.emails.send({
          from: "AI Money Test <noreply@oneappperday.com>",
          to: [report.email],
          subject: `🧠 Your AI Money Test Results - $${monthlyIncome.toLocaleString()}/month potential!`,
          html: emailHTML,
        })

        if (emailError) {
          // Update retry count
          await supabase
            .from("quiz_responses")
            .update({
              retry_count: report.retry_count + 1,
              error_log: emailError.message,
            })
            .eq("id", report.id)
        } else {
          // Mark as sent
          await supabase
            .from("quiz_responses")
            .update({
              report_status: "sent",
              estimated_income: monthlyIncome,
              sent_at: new Date().toISOString(),
            })
            .eq("id", report.id)

          successCount++
        }
      } catch (error) {
        console.error(`Error retrying report ${report.id}:`, error)

        // Update retry count
        await supabase
          .from("quiz_responses")
          .update({
            retry_count: report.retry_count + 1,
            error_log: error instanceof Error ? error.message : "Unknown error",
          })
          .eq("id", report.id)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${retryCount} failed reports, ${successCount} sent successfully`,
    })
  } catch (error) {
    console.error("Retry mechanism error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
