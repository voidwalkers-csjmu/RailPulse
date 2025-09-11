"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Train,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Zap,
  MapPin,
  Activity,
} from "lucide-react"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem("railcontrol_user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("railcontrol_user")
    router.push("/")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  // Mock data for dashboard
  const trainData = [
    { id: "T001", route: "Central-North", status: "On Time", progress: 75, passengers: 234 },
    { id: "T002", route: "East-West", status: "Delayed", progress: 45, passengers: 189 },
    { id: "T003", route: "South-Central", status: "On Time", progress: 90, passengers: 312 },
    { id: "T004", route: "North-East", status: "Maintenance", progress: 0, passengers: 0 },
  ]

  const systemMetrics = {
    totalTrains: 24,
    activeTrains: 18,
    onTimePerformance: 87,
    systemEfficiency: 94,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Train className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                RailPulse
              </h1>
              <p className="text-sm text-muted-foreground">Control Center Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user.role}</p>
              <p className="text-xs text-muted-foreground">{currentTime.toLocaleTimeString()}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.username}!</h2>
          <p className="text-muted-foreground">
            Monitor and control railway operations from your centralized dashboard.
          </p>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trains</CardTitle>
              <Train className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">{systemMetrics.totalTrains}</div>
              <p className="text-xs text-muted-foreground">Fleet size</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Trains</CardTitle>
              <Activity className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-2">{systemMetrics.activeTrains}</div>
              <p className="text-xs text-muted-foreground">Currently operating</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
              <Clock className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">{systemMetrics.onTimePerformance}%</div>
              <Progress value={systemMetrics.onTimePerformance} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Efficiency</CardTitle>
              <Zap className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-4">{systemMetrics.systemEfficiency}%</div>
              <Progress value={systemMetrics.systemEfficiency} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Train Status */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="h-5 w-5" />
                  Live Train Status
                </CardTitle>
                <CardDescription>Real-time monitoring of active trains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainData.map((train) => (
                    <div key={train.id} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono">
                            {train.id}
                          </Badge>
                          <span className="font-medium">{train.route}</span>
                        </div>
                        <Badge
                          variant={
                            train.status === "On Time"
                              ? "default"
                              : train.status === "Delayed"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {train.status === "On Time" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {train.status === "Delayed" && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {train.status === "Maintenance" && <Settings className="h-3 w-3 mr-1" />}
                          {train.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Progress: {train.progress}%
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {train.passengers} passengers
                        </span>
                      </div>
                      <Progress value={train.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Recommendations */}
          <div>
            <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>Optimization suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Route Optimization</p>
                      <p className="text-xs text-muted-foreground">
                        Reroute T002 via Central Hub to reduce delay by 8 minutes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-chart-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Maintenance Alert</p>
                      <p className="text-xs text-muted-foreground">Schedule T004 maintenance during off-peak hours</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-chart-3/10 border border-chart-3/20">
                  <div className="flex items-start gap-2">
                    <BarChart3 className="h-4 w-4 text-chart-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Capacity Management</p>
                      <p className="text-xs text-muted-foreground">Add extra car to T003 for peak hour demand</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Stop
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
