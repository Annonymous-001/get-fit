import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Footprints, Moon, Utensils, Plus, CheckCircle, Target, Sparkles } from "lucide-react"

export default function GoalsPage() {
  const activeGoals = [
    {
      icon: Footprints,
      title: "Daily Steps",
      current: 8247,
      target: 10000,
      unit: "steps",
      color: "text-bright-blue",
      progress: 82,
    },
    {
      icon: Moon,
      title: "Sleep Quality",
      current: 7.2,
      target: 8,
      unit: "hours",
      color: "text-light-blue",
      progress: 90,
    },
    {
      icon: Utensils,
      title: "Protein Intake",
      current: 85,
      target: 120,
      unit: "grams",
      color: "text-bright-blue",
      progress: 71,
    },
  ]

  const completedGoals = [
    { title: "Drink 8 glasses of water", completedAt: "Today", streak: 5 },
    { title: "Morning workout routine", completedAt: "Yesterday", streak: 12 },
    { title: "Meditation practice", completedAt: "2 days ago", streak: 8 },
  ]

  const aiSuggestions = [
    { title: "Increase daily steps to 12,000", reason: "Based on your consistent progress" },
    { title: "Add strength training 3x/week", reason: "To complement your cardio routine" },
    { title: "Track mindful eating habits", reason: "Enhance your nutrition goals" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-light text-deep-navy dark:text-dark-text mb-2">Your Goals</h1>
        <p className="text-medium-gray dark:text-dark-muted text-sm">Track your progress and stay motivated</p>
      </div>

      {/* Active Goals - Circular Progress */}
      <div className="space-y-4">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Active Goals</h2>
        <div className="space-y-4">
          {activeGoals.map((goal, index) => {
            const Icon = goal.icon
            const progressPercentage = (goal.current / goal.target) * 100

            return (
              <Card
                key={index}
                className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16">
                      {/* Circular Progress Background */}
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="url(#gradient)"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${progressPercentage * 1.76} 176`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#A7C7E7" />
                            <stop offset="100%" stopColor="#7FBFFF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className={`h-6 w-6 ${goal.color}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-deep-navy dark:text-dark-text">{goal.title}</h3>
                      <p className="text-sm text-medium-gray dark:text-dark-muted">
                        {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                      </p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {Math.round(progressPercentage)}% complete
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-medium-gray dark:text-dark-muted">
                    <Target className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Add New Goal */}
      <Card className="p-4 border-2 border-dashed border-border-gray dark:border-dark-border bg-light-gray dark:bg-dark-bg">
        <div className="flex items-center justify-center space-x-3 text-medium-gray dark:text-dark-muted">
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add New Goal</span>
        </div>
      </Card>

      {/* Completed Goals */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Recently Completed</h2>
        <div className="space-y-2">
          {completedGoals.map((goal, index) => (
            <Card key={index} className="p-3 border border-border-gray dark:border-dark-border bg-subtle-accent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-bright-blue" />
                  <div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{goal.title}</p>
                    <p className="text-xs text-medium-gray dark:text-dark-muted">{goal.completedAt}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {goal.streak} day streak
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-bright-blue" />
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">AI Stretch Goals</h2>
        </div>
        <div className="space-y-2">
          {aiSuggestions.map((suggestion, index) => (
            <Card
              key={index}
              className="p-3 border border-bright-blue/20 bg-gradient-to-r from-light-blue/10 to-bright-blue/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-deep-navy dark:text-dark-text mb-1">{suggestion.title}</p>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">{suggestion.reason}</p>
                </div>
                <Button size="sm" className="bg-primary-gradient hover:opacity-90 text-white">
                  Add Goal
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
