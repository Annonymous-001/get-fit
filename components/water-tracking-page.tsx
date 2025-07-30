import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft,
  Droplets,
  Plus,
  Minus,
  Clock,
  Target,
  TrendingUp,
  MoreHorizontal,
  Calendar,
  Bell,
  Settings
} from "lucide-react"

interface WaterTrackingPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function WaterTrackingPage({ onNavigateToPage, onNavigateToTab }: WaterTrackingPageProps) {
  const waterData = {
    current: 1000,
    target: 3000,
    unit: "ml",
    progress: 33,
    remaining: 2000
  }

  const quickAddOptions = [
    { amount: 250, label: "Small Glass", icon: "🥤" },
    { amount: 350, label: "Large Glass", icon: "🥛" },
    { amount: 500, label: "Bottle", icon: "💧" },
    { amount: 750, label: "Large Bottle", icon: "🏺" }
  ]

  const todayIntake = [
    { time: "7:30 AM", amount: 250, type: "Small Glass" },
    { time: "9:15 AM", amount: 350, type: "Large Glass" },
    { time: "11:45 AM", amount: 250, type: "Small Glass" },
    { time: "2:30 PM", amount: 500, type: "Bottle" }
  ]

  const weeklyStats = [
    { day: "Mon", amount: 2800, target: 3000 },
    { day: "Tue", amount: 3200, target: 3000 },
    { day: "Wed", amount: 2400, target: 3000 },
    { day: "Thu", amount: 3100, target: 3000 },
    { day: "Fri", amount: 2600, target: 3000 },
    { day: "Sat", amount: 2900, target: 3000 },
    { day: "Sun", amount: 1000, target: 3000 }
  ]

  const hydrationTips = [
    "Drink a glass of water first thing in the morning",
    "Keep a water bottle with you throughout the day",
    "Set reminders to drink water every hour",
    "Add lemon or cucumber for flavor",
    "Drink water before, during, and after exercise"
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
        <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">Water Tracking</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Water Display */}
      <Card className="p-6 border border-border-gray dark:border-dark-border bg-gradient-to-br from-blue-50 to-cyan-50 dark:bg-dark-card">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
            <Droplets className="h-12 w-12 text-white" />
          </div>
          
          <div>
            <div className="flex items-baseline justify-center space-x-1 mb-2">
              <span className="text-4xl font-light text-deep-navy dark:text-dark-text">{waterData.current}</span>
              <span className="text-lg text-medium-gray dark:text-dark-muted">{waterData.unit}</span>
            </div>
            <p className="text-sm text-medium-gray dark:text-dark-muted">
              of {waterData.target} {waterData.unit} goal
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-blue-100 dark:bg-dark-bg rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${waterData.progress}%` }}
            />
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-deep-navy dark:text-dark-text">{waterData.target} {waterData.unit}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-cyan-500" />
              <span className="text-deep-navy dark:text-dark-text">{waterData.remaining} {waterData.unit} remaining</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Add */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Quick Add</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickAddOptions.map((option, index) => (
            <Card
              key={index}
              className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="text-center space-y-2">
                <div className="text-2xl">{option.icon}</div>
                <div>
                  <p className="font-medium text-deep-navy dark:text-dark-text text-sm">{option.amount} {waterData.unit}</p>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">{option.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Amount */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <h3 className="font-medium text-deep-navy dark:text-dark-text mb-3">Custom Amount</h3>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center">
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full text-center text-lg font-medium text-deep-navy dark:text-dark-text bg-transparent border-none outline-none"
            />
            <p className="text-xs text-medium-gray dark:text-dark-muted">{waterData.unit}</p>
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button className="w-full mt-3 bg-primary-gradient hover:opacity-90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Water
        </Button>
      </Card>

      {/* Today's Intake */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Today's Intake</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            View History
          </Button>
        </div>
        
        <div className="space-y-2">
          {todayIntake.map((intake, index) => (
            <Card key={index} className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Droplets className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{intake.type}</p>
                    <p className="text-xs text-medium-gray dark:text-dark-muted">{intake.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-deep-navy dark:text-dark-text">+{intake.amount} {waterData.unit}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">This Week</h2>
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="flex items-center justify-between mb-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-deep-navy dark:text-dark-text">Weekly Average</p>
              <p className="text-xs text-medium-gray dark:text-dark-muted">Goal: {waterData.target} {waterData.unit}/day</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium text-deep-navy dark:text-dark-text">2,700 {waterData.unit}</p>
              <p className="text-xs text-green-500">90% of goal</p>
            </div>
          </div>
          
          <div className="flex items-end justify-between space-x-1">
            {weeklyStats.map((day, index) => (
              <div key={index} className="flex-1 text-center">
                <div className="relative">
                  <div className="w-full bg-blue-100 dark:bg-dark-bg rounded-t-sm h-16">
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-cyan-400 rounded-t-sm transition-all duration-300"
                      style={{ height: `${(day.amount / day.target) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-medium-gray dark:text-dark-muted mt-1">{day.day}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Hydration Tips */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-gradient-to-r from-blue-50 to-cyan-50 dark:bg-dark-card">
        <div className="flex items-center space-x-2 mb-3">
          <Droplets className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium text-deep-navy dark:text-dark-text">Hydration Tips</h3>
        </div>
        <div className="space-y-2">
          {hydrationTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-deep-navy dark:text-dark-text">{tip}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <div className="space-y-3">
          <h3 className="font-medium text-deep-navy dark:text-dark-text">Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Target className="h-4 w-4 text-medium-gray" />
                <span className="text-sm text-deep-navy dark:text-dark-text">Daily Goal</span>
              </div>
              <span className="text-sm text-medium-gray dark:text-dark-muted">{waterData.target} {waterData.unit}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Bell className="h-4 w-4 text-medium-gray" />
                <span className="text-sm text-deep-navy dark:text-dark-text">Reminders</span>
              </div>
              <span className="text-sm text-medium-gray dark:text-dark-muted">Every 2 hours</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-medium-gray" />
                <span className="text-sm text-deep-navy dark:text-dark-text">Reset Time</span>
              </div>
              <span className="text-sm text-medium-gray dark:text-dark-muted">12:00 AM</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 