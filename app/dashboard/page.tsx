"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Shield, Mail, Trophy, TrendingUp, Star, Play, User, LogOut } from 'lucide-react'

interface User {
  name: string
  email: string
  level: number
  xp: number
  badges: string[]
}

const badgeInfo = {
  "first-catch": { name: "First Catch", description: "Identified your first scam", icon: "🎯" },
  "streak-5": { name: "5-Day Streak", description: "Practiced 5 days in a row", icon: "🔥" },
  "phishing-expert": { name: "Phishing Expert", description: "Master of email phishing detection", icon: "🎣" },
  "romance-detective": { name: "Romance Detective", description: "Spotted romance scams", icon: "💔" },
  "tech-savvy": { name: "Tech Savvy", description: "Identified tech support scams", icon: "💻" },
  "perfect-score": { name: "Perfect Score", description: "Got 100% on a level", icon: "⭐" }
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const xpToNextLevel = (user.level * 500) - (user.xp % 500)
  const progressToNextLevel = ((user.xp % 500) / 500) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">ScamGuard Training</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Level {user.level}</span>
                    <span className="text-sm text-gray-600">{user.xp} XP</span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-2" />
                  <p className="text-sm text-gray-600">
                    {xpToNextLevel} XP needed to reach Level {user.level + 1}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Practice Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Practice Sessions
                </CardTitle>
                <CardDescription>Choose your training focus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button asChild className="h-auto p-4 flex-col items-start">
                    <Link href="/practice?type=mixed">
                      <Mail className="h-6 w-6 mb-2" />
                      <div className="text-left">
                        <div className="font-semibold">Mixed Practice</div>
                        <div className="text-sm opacity-90">Various scam types</div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" asChild className="h-auto p-4 flex-col items-start">
                    <Link href="/practice?type=phishing">
                      <div className="text-2xl mb-2">🎣</div>
                      <div className="text-left">
                        <div className="font-semibold">Phishing Focus</div>
                        <div className="text-sm opacity-70">Email phishing only</div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" asChild className="h-auto p-4 flex-col items-start">
                    <Link href="/practice?type=romance">
                      <div className="text-2xl mb-2">💔</div>
                      <div className="text-left">
                        <div className="font-semibold">Romance Scams</div>
                        <div className="text-sm opacity-70">Dating & relationship</div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" asChild className="h-auto p-4 flex-col items-start">
                    <Link href="/practice?type=tech">
                      <div className="text-2xl mb-2">💻</div>
                      <div className="text-left">
                        <div className="font-semibold">Tech Support</div>
                        <div className="text-sm opacity-70">Fake tech support</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Completed Phishing Level 3</span>
                    </div>
                    <span className="text-sm text-gray-600">+150 XP</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Earned "Phishing Expert" badge</span>
                    </div>
                    <span className="text-sm text-gray-600">Badge</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">5-day practice streak!</span>
                    </div>
                    <span className="text-sm text-gray-600">Streak</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600">Level {user.level} Detective</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{user.xp}</div>
                      <div className="text-xs text-gray-600">Total XP</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{user.badges.length}</div>
                      <div className="text-xs text-gray-600">Badges</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.badges.map((badgeId) => {
                    const badge = badgeInfo[badgeId as keyof typeof badgeInfo]
                    return (
                      <div key={badgeId} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                        <span className="text-2xl">{badge.icon}</span>
                        <div>
                          <div className="font-semibold text-sm">{badge.name}</div>
                          <div className="text-xs text-gray-600">{badge.description}</div>
                        </div>
                      </div>
                    )
                  })}
                  {user.badges.length === 0 && (
                    <p className="text-sm text-gray-600 text-center py-4">
                      No badges yet. Start practicing to earn your first badge!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Accuracy Rate</span>
                    <span className="text-sm font-semibold">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Emails Analyzed</span>
                    <span className="text-sm font-semibold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Current Streak</span>
                    <span className="text-sm font-semibold">5 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Best Score</span>
                    <span className="text-sm font-semibold">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
