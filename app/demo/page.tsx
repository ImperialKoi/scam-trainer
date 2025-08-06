"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Mail, Play } from 'lucide-react'

const demoEmail = {
  id: "demo",
  subject: "URGENT: Your Account Will Be Closed!",
  sender: "security@paypaI.com",
  content: `Dear Customer,

We have detected suspicious activity on your PayPal account. Your account will be permanently closed within 24 hours unless you verify your information immediately.

Click here to verify: http://paypal-security-verify.com/login

Failure to verify will result in permanent account closure and loss of funds.

Best regards,
PayPal Security Team`,
  isScam: true,
  scamType: "phishing",
  difficulty: "easy" as const,
  redFlags: [
    "Urgent language and threats",
    "Suspicious sender domain (paypaI.com with capital i)",
    "Suspicious link domain",
    "Generic greeting",
    "Pressure tactics"
  ],
  explanation: "This is a classic phishing email. The sender uses 'paypaI.com' (with a capital I) instead of 'paypal.com', creates urgency, and directs to a suspicious website."
}

export default function DemoPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer)
    setShowResult(true)
  }

  const startDemo = () => {
    setShowIntro(false)
  }

  const resetDemo = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setShowIntro(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">ScamGuard Demo</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {showIntro ? (
          /* Demo Introduction */
          <div className="text-center space-y-6">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl">Try ScamGuard Training</CardTitle>
                <CardDescription className="text-lg">
                  Experience how our platform helps you identify email scams
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">Analyze Email</div>
                    <div className="text-gray-600">Read a suspicious email</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">Make Decision</div>
                    <div className="text-gray-600">Decide if it's legitimate or scam</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="font-semibold">Learn</div>
                    <div className="text-gray-600">Get detailed explanation</div>
                  </div>
                </div>
                
                <Button onClick={startDemo} size="lg" className="w-full">
                  <Play className="h-5 w-5 mr-2" />
                  Start Demo
                </Button>
                
                <p className="text-sm text-gray-600">
                  This is a free demo. Sign up to access our full training library with 50+ scam types!
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Email Display */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Demo Email Analysis
                    </CardTitle>
                    <Badge variant="secondary">
                      {demoEmail.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>
                    Read this email carefully and determine if it's legitimate or a scam
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Email Header */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div><strong>From:</strong> {demoEmail.sender}</div>
                      <div><strong>Subject:</strong> {demoEmail.subject}</div>
                    </div>
                    
                    {/* Email Content */}
                    <div className="bg-white border rounded-lg p-4">
                      <div className="whitespace-pre-line text-sm">
                        {demoEmail.content}
                      </div>
                    </div>
                    
                    {/* Answer Buttons */}
                    {!showResult && (
                      <div className="flex gap-4 pt-4">
                        <Button 
                          onClick={() => handleAnswer(false)}
                          variant="outline"
                          className="flex-1 h-12"
                        >
                          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                          Legitimate Email
                        </Button>
                        <Button 
                          onClick={() => handleAnswer(true)}
                          variant="outline"
                          className="flex-1 h-12"
                        >
                          <XCircle className="h-5 w-5 mr-2 text-red-600" />
                          Scam Email
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div>
              {showResult && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {selectedAnswer === demoEmail.isScam ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      {selectedAnswer === demoEmail.isScam ? "Correct!" : "Incorrect"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 rounded-lg bg-red-50">
                      <div className="font-semibold text-sm mb-1">
                        This email is a SCAM
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {demoEmail.scamType}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Explanation:</h4>
                      <p className="text-sm text-gray-600">{demoEmail.explanation}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        Red Flags:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {demoEmail.redFlags.map((flag, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <Button onClick={resetDemo} variant="outline" className="w-full">
                        Try Again
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/signup">
                          Sign Up for Full Training
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Demo Info */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Demo Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-600">
                      This is just one example from our training library.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="font-semibold text-blue-900">Full Version Includes:</div>
                      <ul className="text-blue-800 mt-1 space-y-1">
                        <li>• 50+ different scam types</li>
                        <li>• Progressive difficulty levels</li>
                        <li>• Achievement badges</li>
                        <li>• Progress tracking</li>
                        <li>• Detailed analytics</li>
                      </ul>
                    </div>
                    <Button asChild size="sm" className="w-full">
                      <Link href="/signup">
                        Get Started Free
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
