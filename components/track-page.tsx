import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Utensils, Dumbbell, Droplets, Moon, Smile, Plus, Mic, Clock, Apple, Coffee, Sandwich } from "lucide-react"

export default function TrackPage() {
  const trackers = [
    {
      icon: Utensils,
      title: "Meals",
      subtitle: "Log your nutrition",
      color: "text-bright-blue",
      bgColor: "bg-bright-blue/10",
      count: 2,
      target: 3,
    },
    {
      icon: Dumbbell,
      title: "Workouts",
      subtitle: "Track exercise",
      color: "text-light-blue",
      bgColor: "bg-light-blue/10",
      count: 0,
      target: 1,
    },
    {
      icon: Droplets,
      title: "Water",
      subtitle: "Stay hydrated",
      color: "text-bright-blue",
      bgColor: "bg-bright-blue/10",
      count: 6,
      target: 8,
    },
    {
      icon: Moon,
      title: "Sleep",
      subtitle: "Rest quality",
      color: "text-light-blue",
      bgColor: "bg-light-blue/10",
      count: 0,
      target: 1,
    },
    {
      icon: Smile,
      title: "Mood",
      subtitle: "How you feel",
      color: "text-bright-blue",
      bgColor: "bg-bright-blue/10",
      count: 1,
      target: 1,
    },
    {
      icon: Plus,
      title: "Custom",
      subtitle: "Add tracker",
      color: "text-medium-gray",
      bgColor: "bg-light-gray",
      count: null,
      target: null,
    },
  ]

  const quickPresets = [
    { icon: Apple, label: "Apple", category: "Snack", calories: "95 cal" },
    { icon: Coffee, label: "Coffee", category: "Drink", calories: "5 cal" },
    { icon: Sandwich, label: "Sandwich", category: "Meal", calories: "350 cal" },
  ]

  const recentLogs = [
    { type: "Meal", item: "Greek Yogurt Bowl", time: "8:30 AM", calories: "280 cal" },
    { type: "Water", item: "2 glasses", time: "9:15 AM", amount: "500ml" },
    { type: "Mood", item: "Energetic", time: "10:00 AM", rating: "😊" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-light text-deep-navy dark:text-dark-text mb-2">Track Progress</h1>
        <p className="text-medium-gray dark:text-dark-muted text-sm">Log your daily activities and habits</p>
      </div>

      {/* Tracker Grid */}
      <div className="grid grid-cols-2 gap-4">
        {trackers.map((tracker, index) => {
          const Icon = tracker.icon
          const isCustom = tracker.title === "Custom"

          return (
            <Card
              key={index}
              className={`p-4 border border-border-gray dark:border-dark-border hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-dark-card ${
                isCustom ? "border-dashed" : ""
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`w-12 h-12 rounded-full ${tracker.bgColor} flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${tracker.color}`} />
                </div>
                <div>
                  <h3 className="font-medium text-deep-navy dark:text-dark-text">{tracker.title}</h3>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">{tracker.subtitle}</p>
                </div>
                {!isCustom && (
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {tracker.count}/{tracker.target}
                    </Badge>
                    <Button size="sm" className="bg-primary-gradient hover:opacity-90 text-white h-6 px-2">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick Add Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Quick Add</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            <Mic className="h-4 w-4 mr-1" />
            Voice
          </Button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {quickPresets.map((preset, index) => {
            const Icon = preset.icon
            return (
              <Card
                key={index}
                className="p-3 border border-border-gray dark:border-dark-border min-w-[120px] flex-shrink-0 cursor-pointer hover:bg-light-gray dark:hover:bg-dark-bg transition-colors bg-white dark:bg-dark-card"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{preset.label}</p>
                    <p className="text-xs text-medium-gray dark:text-dark-muted">{preset.category}</p>
                    <p className="text-xs text-bright-blue">{preset.calories}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Logs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Recent Logs</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            View All
          </Button>
        </div>
        <div className="space-y-2">
          {recentLogs.map((log, index) => (
            <Card
              key={index}
              className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-subtle-accent rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-bright-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{log.item}</p>
                    <div className="flex items-center space-x-2 text-xs text-medium-gray dark:text-dark-muted">
                      <Badge variant="outline" className="text-xs">
                        {log.type}
                      </Badge>
                      <span>{log.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {log.calories && <p className="text-xs text-bright-blue">{log.calories}</p>}
                  {log.amount && <p className="text-xs text-bright-blue">{log.amount}</p>}
                  {log.rating && <p className="text-lg">{log.rating}</p>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Action Button */}
      <div className="fixed bottom-32 right-4">
        <Button className="w-14 h-14 rounded-full bg-primary-gradient hover:opacity-90 shadow-lg">
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  )
}
