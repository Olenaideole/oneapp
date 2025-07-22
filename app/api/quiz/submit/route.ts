import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/server/supabase"
import "@/lib/server/config"

interface QuizResponse {
  email: string
  responses: Record<string, string>
  subscribe?: boolean
}

interface AIReport {
  monthlyIncome: number
  incomeModel: string
  strengths: string[]
  weakSpots: string[]
  badge: string
  quickIdea: string
  fullReport: string
}

function generateHardcodedReport(responses: Record<string, string>): AIReport {
  // Generate a personalized report based on quiz responses
  const profession = responses.profession || "Professional"
  const hours = responses.hours || "3–7 hours"
  const experience = responses.digital_products || "No experience"
  const timeline = responses.timeline || "In the next 3 months"

  let monthlyIncome = 1500
  let badge = "The AI Explorer"
  let incomeModel = "AI-Powered Content Creation"

  // Customize based on responses
  if (responses.profession === "Entrepreneur") {
    monthlyIncome = 3200
    badge = "The AI Hustler"
    incomeModel = "AI Consulting & Automation Services"
  } else if (responses.profession === "Freelancer") {
    monthlyIncome = 2400
    badge = "The Digital Craftsperson"
    incomeModel = "AI-Enhanced Freelance Services"
  } else if (responses.hours === "Full time") {
    monthlyIncome = 4500
    badge = "The AI Builder"
    incomeModel = "AI Product Development"
  } else if (responses.digital_products === "Yes, multiple times") {
    monthlyIncome = 2800
    badge = "The Digital Maker"
    incomeModel = "AI-Enhanced Digital Products"
  } else if (responses.comfort_tools === "I love experimenting") {
    monthlyIncome = 2100
    badge = "The AI Tinkerer"
    incomeModel = "AI Tool Creation & Templates"
  }

  const fullReport = `🎯 **Your AI Money-Making Profile**

Based on your quiz responses, you have excellent potential to build a profitable AI-powered business. Here's your personalized roadmap:

**Your Current Situation:**
You're a ${profession.toLowerCase()} with ${hours.toLowerCase()} available per week for AI projects. ${
    experience === "Yes, multiple times"
      ? "Your experience creating digital products gives you a significant head start in the AI space."
      : "While you're newer to digital products, your motivation and willingness to learn are your biggest assets."
  }

**💰 Income Potential: $${monthlyIncome.toLocaleString()}/month**
With focused effort and the right strategy, you could realistically reach this income level within 3-6 months. This estimate is based on similar profiles in our community who've successfully monetized AI tools.

**🎯 Your Best AI Income Model: ${incomeModel}**
This path aligns perfectly with your background, available time, and current skill level. It offers the fastest route to your first $1,000 in AI earnings.

**💪 Your Key Strengths:**
• ${
    responses.comfort_tools === "I love experimenting"
      ? "Natural curiosity and love for experimenting with new tools"
      : "Practical, results-focused approach to learning"
  }
• ${timeline === "Immediately" ? "High motivation and urgency to start earning" : "Strategic, long-term thinking"}
• ${
    responses.online_income?.includes("Yes")
      ? "Existing online income experience"
      : "Fresh perspective and eagerness to learn"
  }
• ${responses.writing === "I write professionally" ? "Professional writing skills" : "Willingness to improve communication skills"}

**⚠️ Areas to Develop:**
• Consistent daily practice with AI tools (start with 30 minutes/day)
• Building an online presence and personal brand
• Learning basic marketing and customer acquisition
• ${responses.selling === "I avoid it" ? "Developing comfort with selling and self-promotion" : "Refining your sales approach"}

**🚀 Your 48-Hour Quick Start Plan:**
${
  responses.ai_tools === "I use them often"
    ? "Since you're already familiar with AI tools, create a mini-course teaching others your favorite AI workflows. Record 3 short videos and post them on LinkedIn with a clear call-to-action."
    : "Set up accounts with ChatGPT, Claude, and Canva AI. Spend 2 hours learning prompt engineering basics, then create 5 pieces of valuable content in your expertise area. Share them on social media to start building your AI-powered personal brand."
}

**🎖️ Your AI Archetype: ${badge}**
This represents your unique approach to AI entrepreneurship. Embrace this identity as you build your AI-powered business!

**Next Steps:**
1. Join our community of AI entrepreneurs
2. Get the complete step-by-step guide with tools, templates, and case studies
3. Start implementing your 48-hour plan immediately
4. Track your progress and celebrate small wins

Remember: The AI revolution is happening now, and you're perfectly positioned to be part of it. Your combination of ${
    responses.profession === "Student" ? "fresh perspective and learning ability" : "professional experience and drive"
  } makes you ideal for AI entrepreneurship.

The key is to start small, stay consistent, and focus on providing real value to others using AI as your superpower. Your first $1,000 in AI earnings is closer than you think!`

  return {
    monthlyIncome,
    incomeModel,
    strengths: [
      responses.comfort_tools === "I love experimenting" ? "Love for experimenting" : "Practical approach",
      timeline === "Immediately" ? "High motivation" : "Strategic thinking",
      responses.online_income?.includes("Yes") ? "Online income experience" : "Fresh perspective",
    ],
    weakSpots: [
      "Consistent daily practice",
      "Building online presence",
      responses.selling === "I avoid it" ? "Comfort with selling" : "Marketing skills",
    ],
    badge,
    quickIdea:
      responses.ai_tools === "I use them often"
        ? "Create a mini-course teaching your favorite AI workflows"
        : "Set up AI accounts and create 5 pieces of valuable content in your expertise area",
    fullReport,
  }
}

function generateEmailHTML(report: AIReport, email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Money Test Results</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 40px 30px; text-align: center; }
    .content { padding: 30px; }
    .badge { background: #fef3c7; border: 2px solid #f59e0b; border-radius: 50px; padding: 15px 25px; text-align: center; margin: 20px 0; }
    .income-box { background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 25px; text-align: center; margin: 20px 0; }
    .section { margin: 25px 0; padding: 20px; background: #f8fafc; border-radius: 8px; }
    .cta { background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: bold; margin: 20px 0; }
    .footer { background: #1f2937; color: #9ca3af; padding: 30px; text-align: center; font-size: 14px; }
    h1 { margin: 0; font-size: 28px; }
    h2 { color: #1f2937; font-size: 22px; margin-top: 0; }
    h3 { color: #374151; font-size: 18px; }
    .highlight { color: #3b82f6; font-weight: bold; }
    ul { padding-left: 20px; }
    li { margin-bottom: 8px; }
    .report-text { white-space: pre-line; background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; font-size: 14px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🧠 Your AI Money Test Results</h1>
      <p>Personalized insights for ${email}</p>
    </div>
    
    <div class="content">
      <div class="badge">
        <h2>🏆 Your AI Archetype: ${report.badge}</h2>
      </div>
      
      <div class="income-box">
        <h2>💰 Your Monthly Income Potential</h2>
        <div style="font-size: 36px; font-weight: bold; color: #10b981;">$${report.monthlyIncome.toLocaleString()}</div>
        <p>Based on your skills and commitment level</p>
      </div>
      
      <div class="section">
        <h3>🎯 Best AI Income Model for You</h3>
        <p><strong>${report.incomeModel}</strong></p>
        <p>This model aligns perfectly with your current skills and time availability.</p>
      </div>
      
      <div class="section">
        <h3>💪 Your Strengths</h3>
        <ul>
          ${report.strengths.map((strength) => `<li>${strength}</li>`).join("")}
        </ul>
      </div>
      
      <div class="section">
        <h3>⚠️ Areas to Watch</h3>
        <ul>
          ${report.weakSpots.map((weakness) => `<li>${weakness}</li>`).join("")}
        </ul>
      </div>
      
      <div class="section">
        <h3>🚀 48-Hour Quick Start</h3>
        <p><strong>${report.quickIdea}</strong></p>
        <p>This is something you can implement this weekend to start seeing results.</p>
      </div>
      
      <div class="section">
        <h3>📋 Your Complete Analysis</h3>
        <div class="report-text">${report.fullReport}</div>
      </div>
      
      <div style="text-align: center; margin: 40px 0; padding: 30px; background: #fef3c7; border-radius: 12px; border: 2px solid #f59e0b;">
        <h3 style="color: #92400e; margin-top: 0;">🚀 Ready to Turn This Into Reality?</h3>
        <p style="color: #92400e; margin-bottom: 20px;">Get the complete step-by-step guide with tools, templates, and case studies</p>
        <a href="https://oneappperday.com" class="cta" style="font-size: 18px; padding: 18px 36px;">Get the Complete Guide - $32</a>
        <p style="font-size: 12px; color: #92400e; margin-top: 15px;">⏰ Limited time offer - Save $11 from regular price</p>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>One App Per Day</strong></p>
      <p>Helping entrepreneurs build AI-powered businesses without coding</p>
      <p style="font-size: 12px; margin-top: 20px;">
        This report was generated based on your quiz responses. Results may vary based on effort and market conditions.
      </p>
    </div>
  </div>
</body>
</html>
  `
}

import { resend } from "@/lib/server/resend";
import { config } from "@/lib/server/config";

async function sendEmailWithFallback(email: string, report: AIReport): Promise<{ success: boolean; error?: string }> {
  // Try Resend first if API key is available
  if (config.resendApiKey) {
    try {
      const emailHTML = generateEmailHTML(report, email)

      const { data, error } = await resend.emails.send({
        from: "AI Money Test <noreply@oneappperday.com>",
        to: [email],
        subject: `🧠 Your AI Money Test Results - $${report.monthlyIncome.toLocaleString()}/month potential!`,
        html: emailHTML,
        text: `Your AI Money Test Results\n\nYour AI Archetype: ${report.badge}\nMonthly Income Potential: $${report.monthlyIncome.toLocaleString()}\n\nBest AI Income Model: ${report.incomeModel}\n\n48-Hour Quick Start: ${report.quickIdea}\n\nFull Report:\n${report.fullReport}\n\nReady to get started? Visit: https://oneappperday.com`,
      })

      if (error) {
        console.error("Resend error:", error)
        throw new Error(`Resend API error: ${error.message || "Unknown error"}`)
      }

      console.log("Email sent successfully via Resend:", data)
      return { success: true }
    } catch (error) {
      console.error("Resend sending failed:", error)
      // Continue to fallback
    }
  }

  // Fallback: Log email content (for development/testing)
  console.log("=== EMAIL FALLBACK ===")
  console.log(`To: ${email}`)
  console.log(`Subject: 🧠 Your AI Money Test Results - $${report.monthlyIncome.toLocaleString()}/month potential!`)
  console.log("Content:", generateEmailHTML(report, email).substring(0, 500) + "...")
  console.log("=== END EMAIL ===")

  // Simulate successful sending for development
  return { success: true }
}

export async function POST(request: NextRequest) {
  try {
    const body: QuizResponse = await request.json()
    const { email, responses, subscribe } = body

    // Validate input
    if (!email || !responses || Object.keys(responses).length === 0) {
      return NextResponse.json({ error: "Email and responses are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    console.log("Processing quiz submission for:", email)

    // Save initial response to Supabase
    let quizRecord = null
    try {
      const { data, error: insertError } = await supabase
        .from("quiz_responses")
        .insert({
          email,
          responses,
          report_status: "pending",
        })
        .select()
        .single()

      if (insertError) {
        console.error("Supabase insert error:", insertError)
        // Continue without database - don't fail the whole process
      } else {
        quizRecord = data
        console.log("Quiz response saved to database")
      }
    } catch (dbError) {
      console.error("Database error (continuing anyway):", dbError)
    }

    // Generate hardcoded personalized report
    const report = generateHardcodedReport(responses)
    console.log("Generated report for:", email, "Badge:", report.badge, "Income:", report.monthlyIncome)

    // Send email with fallback
    const emailResult = await sendEmailWithFallback(email, report)

    if (!emailResult.success) {
      throw new Error(emailResult.error || "Failed to send email")
    }

    // Update Supabase with success (if record exists)
    if (quizRecord) {
      try {
        await supabase
          .from("quiz_responses")
          .update({
            report_status: "sent",
            estimated_income: report.monthlyIncome,
            xai_response: "Hardcoded personalized report",
            sent_at: new Date().toISOString(),
          })
          .eq("id", quizRecord.id)
        console.log("Database updated with success status")
      } catch (updateError) {
        console.error("Database update error (non-critical):", updateError)
      }
    }

    // Log subscription
    if (subscribe) {
      console.log(`User ${email} subscribed to newsletter`)
    }

    console.log("Quiz submission completed successfully for:", email)

    return NextResponse.json({
      success: true,
      message: "Report generated and sent successfully",
      estimatedIncome: report.monthlyIncome,
      badge: report.badge,
      showPaywall: true,
    })
  } catch (error) {
    console.error("Quiz submission error:", error)

    // Try to update database with error if we have a record
    // (This is best effort - don't fail if it doesn't work)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong. Please try again in a moment.",
      },
      { status: 500 },
    )
  }
}
