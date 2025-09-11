import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Train, Clock, Shield, BarChart3, Users, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Train className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              RailPulse
            </span>
          </div>
          <Link href="/login">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/5 bg-transparent">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <Zap className="h-3 w-3 mr-1" />
              Next-Generation Railway Control
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
              Intelligent Train Traffic Control
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Advanced optimization algorithms and real-time monitoring for seamless railway operations. Make
              data-driven decisions with AI-powered suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-6 text-lg"
                >
                  Access Control Center
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/20 hover:bg-primary/5 px-8 py-6 text-lg bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced Railway Management</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools for modern railway operations with real-time insights and intelligent automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-gradient-to-br from-chart-1/20 to-chart-1/10 border border-chart-1/20">
                  <BarChart3 className="h-6 w-6 text-chart-1" />
                </div>
                <CardTitle>Real-Time Analytics</CardTitle>
                <CardDescription>
                  Live performance metrics and tracking with predictive insights for optimal operations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-2/10 border border-chart-2/20">
                  <Clock className="h-6 w-6 text-chart-2" />
                </div>
                <CardTitle>Schedule Optimization</CardTitle>
                <CardDescription>
                  AI-powered scheduling with conflict resolution and delay minimization algorithms.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-gradient-to-br from-chart-3/20 to-chart-3/10 border border-chart-3/20">
                  <Shield className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle>Safety Monitoring</CardTitle>
                <CardDescription>
                  Comprehensive safety protocols with automated alerts and emergency response systems.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-gradient-to-br from-chart-4/20 to-chart-4/10 border border-chart-4/20">
                  <Train className="h-6 w-6 text-chart-4" />
                </div>
                <CardTitle>Fleet Management</CardTitle>
                <CardDescription>
                  Complete visibility of train locations, status, and maintenance schedules across your network.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-gradient-to-br from-chart-5/20 to-chart-5/10 border border-chart-5/20">
                  <Users className="h-6 w-6 text-chart-5" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Seamless communication tools for dispatchers, operators, and maintenance teams.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Decision Support</CardTitle>
                <CardDescription>
                  Intelligent recommendations for traffic management with detailed impact analysis.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-accent/5 to-muted/30 overflow-hidden">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ready to Transform Your Railway Operations?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join leading railway operators who trust RailControl Pro for their critical infrastructure management.
              </p>
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-6 text-lg"
                >
                  Get Started Today
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4 bg-muted/30">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 RailPulse. Railway Management Solutions.</p>
        </div>
      </footer>
    </div>
  )
}
