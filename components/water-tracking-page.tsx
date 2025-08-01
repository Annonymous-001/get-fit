'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  Settings,
  BarChart3
} from "lucide-react"

interface WaterTrackingPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function WaterTrackingPage({ onNavigateToPage, onNavigateToTab }: WaterTrackingPageProps) {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('weekly')
  const [customAmount, setCustomAmount] = useState("")

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

  const monthlyStats = [
    { week: "Week 1", amount: 19500, target: 21000 },
    { week: "Week 2", amount: 20300, target: 21000 },
    { week: "Week 3", amount: 18900, target: 21000 },
    { week: "Week 4", amount: 21000, target: 21000 }
  ]

  const hydrationTips = [
    "Drink a glass of water first thing in the morning",
    "Keep a water bottle with you throughout the day",
    "Set reminders to drink water every hour",
    "Add lemon or cucumber for flavor",
    "Drink water before, during, and after exercise"
  ]

  const addWater = (amount: number) => {
    // In a real app, this would update the water data
    console.log(`Added ${amount}ml of water`)
  }

  const getViewData = () => {
    switch (viewMode) {
      case 'daily':
        return { data: todayIntake, title: "Today's Progress" }
      case 'weekly':
        return { data: weeklyStats, title: "This Week" }
      case 'monthly':
        return { data: monthlyStats, title: "This Month" }
      default:
        return { data: weeklyStats, title: "This Week" }
    }
  }

  const { data: viewData, title } = getViewData()

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

      {/* View Mode Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-light-gray dark:bg-dark-bg rounded-lg p-1 flex">
          {(['daily', 'weekly', 'monthly'] as const).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === mode 
                  ? "bg-blue-500 text-white shadow-sm" 
                  : "text-medium-gray dark:text-dark-muted hover:text-deep-navy dark:hover:text-dark-text"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Compact Daily Progress */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-gradient-to-br from-blue-50 to-cyan-50 dark:bg-dark-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-light text-deep-navy dark:text-dark-text">{waterData.current}</span>
                <span className="text-sm text-medium-gray dark:text-dark-muted">/ {waterData.target} {waterData.unit}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Target className="h-3 w-3 text-blue-500" />
                <span className="text-medium-gray dark:text-dark-muted">{waterData.remaining} {waterData.unit} remaining</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-medium text-deep-navy dark:text-dark-text">{waterData.progress}%</div>
            <div className="text-xs text-medium-gray dark:text-dark-muted">Complete</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-blue-100 dark:bg-dark-bg rounded-full h-2 mt-3">
          <div
            className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${waterData.progress}%` }}
          />
        </div>
      </Card>

      {/* Main Chart/Graph */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">{title}</h2>
          <BarChart3 className="h-5 w-5 text-medium-gray" />
        </div>
        
        {viewMode === 'daily' ? (
          // Daily view - show today's intake timeline
          <div className="space-y-3">
            {todayIntake.map((intake, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-light-gray dark:bg-dark-bg rounded-lg">
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
            ))}
          </div>
        ) : (
          // Weekly/Monthly view - show bar chart like sleep tracking
          <div className="space-y-4">
            {/* Summary Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-deep-navy dark:text-dark-text">
                  {viewMode === 'weekly' ? 'Weekly Average' : 'Monthly Average'}
                </p>
                <p className="text-xs text-medium-gray dark:text-dark-muted">
                  Goal: {viewMode === 'weekly' ? '3000ml/day' : '21000ml/week'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-deep-navy dark:text-dark-text">
                  {Math.round(viewData.reduce((sum: number, item: any) => sum + item.amount, 0) / viewData.length)} {waterData.unit}
                </p>
                <p className="text-xs text-green-500">
                  {Math.round((viewData.filter((item: any) => item.amount >= (item.target || 0)).length / viewData.length) * 100)}% of goal
                </p>
              </div>
            </div>
            
            {/* Bar Chart */}
            <div className="flex items-end justify-between space-x-1">
              {viewData && viewData.length > 0 ? (
                viewData.map((item: any, index: number) => {
                  const maxAmount = Math.max(...viewData.map((d: any) => d.amount))
                  const height = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0
                  const isToday = viewMode === 'weekly' && item.day === 'Sun'
                  const isGoalMet = item.amount >= (item.target || 0)
                  
                  return (
                    <div key={index} className="flex-1 text-center">
                      <div className="relative">
                        <div className="w-full bg-blue-100 dark:bg-dark-bg rounded-t-sm h-16">
                          <div
                            className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-300 ${
                              isToday 
                                ? 'bg-gradient-to-t from-blue-500 to-cyan-500' 
                                : isGoalMet
                                ? 'bg-gradient-to-t from-green-400 to-green-500'
                                : 'bg-gradient-to-t from-blue-400 to-cyan-400'
                            }`}
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-medium-gray dark:text-dark-muted mt-1">
                        {viewMode === 'weekly' ? item.day : item.week}
                      </p>
                      <p className="text-xs text-deep-navy dark:text-dark-text font-medium">
                        {item.amount} {waterData.unit}
                      </p>
                    </div>
                  )
                })
              ) : (
                <div className="flex items-center justify-center w-full h-16 text-medium-gray dark:text-dark-muted">
                  No data available
                </div>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Quick Add */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Quick Add</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickAddOptions.map((option, index) => (
            <Card
              key={index}
              className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => addWater(option.amount)}
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
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10"
            onClick={() => setCustomAmount(prev => Math.max(0, parseInt(prev) - 50).toString())}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center">
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full text-center text-lg font-medium text-deep-navy dark:text-dark-text bg-transparent border-none outline-none"
            />
            <p className="text-xs text-medium-gray dark:text-dark-muted">{waterData.unit}</p>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10"
            onClick={() => setCustomAmount(prev => (parseInt(prev) + 50).toString())}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          className="w-full mt-3 bg-primary-gradient hover:opacity-90 text-white"
          onClick={() => customAmount && addWater(parseInt(customAmount))}
          disabled={!customAmount || parseInt(customAmount) <= 0}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Water
        </Button>
      </Card>

      {/* Hydration Tips */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-gradient-to-r from-blue-50 to-cyan-50 dark:bg-dark-card">
        <div className="flex items-center space-x-2 mb-3">
          <Droplets className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium text-deep-navy dark:text-dark-text">Hydration Tips</h3>
        </div>
        <div className="space-y-2">
          {hydrationTips.slice(0, 3).map((tip, index) => (
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