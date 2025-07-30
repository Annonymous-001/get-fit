import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Target, 
  Plus, 
  Calendar, 
  TrendingUp, 
  Trophy, 
  Star, 
  Edit, 
  Trash2,
  ChevronRight,
  ChevronLeft,
  Clock,
  Award,
  Zap,
  Flame,
  Footprints,
  Droplets,
  Scale,
  Heart
} from "lucide-react"

interface GoalsPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function GoalsPage({ onNavigateToPage, onNavigateToTab }: GoalsPageProps) {
  const userGoals = [
    {
      id: 1,
      title: "Lose 10 lbs",
      description: "Target weight loss goal",
      icon: "⚖️",
      category: "Weight Loss",
      progress: 60,
      target: "10 lbs",
      current: "6 lbs",
      remaining: "4 lbs",
      deadline: "2024-03-15",
      streak: 12,
      isActive: true,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 2,
      title: "Run 5K",
      description: "Complete a 5K run",
      icon: "🏃‍♀️",
      category: "Fitness",
      progress: 80,
      target: "5K",
      current: "4K",
      remaining: "1K",
      deadline: "2024-02-28",
      streak: 8,
      isActive: true,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: 3,
      title: "Build Muscle",
      description: "Gain muscle mass",
      icon: "💪",
      category: "Strength",
      progress: 45,
      target: "5 lbs",
      current: "2.25 lbs",
      remaining: "2.75 lbs",
      deadline: "2024-04-01",
      streak: 15,
      isActive: true,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: 4,
      title: "Daily Steps",
      description: "Maintain daily step count",
      icon: "👟",
      category: "Activity",
      progress: 67.5,
      target: "8000 steps",
      current: "5400 steps",
      remaining: "2600 steps",
      deadline: "Daily",
      streak: 12,
      isActive: true,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      id: 5,
      title: "Hydration Goal",
      description: "Drink enough water daily",
      icon: "💧",
      category: "Health",
      progress: 33.3,
      target: "3000ml",
      current: "1000ml",
      remaining: "2000ml",
      deadline: "Daily",
      streak: 5,
      isActive: true,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      id: 6,
      title: "Sleep Better",
      description: "Improve sleep quality",
      icon: "😴",
      category: "Wellness",
      progress: 25,
      target: "8 hours",
      current: "6 hours",
      remaining: "2 hours",
      deadline: "Daily",
      streak: 3,
      isActive: false,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
  ]

  const goalStats = [
    { label: "Active Goals", value: "5", icon: Target, color: "text-bright-blue" },
    { label: "Completed", value: "12", icon: Trophy, color: "text-light-blue" },
    { label: "Current Streak", value: "12", icon: Flame, color: "text-bright-blue" },
    { label: "Total XP", value: "2,847", icon: Star, color: "text-light-blue" },
  ]

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-blue-500"
    if (progress >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getDeadlineStatus = (deadline: string) => {
    if (deadline === "Daily") return { status: "daily", text: "Daily Goal", color: "text-green-600" }
    
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { status: "overdue", text: "Overdue", color: "text-red-600" }
    if (diffDays <= 7) return { status: "urgent", text: `${diffDays} days left`, color: "text-orange-600" }
    return { status: "normal", text: `${diffDays} days left`, color: "text-gray-600" }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigateToTab?.("home")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-center flex-1">
          <h1 className="text-2xl font-light text-deep-navy dark:text-dark-text mb-2">My Goals</h1>
          <p className="text-medium-gray dark:text-dark-muted text-sm">Track your fitness journey progress</p>
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Goal Stats */}
      <div className="grid grid-cols-2 gap-3">
        {goalStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-3 border border-border-gray dark:border-dark-border text-center dark:bg-dark-card">
              <Icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-light text-deep-navy dark:text-dark-text">{stat.value}</p>
              <p className="text-xs text-medium-gray dark:text-dark-muted">{stat.label}</p>
            </Card>
          )
        })}
      </div>

      {/* Add New Goal Button */}
      <Card className="p-4 border border-dashed border-border-gray dark:border-dark-border bg-gradient-to-r from-bright-blue/5 to-light-blue/5 dark:bg-dark-card">
        <Button className="w-full bg-primary-gradient hover:opacity-90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add New Goal
        </Button>
      </Card>

      {/* Goals List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Active Goals</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        <div className="space-y-3">
          {userGoals.map((goal) => {
            const deadlineInfo = getDeadlineStatus(goal.deadline)
            return (
              <Card
                key={goal.id}
                className={`p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-md transition-shadow ${
                  !goal.isActive ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl ${goal.bgColor} flex items-center justify-center`}>
                      <span className="text-xl">{goal.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-deep-navy dark:text-dark-text">{goal.title}</h3>
                        {goal.isActive && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-medium-gray dark:text-dark-muted mb-1">{goal.description}</p>
                      <div className="flex items-center space-x-2 text-xs">
                        <Badge variant="outline" className="text-xs">
                          {goal.category}
                        </Badge>
                        <span className="text-medium-gray dark:text-dark-muted">•</span>
                        <span className={`${deadlineInfo.color}`}>{deadlineInfo.text}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4 text-medium-gray" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-medium-gray" />
                    </Button>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-deep-navy dark:text-dark-text">
                        {goal.current} / {goal.target}
                      </span>
                      <span className="text-xs text-medium-gray dark:text-dark-muted">
                        ({goal.progress}%)
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-medium-gray dark:text-dark-muted">
                      <Flame className="h-3 w-3 text-orange-500" />
                      <span>{goal.streak} day streak</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-light-gray dark:bg-dark-bg rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal.progress)}`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>

                  {/* Goal Details */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3 text-medium-gray" />
                      <span className="text-deep-navy dark:text-dark-text">Target: {goal.target}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-medium-gray" />
                      <span className="text-deep-navy dark:text-dark-text">Remaining: {goal.remaining}</span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Goal Tips */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-gradient-to-r from-bright-blue/5 to-light-blue/5 dark:bg-dark-card">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-bright-blue/10 rounded-full flex items-center justify-center">
            <Zap className="h-5 w-5 text-bright-blue" />
          </div>
          <div>
            <h3 className="font-medium text-deep-navy dark:text-dark-text mb-1">Goal Setting Tips</h3>
            <p className="text-sm text-medium-gray dark:text-dark-muted">
              Make your goals SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. 
              Break big goals into smaller milestones for better tracking.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
