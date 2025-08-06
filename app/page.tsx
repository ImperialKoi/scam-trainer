import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Mail, Trophy, Users, TrendingUp, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">ScamGuard Training</h1>
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master the Art of <span className="text-blue-600">Scam Detection</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Train your eye to spot phishing emails, romance scams, and other online threats. 
            Level up your cybersecurity skills through interactive practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Start Training Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">Try Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Mail className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Real Email Examples</CardTitle>
              <CardDescription>
                Practice with authentic-looking scam emails based on real-world threats
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Progressive Levels</CardTitle>
              <CardDescription>
                Start with obvious scams and advance to sophisticated social engineering attempts
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Trophy className="h-12 w-12 text-yellow-600 mb-4" />
              <CardTitle>Earn Badges</CardTitle>
              <CardDescription>
                Unlock achievements and badges as you master different types of scams
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Users Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Scam Types</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">25</div>
              <div className="text-gray-600">Achievement Badges</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Ready to Become a Scam Detective?</CardTitle>
            <CardDescription className="text-lg">
              Join thousands of users who have improved their cybersecurity awareness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="/signup">Start Your Training Journey</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">ScamGuard Training</span>
          </div>
          <p className="text-gray-400">
            Empowering users to stay safe online through education and practice.
          </p>
        </div>
      </footer>
    </div>
  )
}
