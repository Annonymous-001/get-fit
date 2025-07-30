import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Utensils, 
  Dumbbell, 
  Droplets, 
  Moon, 
  Smile, 
  Plus, 
  Mic, 
  Clock, 
  Apple, 
  Coffee, 
  Sandwich,
  Scale,
  Activity,
  ChevronRight,
  Target,
  Zap,
  Heart,
  Timer,
  MapPin,
  TrendingUp
} from "lucide-react"

interface TrackPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function TrackPage({ onNavigateToPage, onNavigateToTab }: TrackPageProps) {
  const activityOptions = [
    {
      icon: Dumbbell,
      title: "Track Workout",
      subtitle: "Log your exercise session",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      description: "Record strength training, cardio, yoga, and more",
      features: ["Sets & Reps", "Duration", "Calories Burned", "Equipment Used"],
    },
    {
      icon: Utensils,
      title: "Track Food",
      subtitle: "Log your nutrition",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Record meals, snacks, and nutritional intake",
      features: ["Calories", "Macros", "Meal Photos", "Barcode Scanner"],
    },
    {
      icon: Scale,
      title: "Track Weight",
      subtitle: "Monitor your progress",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Track weight changes and body measurements",
      features: ["Weight Log", "Body Fat %", "Measurements", "Progress Photos"],
    },
    {
      icon: Droplets,
      title: "Track Water",
      subtitle: "Stay hydrated",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      description: "Monitor your daily water intake",
      features: ["Quick Add", "Reminders", "Daily Goal", "Hydration Tips"],
    },
    {
      icon: Moon,
      title: "Track Sleep",
      subtitle: "Monitor rest quality",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Track sleep duration and quality",
      features: ["Sleep Hours", "Quality Score", "Sleep Cycles", "Recovery"],
    },
    {
      icon: Activity,
      title: "Track Other Metrics",
      subtitle: "Custom tracking",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      description: "Create custom metrics and track anything",
      features: ["Custom Metrics", "Flexible Units", "Personal Goals", "Data Export"],
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
        <h1 className="text-2xl font-light text-deep-navy dark:text-dark-text mb-2">Add Activity</h1>
        <p className="text-medium-gray dark:text-dark-muted text-sm">Track your fitness journey</p>
      </div>

      {/* Activity Options Grid */}
      <div className="grid grid-cols-1 gap-4">
        {activityOptions.map((option, index) => {
          const Icon = option.icon
          return (
                          <Card
                key={index}
                className="p-4 border border-border-gray dark:border-dark-border hover:shadow-md transition-all duration-200 cursor-pointer bg-white dark:bg-dark-card group"
                onClick={() => {
                  switch (option.title) {
                    case "Track Workout":
                      onNavigateToPage?.("workout")
                      break
                    case "Track Food":
                      onNavigateToPage?.("food")
                      break
                    case "Track Weight":
                      onNavigateToPage?.("weight")
                      break
                    case "Track Water":
                      onNavigateToPage?.("water")
                      break
                    case "Track Sleep":
                      onNavigateToPage?.("sleep")
                      break
                    case "Track Other Metrics":
                      // Could navigate to a general metrics page
                      console.log("Track Other Metrics")
                      break
                    default:
                      break
                  }
                }}
              >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl ${option.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${option.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-deep-navy dark:text-dark-text text-lg">{option.title}</h3>
                    <ChevronRight className="h-5 w-5 text-medium-gray group-hover:text-bright-blue transition-colors" />
                  </div>
                  <p className="text-sm text-medium-gray dark:text-dark-muted mb-2">{option.subtitle}</p>
                  <p className="text-sm text-deep-navy dark:text-dark-text mb-3">{option.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {option.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="secondary" className="text-xs bg-light-gray dark:bg-dark-bg">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
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

      {/* Activity Tips */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-gradient-to-r from-bright-blue/5 to-light-blue/5 dark:bg-dark-card">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-bright-blue/10 rounded-full flex items-center justify-center">
            <Zap className="h-5 w-5 text-bright-blue" />
          </div>
          <div>
            <h3 className="font-medium text-deep-navy dark:text-dark-text mb-1">Pro Tip</h3>
            <p className="text-sm text-medium-gray dark:text-dark-muted">
              Use voice commands to quickly log activities. Just say "Track 30 minute run" or "Log 500ml water".
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
