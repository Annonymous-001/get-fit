'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Plus, 
  Heart, 
  Clock, 
  Flame, 
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Play,
  Pause,
  Square,
  Timer,
  Target,
  TrendingUp,
  MapPin,
  Dumbbell,
  Bike,
  Activity,
  BarChart3
} from "lucide-react"

interface WorkoutTrackingPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

// Custom image components for activities
const ActivityIcon = ({ name, className }: { name: string, className?: string }) => {
  // Use next/image for better image optimization
  return (
    <img 
      src={`/images/activities/${name}.png`} 
      alt={name}
      className={className}
      width={24}
      height={24}
      loading="lazy"
    />
  )
}

export default function WorkoutTrackingPage({ onNavigateToPage, onNavigateToTab }: WorkoutTrackingPageProps) {
  const workoutActivities = [
    {
      id: 1,
      name: "Running",
      icon: () => <img src="/images/Running.png" alt="Running" className="h-6 w-6" />,
      category: "Cardio",
      isFavorite: true,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      description: "Track your runs with GPS",
      features: ["GPS Tracking", "Pace Analysis", "Route Mapping"]
    },
    {
      id: 2,
      name: "Cycling",
      icon: Bike,
      category: "Cardio",
      isFavorite: true,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Indoor and outdoor cycling",
      features: ["Speed Tracking", "Cadence", "Power Output"]
    },
    {
      id: 3,
      name: "Strength Training",
      icon: Dumbbell,
      category: "Strength",
      isFavorite: true,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Weight training and bodybuilding",
      features: ["Sets & Reps", "Weight Tracking", "Rest Timer"]
    },
    {
      id: 4,
      name: "Swimming",
      icon: () => <img src="/images/Swimming.png" alt="Swimming" className="h-6 w-6" />,
      category: "Cardio",
      isFavorite: false,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      description: "Pool and open water swimming",
      features: ["Stroke Count", "Lap Tracking", "Pace Analysis"]
    },
    {
      id: 5,
      name: "Yoga",
      icon: () => <img src="/images/Yoga.png" alt="Yoga" className="h-6 w-6" />,
      category: "Flexibility",
      isFavorite: false,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      description: "Yoga and meditation sessions",
      features: ["Pose Tracking", "Breathing", "Mindfulness"]
    },
    {
      id: 6,
      name: "HIIT",
      icon: Activity,
      category: "Cardio",
      isFavorite: false,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      description: "High-intensity interval training",
      features: ["Interval Timer", "Work/Rest Cycles", "Intensity Tracking"]
    }
  ]

  const recentWorkouts = [
    {
      id: 1,
      type: "Running",
      title: "Morning Run",
      duration: "24:15",
      distance: "5.2 km",
      calories: 312,
      date: "Today",
      time: "6:30 AM",
      pace: "4:39/km"
    },
    {
      id: 2,
      type: "Strength",
      title: "Leg Day",
      duration: "45 min",
      exercises: 6,
      calories: 280,
      date: "Yesterday",
      time: "5:00 PM"
    },
    {
      id: 3,
      type: "Cycling",
      title: "Evening Ride",
      duration: "42:30",
      distance: "15.3 km",
      calories: 420,
      date: "2 days ago",
      time: "7:15 PM"
    }
  ]

  const workoutStats = {
    thisWeek: { workouts: 4, duration: "3h 15m", calories: 1240 },
    thisMonth: { workouts: 18, duration: "14h 30m", calories: 5200 },
    streak: 12
  }

  const weeklyCaloriesData = [
    { day: "Mon", calories: 180 },
    { day: "Tue", calories: 320 },
    { day: "Wed", calories: 299 },
    { day: "Thu", calories: 450 },
    { day: "Fri", calories: 280 },
    { day: "Sat", calories: 380 },
    { day: "Sun", calories: 220 }
  ]

  const weeklyStats = {
    totalCalories: 1830,
    averageCalories: 261,
    goal: 2000,
    goalPercentage: 91.5
  }

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
        <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">Workout Tracking</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-medium-gray" />
        <Input
          placeholder="Search workouts or exercises..."
          className="pl-10 bg-light-gray dark:bg-dark-bg border-border-gray dark:border-dark-border"
        />
      </div>

      {/* Workout Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 border border-border-gray dark:border-dark-border text-center dark:bg-dark-card">
          <Clock className="h-5 w-5 mx-auto mb-1 text-bright-blue" />
          <p className="text-lg font-light text-deep-navy dark:text-dark-text">{workoutStats.thisWeek.workouts}</p>
          <p className="text-xs text-medium-gray dark:text-dark-muted">This Week</p>
        </Card>
        <Card className="p-3 border border-border-gray dark:border-dark-border text-center dark:bg-dark-card">
          <Flame className="h-5 w-5 mx-auto mb-1 text-orange-500" />
          <p className="text-lg font-light text-deep-navy dark:text-dark-text">{workoutStats.thisWeek.calories}</p>
          <p className="text-xs text-medium-gray dark:text-dark-muted">Calories</p>
        </Card>
        <Card className="p-3 border border-border-gray dark:border-dark-border text-center dark:bg-dark-card">
          <Target className="h-5 w-5 mx-auto mb-1 text-green-500" />
          <p className="text-lg font-light text-deep-navy dark:text-dark-text">{workoutStats.streak}</p>
          <p className="text-xs text-medium-gray dark:text-dark-muted">Day Streak</p>
        </Card>
      </div>

      {/* Weekly Calories Chart */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Weekly Calories</h2>
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="flex items-center justify-between mb-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-deep-navy dark:text-dark-text">Weekly Total</p>
              <p className="text-xs text-medium-gray dark:text-dark-muted">Goal: {weeklyStats.goal} calories/week</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium text-deep-navy dark:text-dark-text">{weeklyStats.totalCalories}</p>
              <p className="text-xs text-green-500">{weeklyStats.goalPercentage}% of goal</p>
            </div>
          </div>
          
          <div className="flex items-end justify-between space-x-1">
            {weeklyCaloriesData.map((day, index) => {
              const maxCalories = Math.max(...weeklyCaloriesData.map(d => d.calories))
              const height = maxCalories > 0 ? (day.calories / maxCalories) * 100 : 0
              return (
                <div key={index} className="flex-1 text-center">
                  <div className="relative">
                    <div className="w-full bg-orange-100 dark:bg-orange-900/20 rounded-t-sm h-16">
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-orange-400 to-orange-500 rounded-t-sm transition-all duration-300"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-medium-gray dark:text-dark-muted mt-1">{day.day}</p>
                  <p className="text-xs text-deep-navy dark:text-dark-text font-medium">{day.calories}</p>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Favorites - Circular Icons */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Favorites</h2>
        <div className="flex justify-between">
          {workoutActivities.filter(activity => activity.isFavorite).slice(0, 5).map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex flex-col items-center space-y-2 cursor-pointer group"
                onClick={() => {
                  if (activity.name === "Strength Training") {
                    onNavigateToPage?.("strength-training")
                  } else if (["Running", "Swimming", "Cycling"].includes(activity.name)) {
                    onNavigateToPage?.("outdoor-activity")
                  }
                }}
              >
                <div className={`w-16 h-16 rounded-full ${activity.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md`}>
                  <Icon className={`h-8 w-8 ${activity.color}`} />
                </div>
                <span className="text-xs font-medium text-deep-navy dark:text-dark-text text-center">{activity.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* All Activities - Compact Cards */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">All Activities</h2>
        <div className="space-y-2">
          {workoutActivities.map((activity) => {
            const Icon = activity.icon
            return (
              <Card
                key={activity.id}
                className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  if (activity.name === "Strength Training") {
                    onNavigateToPage?.("strength-training")
                  } else if (["Running", "Swimming", "Cycling"].includes(activity.name)) {
                    onNavigateToPage?.("outdoor-activity")
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${activity.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-navy dark:text-dark-text text-sm">{activity.name}</h3>
                      <p className="text-xs text-medium-gray dark:text-dark-muted">{activity.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Toggle favorite logic would go here
                      }}
                    >
                      <Heart className={`h-4 w-4 ${activity.isFavorite ? "text-red-500 fill-current" : "text-medium-gray"}`} />
                    </Button>
                    <ChevronRight className="h-4 w-4 text-medium-gray" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Recent Workouts</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentWorkouts.map((workout) => (
            <Card key={workout.id} className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-gradient rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-deep-navy dark:text-dark-text text-sm">{workout.title}</h3>
                    <p className="text-xs text-medium-gray dark:text-dark-muted">{workout.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-medium-gray dark:text-dark-muted">{workout.date}</p>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">{workout.time}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-medium-gray" />
                  <span className="text-deep-navy dark:text-dark-text">{workout.duration}</span>
                </div>
                {workout.distance && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-medium-gray" />
                    <span className="text-deep-navy dark:text-dark-text">{workout.distance}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Flame className="h-3 w-3 text-medium-gray" />
                  <span className="text-deep-navy dark:text-dark-text">{workout.calories} cal</span>
                </div>
              </div>
              
              {workout.pace && (
                <div className="mt-2 pt-2 border-t border-border-gray dark:border-dark-border">
                  <div className="flex items-center space-x-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-medium-gray" />
                    <span className="text-deep-navy dark:text-dark-text">Pace: {workout.pace}</span>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Start */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-gradient-to-r from-bright-blue/5 to-light-blue/5 dark:bg-dark-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-deep-navy dark:text-dark-text mb-1">Quick Start</h3>
            <p className="text-sm text-medium-gray dark:text-dark-muted">Start a workout in seconds</p>
          </div>
          <Button 
            className="bg-primary-gradient hover:opacity-90 text-white"
            onClick={() => onNavigateToPage?.("strength-training")}
          >
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
        </div>
      </Card>
    </div>
  )
} 