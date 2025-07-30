import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  ChevronLeft,
  Scale,
  Plus,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  MoreHorizontal,
  Activity,
  Heart,
  Ruler,
  Calculator,
  Bell,
  Settings
} from "lucide-react"

interface WeightTrackingPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function WeightTrackingPage({ onNavigateToPage, onNavigateToTab }: WeightTrackingPageProps) {
  const weightData = {
    current: 75.2,
    target: 70.0,
    unit: "kg",
    change: -0.8,
    changeType: "loss",
    bmi: 23.4,
    bmiCategory: "Normal",
    height: 175
  }

  const weightHistory = [
    { date: "Today", weight: 75.2, change: -0.3 },
    { date: "Yesterday", weight: 75.5, change: -0.2 },
    { date: "2 days ago", weight: 75.7, change: 0.1 },
    { date: "3 days ago", weight: 75.6, change: -0.4 },
    { date: "4 days ago", weight: 76.0, change: 0.2 },
    { date: "5 days ago", weight: 75.8, change: -0.1 },
    { date: "1 week ago", weight: 75.9, change: -0.5 }
  ]

  const weeklyStats = [
    { day: "Mon", weight: 75.8 },
    { day: "Tue", weight: 75.6 },
    { day: "Wed", weight: 75.4 },
    { day: "Thu", weight: 75.3 },
    { day: "Fri", weight: 75.2 },
    { day: "Sat", weight: 75.1 },
    { day: "Sun", weight: 75.2 }
  ]

  const bodyMetrics = [
    { name: "Body Fat", value: "18.5%", target: "15%", status: "above" },
    { name: "Muscle Mass", value: "45.2 kg", target: "48 kg", status: "below" },
    { name: "Body Water", value: "55.8%", target: "60%", status: "below" },
    { name: "Bone Mass", value: "3.2 kg", target: "3.5 kg", status: "below" }
  ]

  const weightGoals = [
    { name: "Short Term", target: 73.0, deadline: "2 weeks", progress: 85 },
    { name: "Medium Term", target: 70.0, deadline: "2 months", progress: 65 },
    { name: "Long Term", target: 68.0, deadline: "6 months", progress: 45 }
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigateToTab?.("add-activity")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">Weight Tracking</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Weight Display */}
      <Card className="p-6 border border-border-gray dark:border-dark-border bg-gradient-to-br from-purple-50 to-blue-50 dark:bg-dark-card">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
            <Scale className="h-12 w-12 text-white" />
          </div>
          
          <div>
            <div className="flex items-baseline justify-center space-x-1 mb-2">
              <span className="text-4xl font-light text-deep-navy dark:text-dark-text">{weightData.current}</span>
              <span className="text-lg text-medium-gray dark:text-dark-muted">{weightData.unit}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              {weightData.changeType === "loss" ? (
                <TrendingDown className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                weightData.changeType === "loss" ? "text-green-500" : "text-red-500"
              }`}>
                {weightData.change > 0 ? "+" : ""}{weightData.change} {weightData.unit} this week
              </span>
            </div>
          </div>

          {/* Progress to Goal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-medium-gray dark:text-dark-muted">Goal: {weightData.target} {weightData.unit}</span>
              <span className="text-deep-navy dark:text-dark-text">
                {((weightData.current - weightData.target) / (weightData.current - weightData.target + 5.2) * 100).toFixed(0)}% to go
              </span>
            </div>
            <div className="w-full bg-purple-100 dark:bg-dark-bg rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((weightData.current - weightData.target) / (weightData.current - weightData.target + 5.2) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* BMI Info */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Calculator className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-deep-navy dark:text-dark-text">BMI</p>
              <p className="text-xs text-medium-gray dark:text-dark-muted">{weightData.height}cm height</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium text-deep-navy dark:text-dark-text">{weightData.bmi}</p>
            <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-200">
              {weightData.bmiCategory}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Add Weight Entry */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <h3 className="font-medium text-deep-navy dark:text-dark-text mb-3">Add Weight Entry</h3>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Enter weight"
              className="text-center text-lg font-medium"
            />
            <p className="text-xs text-medium-gray dark:text-dark-muted text-center mt-1">{weightData.unit}</p>
          </div>
          <Button className="bg-primary-gradient hover:opacity-90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </Card>

      {/* Body Metrics */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Body Metrics</h2>
        <div className="grid grid-cols-2 gap-3">
          {bodyMetrics.map((metric, index) => (
            <Card key={index} className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="space-y-2">
                <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{metric.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-deep-navy dark:text-dark-text">{metric.value}</span>
                  <span className="text-xs text-medium-gray dark:text-dark-muted">Target: {metric.target}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-dark-bg rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      metric.status === "above" ? "bg-red-400" : "bg-green-400"
                    }`}
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Weight Goals */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Weight Goals</h2>
        <div className="space-y-3">
          {weightGoals.map((goal, index) => (
            <Card key={index} className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-deep-navy dark:text-dark-text text-sm">{goal.name}</h3>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">Target: {goal.target} {weightData.unit}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {goal.deadline}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-medium-gray dark:text-dark-muted">Progress</span>
                  <span className="text-deep-navy dark:text-dark-text">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-dark-bg rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">This Week</h2>
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="flex items-end justify-between space-x-1">
            {weeklyStats.map((day, index) => (
              <div key={index} className="flex-1 text-center">
                <div className="relative">
                  <div className="w-full bg-purple-100 dark:bg-dark-bg rounded-t-sm h-20">
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-purple-400 to-blue-400 rounded-t-sm transition-all duration-300"
                      style={{ height: `${((day.weight - 70) / (80 - 70)) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-medium-gray dark:text-dark-muted mt-1">{day.day}</p>
                <p className="text-xs text-deep-navy dark:text-dark-text font-medium">{day.weight}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Entries */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Recent Entries</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            View All
          </Button>
        </div>
        
        <div className="space-y-2">
          {weightHistory.slice(0, 5).map((entry, index) => (
            <Card key={index} className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                    <Scale className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{entry.weight} {weightData.unit}</p>
                    <p className="text-xs text-medium-gray dark:text-dark-muted">{entry.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    {entry.change < 0 ? (
                      <TrendingDown className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingUp className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${
                      entry.change < 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {entry.change > 0 ? "+" : ""}{entry.change} {weightData.unit}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Settings */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <div className="space-y-3">
          <h3 className="font-medium text-deep-navy dark:text-dark-text">Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Target className="h-4 w-4 text-medium-gray" />
                <span className="text-sm text-deep-navy dark:text-dark-text">Target Weight</span>
              </div>
              <span className="text-sm text-medium-gray dark:text-dark-muted">{weightData.target} {weightData.unit}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Ruler className="h-4 w-4 text-medium-gray" />
                <span className="text-sm text-deep-navy dark:text-dark-text">Height</span>
              </div>
              <span className="text-sm text-medium-gray dark:text-dark-muted">{weightData.height} cm</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Bell className="h-4 w-4 text-medium-gray" />
                <span className="text-sm text-deep-navy dark:text-dark-text">Reminders</span>
              </div>
              <span className="text-sm text-medium-gray dark:text-dark-muted">Daily</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 