"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { handleCheckout } from "@/lib/stripe-helpers"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  ArrowLeft,
  User,
  Code,
  DollarSign,
  Rocket,
  Mail,
  Lock,
  CheckCircle,
  Timer,
  Zap,
  Target,
  Lightbulb,
  Shield,
  TrendingUp,
  Loader2,
} from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  question: string
  options: string[]
  type: "single" | "text"
}

interface Block {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  questions: Question[]
  badge?: {
    condition: (answers: Record<string, string>) => boolean
    name: string
    emoji: string
  }
}

const quizBlocks: Block[] = [
  {
    id: "background",
    title: "Your Background & Habits",
    icon: <User className="h-6 w-6" />,
    color: "bg-blue-500",
    questions: [
      {
        id: "profession",
        question: "What's your current profession?",
        options: ["Student", "Freelancer", "Entrepreneur", "Corporate employee", "Unemployed"],
        type: "single",
      },
      {
        id: "hours",
        question: "How many hours a week can you dedicate to learning or building with AI?",
        options: ["Less than 3 hours", "3–7 hours", "8–15 hours", "Full time"],
        type: "single",
      },
      {
        id: "online_income",
        question: "Do you already earn money online?",
        options: ["Yes, full-time", "Yes, part-time", "Not yet, but I want to", "No"],
        type: "single",
      },
      {
        id: "monthly_income",
        question: "What's your monthly income right now (USD)?",
        options: ["0–500", "500–2,000", "2,000–5,000", "5,000+"],
        type: "single",
      },
      {
        id: "comfort_tools",
        question: "How comfortable are you with using new tools?",
        options: ["I love experimenting", "I try sometimes", "I find it overwhelming", "I avoid it unless I must"],
        type: "single",
      },
    ],
    badge: {
      condition: (answers) => answers.comfort_tools === "I love experimenting",
      name: "The Tinkerer",
      emoji: "🧪",
    },
  },
  {
    id: "skills",
    title: "Skills & Tech Savviness",
    icon: <Code className="h-6 w-6" />,
    color: "bg-green-500",
    questions: [
      {
        id: "coding",
        question: "Can you write basic code (any language)?",
        options: [
          "Yes, comfortably",
          "Only with help from AI",
          "No, but I'm willing to learn",
          "No, and not interested",
        ],
        type: "single",
      },
      {
        id: "writing",
        question: "What's your writing skill level?",
        options: [
          "I write professionally",
          "I can write decent content",
          "I dislike writing",
          "I use AI to help with it",
        ],
        type: "single",
      },
      {
        id: "digital_products",
        question: "Have you created any digital products before?",
        options: ["Yes, multiple times", "Once or twice", "No, but I want to", "No, and I'm not sure how"],
        type: "single",
      },
      {
        id: "ai_tools",
        question: "Are you familiar with tools like ChatGPT, Midjourney, or Claude?",
        options: ["I use them often", "I've tried a few", "I've heard of them", "Not really"],
        type: "single",
      },
    ],
    badge: {
      condition: (answers) => answers.digital_products === "Yes, multiple times",
      name: "Digital Maker",
      emoji: "🛠",
    },
  },
  {
    id: "monetization",
    title: "Monetization Style & Vision",
    icon: <DollarSign className="h-6 w-6" />,
    color: "bg-purple-500",
    questions: [
      {
        id: "exciting",
        question: "What sounds most exciting to you?",
        options: [
          "Selling AI tools or templates",
          "Automating a business",
          "Creating viral AI content",
          "Helping others use AI (coaching/consulting)",
          "Building a SaaS product",
        ],
        type: "single",
      },
      {
        id: "preference",
        question: "Would you prefer:",
        options: ["Fast side-income (small wins)", "Building long-term value (bigger vision)", "Both"],
        type: "single",
      },
      {
        id: "audience",
        question: "How big is your online audience?",
        options: ["None", "< 1,000", "1,000–10,000", "10,000+"],
        type: "single",
      },
      {
        id: "selling",
        question: "Do you like selling?",
        options: ["I love it", "I do it if I have to", "I avoid it", "I prefer to partner with others"],
        type: "single",
      },
    ],
    badge: {
      condition: (answers) => answers.exciting === "Helping others use AI (coaching/consulting)",
      name: "The Guide",
      emoji: "🤝",
    },
  },
  {
    id: "readiness",
    title: "Readiness & Momentum",
    icon: <Rocket className="h-6 w-6" />,
    color: "bg-orange-500",
    questions: [
      {
        id: "timeline",
        question: "How soon do you want to start earning with AI?",
        options: ["Immediately", "In the next 3 months", "Within the year", "I'm just exploring"],
        type: "single",
      },
      {
        id: "obstacles",
        question: "What's stopping you right now?",
        options: [
          "I don't know where to start",
          "No time",
          "Fear of failure",
          "Lack of tech skills",
          "I already started",
        ],
        type: "single",
      },
      {
        id: "investment",
        question: "How much are you willing to invest in learning/launching something?",
        options: ["$0 – I want free only", "Up to $50", "Up to $500", "More, if it's worth it"],
        type: "single",
      },
      {
        id: "goal",
        question: "What's your main goal with AI?",
        options: [
          "Financial freedom",
          "Creative freedom",
          "Automating boring work",
          "Staying competitive",
          "Exploring the future",
        ],
        type: "single",
      },
      {
        id: "idea",
        question: "Do you already have an idea for using AI to earn money?",
        options: ["Yes, it's specific", "Kind of", "No, I need help", "No, and I'm just browsing"],
        type: "single",
      },
      {
        id: "personality",
        question: "What best describes you?",
        options: ["Visionary", "Doer", "Thinker", "Explorer"],
        type: "single",
      },
      {
        id: "bonus",
        question: "If you could earn $5,000/month with AI, what would you do first?",
        options: [],
        type: "text",
      },
    ],
    badge: {
      condition: (answers) => answers.personality === "Visionary",
      name: "Big Picture Thinker",
      emoji: "🌟",
    },
  },
]

export default function QuizPage() {
  const [currentBlock, setCurrentBlock] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([])
  const [showEmailGate, setShowEmailGate] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribe, setSubscribe] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [reportData, setReportData] = useState<{ estimatedIncome: number; badge: string } | null>(null)

  const totalQuestions = quizBlocks.reduce((sum, block) => sum + block.questions.length, 0)
  const answeredQuestions = Object.keys(answers).length
  const progress = (answeredQuestions / totalQuestions) * 100

  useEffect(() => {
    if (showPaywall && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showPaywall, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    // Check for badge unlock
    const currentBlockData = quizBlocks[currentBlock]
    if (currentBlockData.badge && currentBlockData.badge.condition(newAnswers)) {
      if (!unlockedBadges.includes(currentBlockData.badge.name)) {
        setUnlockedBadges([...unlockedBadges, currentBlockData.badge.name])
      }
    }
  }

  const nextQuestion = () => {
    const currentBlockData = quizBlocks[currentBlock]
    if (currentQuestion < currentBlockData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentBlock < quizBlocks.length - 1) {
      setCurrentBlock(currentBlock + 1)
      setCurrentQuestion(0)
    } else {
      setShowEmailGate(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (currentBlock > 0) {
      setCurrentBlock(currentBlock - 1)
      setCurrentQuestion(quizBlocks[currentBlock - 1].questions.length - 1)
    }
  }

  const handleEmailSubmit = async () => {
    if (!email) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          responses: answers,
          subscribe,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quiz")
      }

      // Store report data and show paywall
      setReportData({
        estimatedIncome: data.estimatedIncome,
        badge: data.badge,
      })
      setShowPaywall(true)
    } catch (error) {
      console.error("Quiz submission error:", error)
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Paywall Screen
  if (showPaywall) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center">
          <CardContent className="p-0">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">📧 Report Sent Successfully!</h1>
              <p className="text-gray-600 mb-4">
                Check your email for your personalized AI Money Test results
                {reportData && (
                  <span className="block mt-2 text-blue-600 font-semibold">
                    Your potential: ${reportData.estimatedIncome.toLocaleString()}/month as {reportData.badge}
                  </span>
                )}
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <Timer className="h-5 w-5 text-orange-500 mr-2" />
                <span className="font-semibold text-orange-700">Limited-Time Offer expires in:</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{formatTime(timeLeft)}</div>
            </div>

            <div className="mb-6">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">🔓 Ready to Turn This Into Reality?</h2>
              <p className="text-gray-600">Get the complete step-by-step guide to start earning with AI</p>
            </div>

            <div className="text-left mb-6 space-y-3">
              <h3 className="font-semibold text-lg mb-3">What you get:</h3>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Complete step-by-step Notion guide with screenshots</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">List of proven AI & no-code tools that actually work</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">AI-generated ad copy & headlines templates</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Payment and analytics integration guides</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Ready-to-use funnel templates</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Common mistakes to avoid (save months of trial & error)</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <span className="line-through text-gray-400 text-2xl mr-2">$43</span>
                $32
              </div>
              <p className="text-blue-700 font-semibold">Save $11 with this limited offer!</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4 text-center">What others are saying:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-yellow-400 text-xs mb-1">⭐️⭐️⭐️⭐️⭐️</div>
                  <p className="text-gray-700 mb-2">
                    "Didn't expect much, but this blew me away. The report showed me exactly which skills I'm
                    underusing. Already landed my first AI-powered gig!"
                  </p>
                  <div className="font-semibold text-xs text-gray-600">Emily R. – Freelance Designer</div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <div className="text-yellow-400 text-xs mb-1">⭐️⭐️⭐️⭐️⭐️</div>
                  <p className="text-gray-700 mb-2">
                    "This test saved me weeks of research. I finally understand how to plug my skills into AI trends.
                    Worth every dollar."
                  </p>
                  <div className="font-semibold text-xs text-gray-600">Liam M. – Marketer</div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <div className="text-yellow-400 text-xs mb-1">⭐️⭐️⭐️⭐️½</div>
                  <p className="text-gray-700 mb-2">
                    "It felt like it was made just for me. I didn't realize I could actually earn from AI without
                    coding."
                  </p>
                  <div className="font-semibold text-xs text-gray-600">Sophie T. – Stay-at-home mom</div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <div className="text-yellow-400 text-xs mb-1">⭐️⭐️⭐️⭐️⭐️</div>
                  <p className="text-gray-700 mb-2">
                    "Loved the breakdown. The badges were fun, and the guide pointed me to 3 ideas I'm now building
                    out."
                  </p>
                  <div className="font-semibold text-xs text-gray-600">Arjun S. – Developer</div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <div className="text-yellow-400 text-xs mb-1">⭐️⭐️⭐️⭐️⭐️</div>
                  <p className="text-gray-700 mb-2">
                    "Super clear, quick, and motivating. The test made me feel like the AI gold rush isn't just for
                    Silicon Valley."
                  </p>
                  <div className="font-semibold text-xs text-gray-600">Daniel C. – Student</div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <div className="text-yellow-400 text-xs mb-1">⭐️⭐️⭐️⭐️</div>
                  <p className="text-gray-700 mb-2">
                    "The report showed me new income channels using my content skills + AI. Already trying one of them
                    this week."
                  </p>
                  <div className="font-semibold text-xs text-gray-600">Jasmine K. – Content Creator</div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4"
              onClick={() => handleCheckout("price_12345")}
            >
              <Zap className="mr-2 h-6 w-6" />
              Get Complete Guide - $32
            </Button>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center justify-center">
                <Lightbulb className="h-4 w-4 mr-1" />
                Save 50+ hours of research
              </div>
              <div className="flex items-center justify-center">
                <Target className="h-4 w-4 mr-1" />
                Eliminate confusion
              </div>
              <div className="flex items-center justify-center">
                <Shield className="h-4 w-4 mr-1" />
                100% secure payment
              </div>
              <div className="flex items-center justify-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Money-back guarantee
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Join 1,000+ entrepreneurs who've unlocked their AI earning potential
            </p>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                📧 Your personalized report has been sent to <strong>{email}</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Check your inbox (and spam folder) for your detailed analysis
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showEmailGate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-8 text-center">
          <CardContent className="p-0">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">✅ Almost Done!</h1>
            <h2 className="text-xl text-gray-600 mb-6">Get Your Personalized Report</h2>

            <div className="text-left mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your email to receive your detailed results & opportunities:
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mb-4"
                disabled={isSubmitting}
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="subscribe"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                  className="rounded"
                  disabled={isSubmitting}
                />
                <label htmlFor="subscribe" className="text-sm text-gray-600">
                  Subscribe for weekly AI money tips
                </label>
              </div>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-sm">{submitError}</p>
              </div>
            )}

            <Button
              onClick={handleEmailSubmit}
              disabled={!email || isSubmitting}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Your Report...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-5 w-5" />
                  Show My Results
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 mt-4">
              We'll send you a personalized report with your AI earning potential within minutes.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentBlockData = quizBlocks[currentBlock]
  const currentQuestionData = currentBlockData.questions[currentQuestion]
  const currentAnswer = answers[currentQuestionData.id] || ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <span className="text-xl font-bold text-gray-900">One App Per Day</span>
          </Link>
          <div className="text-sm text-gray-600">
            Question {answeredQuestions + 1} of {totalQuestions}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Progress: {Math.round(progress)}%</span>
            <span>
              {unlockedBadges.length > 0 && (
                <span className="text-blue-600 font-semibold">
                  🏆 {unlockedBadges.length} badge{unlockedBadges.length !== 1 ? "s" : ""} unlocked!
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8">
            {/* Block Header */}
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center space-x-2 ${currentBlockData.color} text-white px-4 py-2 rounded-full mb-4`}
              >
                {currentBlockData.icon}
                <span className="font-semibold">
                  Block {currentBlock + 1}: {currentBlockData.title}
                </span>
              </div>

              {currentBlock === 0 && currentQuestion === 0 && (
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">🧠 How Much Can You Earn With AI?</h1>
                  <p className="text-xl text-gray-600">Take this free quiz and get your personalized report.</p>
                </div>
              )}
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestionData.question}</h2>

              {currentQuestionData.type === "single" ? (
                <div className="space-y-3">
                  {currentQuestionData.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(currentQuestionData.id, option)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 ${
                        currentAnswer === option
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            currentAnswer === option ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}
                        >
                          {currentAnswer === option && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <Textarea
                  value={currentAnswer}
                  onChange={(e) => handleAnswer(currentQuestionData.id, e.target.value)}
                  placeholder="Share your thoughts..."
                  className="min-h-[120px]"
                />
              )}
            </div>

            {/* Badge Unlock Animation */}
            {currentBlockData.badge &&
              currentBlockData.badge.condition(answers) &&
              unlockedBadges.includes(currentBlockData.badge.name) && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center animate-pulse">
                  <div className="text-2xl mb-2">{currentBlockData.badge.emoji}</div>
                  <div className="font-semibold text-yellow-800">Badge Unlocked: {currentBlockData.badge.name}!</div>
                </div>
              )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={prevQuestion}
                variant="outline"
                disabled={currentBlock === 0 && currentQuestion === 0}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <Button
                onClick={nextQuestion}
                disabled={!currentAnswer}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
              >
                <span>
                  {currentBlock === quizBlocks.length - 1 && currentQuestion === currentBlockData.questions.length - 1
                    ? "Finish"
                    : "Next"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
