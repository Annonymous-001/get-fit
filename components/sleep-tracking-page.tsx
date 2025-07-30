import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft,
  Moon,
  Plus,
  Clock,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  MoreHorizontal,
  Activity,
  Heart,
  Bed,
  Sunrise,
  Sunset,
  Bell,
  Settings,
  Play,
  Pause,
  Square
} from "lucide-react"

interface SleepTrackingPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function SleepTrackingPage({ onNavigateToPage, onNavigateToTab }: SleepTrackingPageProps) {
  const sleepData = {
    lastNight: {
      duration: "7h 32m",
      quality: 85,
      deepSleep: "2h 15m",
      lightSleep: "4h 45m",
      remSleep: "1h 12m",
      awake: "20m",
      bedtime: "11:30 PM",
      wakeTime: "7:02 AM",
      efficiency: 92
    },
    target: "8h",
    weeklyAverage: "7h 15m",
    quality: "Good"
  }

  const sleepHistory = [
    { date: "Last Night", duration: "7h 32m", quality: 85, bedtime: "11:30 PM" },
    { date: "2 nights ago", duration: "6h 45m", quality: 72, bedtime: "12:15 AM" },
    { date: "3 nights ago", duration: "8h 12m", quality: 91, bedtime: "10:45 PM" },
    { date: "4 nights ago", duration: "7h 28m", quality: 83, bedtime: "11:20 PM" },
    { date: "5 nights ago", duration: "6h 58m", quality: 78, bedtime: "11:55 PM" }
  ]

  const weeklyStats = [
    { day: "Mon", duration: 7.5, quality: 85 },
    { day: "Tue", duration: 6.8, quality: 72 },
    { day: "Wed", duration: 8.2, quality: 91 },
    { day: "Thu", duration: 7.5, quality: 83 },
    { day: "Fri", duration: 7.0, quality: 78 },
    { day: "Sat", duration: 8.5, quality: 88 },
    { day: "Sun", duration: 7.5, quality: 85 }
  ]

  const sleepGoals = [
    { name: "Bedtime", target: "11:00 PM", current: "11:30 PM", status: "late" },
    { name: "Wake Time", target: "7:00 AM", current: "7:02 AM", status: "on-time" },
    { name: "Sleep Duration", target: "8h", current: "7h 32m", status: "below" },
    { name: "Sleep Quality", target: "90%", current: "85%", status: "below" }
  ]

  const sleepTips = [
    "Keep a consistent sleep schedule",
    "Create a relaxing bedtime routine",
    "Avoid screens 1 hour before bed",
    "Keep your bedroom cool and dark",
    "Exercise regularly but not close to bedtime"
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
        <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">Sleep Tracking</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Sleep Display */}
      <Card className="p-6 border border-border-gray dark:border-dark-border bg-gradient-to-br from-indigo-50 to-purple-50 dark:bg-dark-card">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
            <Moon className="h-12 w-12 text-white" />
          </div>
          
          <div>
            <div className="flex items-baseline justify-center space-x-1 mb-2">
              <span className="text-4xl font-light text-deep-navy dark:text-dark-text">{sleepData.lastNight.duration}</span>
            </div>
            <p className="text-sm text-medium-gray dark:text-dark-muted">Last Night</p>
          </div>

          {/* Sleep Quality */}
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-medium-gray dark:text-dark-muted">Quality</span>
              <span className="text-lg font-medium text-deep-navy dark:text-dark-text">{sleepData.lastNight.quality}%</span>
              <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-200">
                {sleepData.quality}
              </Badge>
            </div>
            <div className="w-full bg-indigo-100 dark:bg-dark-bg rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${sleepData.lastNight.quality}%` }}
              />
            </div>
          </div>

          {/* Sleep Times */}
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Sunset className="h-4 w-4 text-orange-500" />
              <span className="text-deep-navy dark:text-dark-text">{sleepData.lastNight.bedtime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Sunrise className="h-4 w-4 text-yellow-500" />
              <span className="text-deep-navy dark:text-dark-text">{sleepData.lastNight.wakeTime}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Sleep Cycles */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <h3 className="font-medium text-deep-navy dark:text-dark-text mb-3">Sleep Cycles</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-deep-navy dark:text-dark-text">Deep Sleep</span>
            </div>
            <span className="text-sm font-medium text-deep-navy dark:text-dark-text">{sleepData.lastNight.deepSleep}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-deep-navy dark:text-dark-text">Light Sleep</span>
            </div>
            <span className="text-sm font-medium text-deep-navy dark:text-dark-text">{sleepData.lastNight.lightSleep}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-deep-navy dark:text-dark-text">REM Sleep</span>
            </div>
            <span className="text-sm font-medium text-deep-navy dark:text-dark-text">{sleepData.lastNight.remSleep}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-deep-navy dark:text-dark-text">Awake</span>
            </div>
            <span className="text-sm font-medium text-deep-navy dark:text-dark-text">{sleepData.lastNight.awake}</span>
          </div>
        </div>
      </Card>

      {/* Start Sleep Tracking */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-gradient-to-r from-indigo-50 to-purple-50 dark:bg-dark-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-deep-navy dark:text-dark-text mb-1">Track Tonight's Sleep</h3>
            <p className="text-sm text-medium-gray dark:text-dark-muted">Start monitoring your sleep</p>
          </div>
          <Button className="bg-primary-gradient hover:opacity-90 text-white">
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
        </div>
      </Card>

      {/* Sleep Goals */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Sleep Goals</h2>
        <div className="space-y-3">
          {sleepGoals.map((goal, index) => (
            <Card key={index} className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-deep-navy dark:text-dark-text text-sm">{goal.name}</h3>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">Target: {goal.target}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{goal.current}</p>
                  <Badge variant="outline" className={`text-xs ${
                    goal.status === "on-time" || goal.status === "good" 
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-orange-100 text-orange-700 border-orange-200"
                  }`}>
                    {goal.status === "on-time" ? "On Track" : "Needs Work"}
                  </Badge>
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
              <p className="text-xs text-medium-gray dark:text-dark-muted">Goal: {sleepData.target}/night</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium text-deep-navy dark:text-dark-text">{sleepData.weeklyAverage}</p>
              <p className="text-xs text-green-500">90% of goal</p>
            </div>
          </div>
          
          <div className="flex items-end justify-between space-x-1">
            {weeklyStats.map((day, index) => (
              <div key={index} className="flex-1 text-center">
                <div className="relative">
                  <div className="w-full bg-indigo-100 dark:bg-dark-bg rounded-t-sm h-16">
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-400 to-purple-400 rounded-t-sm transition-all duration-300"
                      style={{ height: `${(day.duration / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-medium-gray dark:text-dark-muted mt-1">{day.day}</p>
                <p className="text-xs text-deep-navy dark:text-dark-text font-medium">{day.duration}h</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Sleep */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Recent Sleep</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            View All
          </Button>
        </div>
        
        <div className="space-y-2">
          {sleepHistory.map((sleep, index) => (
            <Card key={index} className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
                    <Moon className="h-4 w-4 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{sleep.duration}</p>
                    <p className="text-xs text-medium-gray dark:text-dark-muted">{sleep.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-deep-navy dark:text-dark-text">{sleep.quality}%</span>
                    <Badge variant="outline" className="text-xs">
                      {sleep.bedtime}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Sleep Tips */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-gradient-to-r from-indigo-50 to-purple-50 dark:bg-dark-card">
        <div className="flex items-center space-x-2 mb-3">
          <Bed className="h-5 w-5 text-indigo-500" />
          <h3 className="font-medium text-deep-navy dark:text-dark-text">Sleep Tips</h3>
        </div>
        <div className="space-y-2">
          {sleepTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
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
                <span className="text-sm text-deep-navy dark:text-dark-text">Sleep Goal</span>
              </div>
              <span className="text-sm text-medium-gray dark:text-dark-muted">{sleepData.target}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Sunset className="h-4 w-4 text-medium-gray" />
                <span className="text-sm text-deep-navy dark:text-dark-text">Bedtime Goal</span>
              </div>
              <span className="text-sm text-medium-gray dark:text-dark-muted">11:00 PM</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Bell className="h-4 w-4 text-medium-gray" />
                <span className="text-sm text-deep-navy dark:text-dark-text">Bedtime Reminder</span>
              </div>
              <span className="text-sm text-medium-gray dark:text-dark-muted">10:30 PM</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 