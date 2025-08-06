"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Mail } from 'lucide-react'

interface Email {
  id: string
  subject: string
  sender: string
  content: string
  isScam: boolean
  scamType?: string
  difficulty: "easy" | "medium" | "hard"
  redFlags: string[]
  explanation: string
}

const emailDatabase: Email[] = [
  {
    id: "1",
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
    difficulty: "easy",
    redFlags: [
      "Urgent language and threats",
      "Suspicious sender domain (paypaI.com with capital i)",
      "Suspicious link domain",
      "Generic greeting",
      "Pressure tactics"
    ],
    explanation: "This is a classic phishing email. The sender uses 'paypaI.com' (with a capital I) instead of 'paypal.com', creates urgency, and directs to a suspicious website."
  },
  {
    id: "2",
    subject: "Monthly Statement - Chase Bank",
    sender: "statements@chase.com",
    content: `Dear John Smith,

Your monthly statement for account ending in 4567 is now available.

Statement Period: December 1-31, 2024
Account Balance: $2,847.32

To view your statement, please log in to your Chase online banking account or visit any Chase branch.

Thank you for banking with Chase.

Chase Customer Service
1-800-CHASE24`,
    isScam: false,
    difficulty: "easy",
    redFlags: [],
    explanation: "This appears to be a legitimate bank statement notification. It doesn't ask for personal information, uses the correct domain, and provides official contact information."
  },
  {
    id: "3",
    subject: "You've Won $500,000 in the International Lottery!",
    sender: "winner@intl-lottery.org",
    content: `Congratulations!

You have been selected as a winner in the International Email Lottery Program. You have won $500,000 USD!

To claim your prize, please provide:
- Full name and address
- Phone number
- Copy of ID
- Bank account details for transfer

Contact our claims agent immediately:
Email: claims@intl-lottery.org
Phone: +234-801-234-5678

Reference Number: INT/2024/WIN/789

Act fast - you have only 72 hours to claim!`,
    isScam: true,
    scamType: "lottery",
    difficulty: "easy",
    redFlags: [
      "Unsolicited lottery win",
      "Requests personal and financial information",
      "Foreign phone number",
      "Pressure to act quickly",
      "Too good to be true"
    ],
    explanation: "This is a classic lottery scam. You cannot win a lottery you never entered, and legitimate lotteries don't contact winners via email requesting personal information."
  },
  {
    id: "4",
    subject: "Hi Beautiful, I've been thinking about you",
    sender: "david.miller.army@gmail.com",
    content: `My Dearest,

I hope this message finds you well. I am David Miller, a US Army Captain stationed in Afghanistan. I came across your profile and felt a strong connection.

I am a widower with a 10-year-old daughter. I have been deployed for 8 months and am looking for someone special to share my life with when I return.

I have some important matters to discuss with you regarding my late wife's inheritance that I need help with. I have $2.5 million that I need to transfer safely.

Would you be willing to help me? I promise to share part of this money with you for your kindness.

Please write back soon. I am falling in love with you already.

All my love,
Captain David Miller
US Army`,
    isScam: true,
    scamType: "romance",
    difficulty: "medium",
    redFlags: [
      "Claims to be military overseas",
      "Professes love very quickly",
      "Mentions large sum of money",
      "Asks for help with financial matters",
      "Uses generic Gmail address for military",
      "Sob story about being widowed"
    ],
    explanation: "This is a romance scam. Scammers often pose as military personnel overseas, quickly profess love, and eventually ask for money or financial help."
  },
  {
    id: "5",
    subject: "Microsoft Security Alert - Suspicious Activity Detected",
    sender: "security@microsoft.com",
    content: `Dear Microsoft User,

We have detected unusual sign-in activity on your Microsoft account from the following location:
- Location: Moscow, Russia
- Device: Unknown Windows PC
- Time: Today at 3:47 AM

If this was not you, your account may be compromised. Please take immediate action:

1. Change your password immediately
2. Enable two-factor authentication
3. Review recent account activity

Sign in to your Microsoft account to secure it:
https://account.microsoft.com/security

If you need assistance, contact Microsoft Support at 1-800-MICROSOFT.

Best regards,
Microsoft Security Team`,
    isScam: false,
    difficulty: "medium",
    redFlags: [],
    explanation: "This appears to be a legitimate security alert from Microsoft. It uses the correct domain, provides official contact information, and directs to the real Microsoft website without asking for credentials in the email."
  }
]

export default function PracticeContent() {
  const searchParams = useSearchParams()
  const practiceType = searchParams.get("type") || "mixed"
  
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [practiceEmails, setPracticeEmails] = useState<Email[]>([])
  const [showCompletion, setShowCompletion] = useState(false)
  const [completionData, setCompletionData] = useState<{score: number, total: number, percentage: number, xpGained: number} | null>(null)

  useEffect(() => {
    // Filter emails based on practice type
    let filteredEmails = emailDatabase
    if (practiceType !== "mixed") {
      filteredEmails = emailDatabase.filter(email => 
        email.scamType === practiceType || (!email.isScam && practiceType === "mixed")
      )
    }
    
    // Shuffle and take first 5 emails
    const shuffled = [...filteredEmails].sort(() => Math.random() - 0.5).slice(0, 5)
    setPracticeEmails(shuffled)
  }, [practiceType])

  const currentEmail = practiceEmails[currentEmailIndex]
  const progress = ((currentEmailIndex + (showResult ? 1 : 0)) / practiceEmails.length) * 100

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer)
    setShowResult(true)
    
    if (answer === currentEmail.isScam) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentEmailIndex < practiceEmails.length - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Practice complete - show results
      handleComplete()
    }
  }

  const handleComplete = () => {
    const finalScore = score
    const percentage = Math.round((finalScore / practiceEmails.length) * 100)
    const xpGained = finalScore * 50
    
    // Update user XP and potentially badges
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      user.xp += xpGained
      
      // Check for level up
      const newLevel = Math.floor(user.xp / 500) + 1
      if (newLevel > user.level) {
        user.level = newLevel
      }
      
      // Award badges
      if (percentage === 100 && !user.badges.includes("perfect-score")) {
        user.badges.push("perfect-score")
      }
      
      localStorage.setItem("user", JSON.stringify(user))
    }
    
    setCompletionData({
      score: finalScore,
      total: practiceEmails.length,
      percentage,
      xpGained
    })
    setShowCompletion(true)
  }

  if (practiceEmails.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Practice Session</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {currentEmailIndex + 1} of {practiceEmails.length}
            </span>
            <div className="w-32">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Email Display */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Analysis
                  </CardTitle>
                  <Badge variant={currentEmail.difficulty === "easy" ? "secondary" : 
                                currentEmail.difficulty === "medium" ? "default" : "destructive"}>
                    {currentEmail.difficulty}
                  </Badge>
                </div>
                <CardDescription>
                  Read the email carefully and determine if it's legitimate or a scam
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Email Header */}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div><strong>From:</strong> {currentEmail.sender}</div>
                    <div><strong>Subject:</strong> {currentEmail.subject}</div>
                  </div>
                  
                  {/* Email Content */}
                  <div className="bg-white border rounded-lg p-4">
                    <div className="whitespace-pre-line text-sm">
                      {currentEmail.content}
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
                    {selectedAnswer === currentEmail.isScam ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    {selectedAnswer === currentEmail.isScam ? "Correct!" : "Incorrect"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-3 rounded-lg ${currentEmail.isScam ? 'bg-red-50' : 'bg-green-50'}`}>
                    <div className="font-semibold text-sm mb-1">
                      This email is {currentEmail.isScam ? "a SCAM" : "LEGITIMATE"}
                    </div>
                    {currentEmail.scamType && (
                      <Badge variant="destructive" className="text-xs">
                        {currentEmail.scamType}
                      </Badge>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Explanation:</h4>
                    <p className="text-sm text-gray-600">{currentEmail.explanation}</p>
                  </div>
                  
                  {currentEmail.redFlags.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        Red Flags:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {currentEmail.redFlags.map((flag, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Button onClick={handleNext} className="w-full">
                    {currentEmailIndex < practiceEmails.length - 1 ? "Next Email" : "Complete Practice"}
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {/* Score Display */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Current Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {score}/{currentEmailIndex + (showResult && selectedAnswer === currentEmail.isScam ? 1 : 0)}
                  </div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Completion Modal */}
        {showCompletion && completionData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Practice Complete!</CardTitle>
                <CardDescription>Great job on completing the practice session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {completionData.score}/{completionData.total}
                  </div>
                  <div className="text-lg text-gray-600">
                    {completionData.percentage}% Accuracy
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    +{completionData.xpGained} XP
                  </div>
                  <div className="text-sm text-green-700">Experience Points Earned</div>
                </div>
                
                {completionData.percentage === 100 && (
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-lg font-semibold text-yellow-700">
                      🏆 Perfect Score!
                    </div>
                    <div className="text-sm text-yellow-600">
                      You've earned the "Perfect Score" badge!
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => window.location.href = "/dashboard"} 
                    className="flex-1"
                  >
                    Back to Dashboard
                  </Button>
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline"
                    className="flex-1"
                  >
                    Practice Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
