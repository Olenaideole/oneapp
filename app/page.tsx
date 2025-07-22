"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  ArrowRight,
  CreditCard,
  Mail,
  Rocket,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Zap,
  Target,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <span className="text-xl font-bold text-gray-900">One App Per Day</span>
          </div>

          {/* Quiz Button */}
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold px-6 bg-transparent"
            asChild
          >
            <Link href="/quiz">
              <Zap className="mr-2 h-4 w-4" />
              The AI Money Test
            </Link>
          </Button>
        </div>
      </header>
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
          🚀 Launch AI-Powered Websites Fast
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Build & Launch AI-Powered Websites in <span className="text-blue-600">1 Day</span> — No Coding Needed
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          A proven guide for small business owners, freelancers, and indie makers to build, launch, and test ideas in a
          single day using AI and no-code tools.
        </p>

        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={() => scrollToSection("pricing")}
        >
          Get Instant Access — $43
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <p className="text-sm text-gray-500 mt-4">⚡ Instant access • 💰 One-time payment • 🎯 Lifetime access</p>
      </section>

      {/* Problem Section */}
      <section className="px-4 py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Stop wasting time and money on developers.
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <Clock className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Slow Development</h3>
                <p className="text-gray-600">
                  Traditional development takes weeks or months, killing your momentum and burning through your budget.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <DollarSign className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Expensive Costs</h3>
                <p className="text-gray-600">
                  Hiring developers costs thousands of dollars, making it impossible for small businesses to compete.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <Target className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Missed Opportunities</h3>
                <p className="text-gray-600">
                  While you wait for development, competitors launch faster and capture your market share.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Launch your own AI-powered site in one day
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to build, launch, and scale your digital products without writing a single line of
              code.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Full step-by-step Notion guide</h3>
                <p className="text-gray-600">Complete walkthrough with screenshots and detailed instructions</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">List of proven AI & no-code tools</h3>
                <p className="text-gray-600">Curated list of the best tools that actually work for real businesses</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">AI-generated ad copy & headlines</h3>
                <p className="text-gray-600">Ready-to-use marketing copy that converts visitors into customers</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Payment and analytics integrations</h3>
                <p className="text-gray-600">Set up payments and track your success from day one</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Funnel structure and ready-to-use templates</h3>
                <p className="text-gray-600">Proven templates that convert visitors into paying customers</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Common mistakes to avoid</h3>
                <p className="text-gray-600">Learn from others' failures and save time and money</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="px-4 py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">What You Get</h2>

          <Card className="p-8 border-2 border-blue-200 shadow-lg">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-blue-600 mb-2">$43 USD</div>
                <p className="text-lg text-gray-600">One-time payment, lifetime access</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Instant Digital Guide</h3>
                    <p className="text-gray-600 text-sm">Complete Notion guide delivered to your email immediately</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Private Discord Community</h3>
                    <p className="text-gray-600 text-sm">Exclusive mastermind group for networking and support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Community Support</h3>
                    <p className="text-gray-600 text-sm">Get your questions answered by experienced builders</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Visual Workflow Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            One simple process to launch AI-powered products daily.
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">1️⃣</div>
              <h3 className="font-semibold text-lg mb-2">Pay</h3>
              <p className="text-gray-600 text-sm">Secure one-time payment of $43</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-2">2️⃣</div>
              <h3 className="font-semibold text-lg mb-2">Get Guide</h3>
              <p className="text-gray-600 text-sm">Instant email with Notion guide link</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Rocket className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-2">3️⃣</div>
              <h3 className="font-semibold text-lg mb-2">Build & Launch</h3>
              <p className="text-gray-600 text-sm">Follow the guide and launch in 1 day</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-600 mb-2">4️⃣</div>
              <h3 className="font-semibold text-lg mb-2">Track & Sell</h3>
              <p className="text-gray-600 text-sm">Monitor analytics and grow your business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">What Our Community Says</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 mb-4">
                  "I launched my first AI-powered landing page in just 6 hours. The guide is incredibly detailed and
                  easy to follow."
                </p>
                <div className="font-semibold">Sarah M.</div>
                <div className="text-sm text-gray-500">Freelance Designer</div>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 mb-4">
                  "This guide saved me thousands in development costs. I built and launched 3 different products using
                  these methods."
                </p>
                <div className="font-semibold">Mike R.</div>
                <div className="text-sm text-gray-500">Small Business Owner</div>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 mb-4">
                  "The Discord community is amazing. I got help within minutes and made valuable connections with other
                  builders."
                </p>
                <div className="font-semibold">Alex K.</div>
                <div className="text-sm text-gray-500">Indie Maker</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Launch Your First AI-Powered Site?
          </h2>

          <Card className="p-8 border-2 border-blue-200 shadow-xl">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-blue-600 mb-2">$43</div>
                <p className="text-xl text-gray-600 mb-4">One-time payment, lifetime access</p>
                <Badge variant="secondary" className="px-3 py-1">
                  🔥 Limited Time Offer
                </Badge>
              </div>

              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="mr-2 h-6 w-6" />
                Buy Now & Join the Club
              </Button>

              <p className="text-sm text-gray-500 mt-4">
                ✅ Instant access • ✅ 30-day money-back guarantee • ✅ Secure payment
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-2">Do I need coding skills?</h3>
                <p className="text-gray-600">
                  Not at all! This guide is specifically designed for non-technical founders, small business owners, and
                  freelancers. Everything is done using AI and no-code tools with step-by-step instructions.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-2">How will I get the guide?</h3>
                <p className="text-gray-600">
                  Immediately after payment, you'll receive a personalized email with the Notion guide link and your
                  Discord community invite. Access is instant and available 24/7.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-2">Is there community support?</h3>
                <p className="text-gray-600">
                  Yes! You get exclusive access to our private Discord mastermind where you can ask questions, share
                  your progress, and connect with other successful builders.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-2">What if I'm not satisfied?</h3>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee. If you're not completely satisfied with the guide, just email
                  us for a full refund.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-md">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-2">How long does it take to see results?</h3>
                <p className="text-gray-600">
                  Most people launch their first AI-powered site within 24 hours of getting the guide. Some have done it
                  in as little as 6 hours!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">One App Per Day</h3>
          <p className="text-gray-400 mb-8">
            Empowering entrepreneurs to build and launch AI-powered websites without coding.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/discord" className="text-gray-400 hover:text-white transition-colors">
              Discord Community
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400 text-sm">
            © 2024 One App Per Day. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
