import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { 
  Trophy, 
  Calendar, 
  Star, 
  Target, 
  Award, 
  Edit, 
  Share, 
  ChevronRight,
  Activity,
  MapPin,
  Clock,
  Flame,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Filter,
  Search,
  Play,
  Pause,
  Square,
  Settings,
  Moon,
  Sun
} from "lucide-react"

interface YouPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function YouPage({ onNavigateToPage, onNavigateToTab }: YouPageProps) {
  const { theme, setTheme } = useTheme()
  
  const profileStats = [
    { label: "Activities", value: "247", icon: Activity, color: "text-bright-blue" },
    { label: "Streak", value: "12", icon: Calendar, color: "text-light-blue" },
    { label: "Followers", value: "89", icon: Users, color: "text-bright-blue" },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "Running",
      title: "Morning Run",
      distance: "5.2 km",
      duration: "24:15",
      pace: "4:39/km",
      calories: 312,
      date: "Today",
      time: "6:30 AM",
      location: "Central Park",
      image: "/images/workout-run.png",
      isFavorite: true,
    },
    {
      id: 2,
      type: "Strength",
      title: "Leg Day",
      exercise: "Squats",
      weight: "225 lbs",
      reps: "3x5",
      duration: "45 min",
      calories: 280,
      date: "Yesterday",
      time: "5:00 PM",
      location: "Gold's Gym",
      image: "/images/gym-squat.png",
      isFavorite: false,
    },
    {
      id: 3,
      type: "Cycling",
      title: "Evening Ride",
      distance: "15.3 km",
      duration: "42:30",
      pace: "2:47/km",
      calories: 420,
      date: "2 days ago",
      time: "7:15 PM",
      location: "Riverside Trail",
      image: "/images/hiking-trail.png",
      isFavorite: true,
    },
    {
      id: 4,
      type: "Yoga",
      title: "Morning Flow",
      duration: "30 min",
      style: "Vinyasa",
      poses: "15",
      calories: 120,
      date: "3 days ago",
      time: "7:00 AM",
      location: "Home",
      image: "/images/yoga-morning.png",
      isFavorite: false,
    },
  ]

  const achievements = [
    { title: "First Steps", description: "Completed your first day", icon: "🎯", earned: true },
    { title: "Week Warrior", description: "7-day streak achieved", icon: "🔥", earned: true },
    { title: "Hydration Hero", description: "Drank 8 glasses daily for a week", icon: "💧", earned: true },
    { title: "Early Bird", description: "Morning workouts for 5 days", icon: "🌅", earned: false },
    { title: "Step Master", description: "Reached 15,000 steps in a day", icon: "👟", earned: true },
    { title: "Consistency King", description: "30-day streak", icon: "👑", earned: false },
  ]

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "Running":
        return "bg-red-500"
      case "Strength":
        return "bg-purple-500"
      case "Cycling":
        return "bg-blue-500"
      case "Yoga":
        return "bg-indigo-500"
      case "Swimming":
        return "bg-cyan-500"
      default:
        return "bg-gray-500"
    }
  }

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case "Running":
        return "🏃‍♀️"
      case "Strength":
        return "💪"
      case "Cycling":
        return "🚴‍♀️"
      case "Yoga":
        return "🧘‍♀️"
      case "Swimming":
        return "🏊‍♀️"
      default:
        return "🎯"
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header - Strava Style */}
      <Card className="p-6 border border-border-gray bg-gradient-to-br from-light-blue/10 to-bright-blue/10 dark:bg-dark-card overflow-hidden">
        <div className="relative">
          {/* Cover Image Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-r from-bright-blue/20 to-light-blue/20" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-white dark:border-dark-card">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="bg-primary-gradient text-white text-xl">AK</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-white shadow-sm"
                  >
                    <Edit className="h-3 w-3 text-deep-navy" />
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">Alex Kumar</h1>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Edit className="h-3 w-3 text-medium-gray" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-medium-gray mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-bright-blue" />
                      <span className="text-medium-gray dark:text-dark-muted">2,847 XP</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-bright-blue" />
                      <span className="text-medium-gray dark:text-dark-muted">Rank #247</span>
                    </div>
                  </div>
                  <Badge className="bg-primary-gradient text-white">Fitness Enthusiast</Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-medium-gray">
                  <Share className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-medium-gray"
                  onClick={() => onNavigateToPage?.("settings")}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-3 gap-3">
        {profileStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-3 border border-border-gray text-center dark:bg-dark-card">
              <Icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-light text-deep-navy dark:text-dark-text">{stat.value}</p>
              <p className="text-xs text-medium-gray dark:text-dark-muted">{stat.label}</p>
            </Card>
          )
        })}
      </div>

      {/* Activities Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Recent Activities</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="border-border-gray dark:border-dark-border">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-border-gray dark:border-dark-border">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <Card
              key={activity.id}
              className="border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex">
                {/* Activity Image */}
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Activity Details */}
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-6 h-6 rounded-full ${getActivityTypeColor(activity.type)} flex items-center justify-center`}
                      >
                        <span className="text-xs text-white">{getActivityTypeIcon(activity.type)}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-deep-navy dark:text-dark-text text-sm">{activity.title}</h3>
                        <p className="text-xs text-medium-gray dark:text-dark-muted">{activity.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Heart className={`h-4 w-4 ${activity.isFavorite ? "fill-current text-red-500" : "text-medium-gray"}`} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4 text-medium-gray" />
                      </Button>
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {activity.distance && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-medium-gray" />
                        <span className="text-deep-navy dark:text-dark-text">{activity.distance}</span>
                      </div>
                    )}
                    {activity.duration && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-medium-gray" />
                        <span className="text-deep-navy dark:text-dark-text">{activity.duration}</span>
                      </div>
                    )}
                    {activity.pace && (
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-medium-gray" />
                        <span className="text-deep-navy dark:text-dark-text">{activity.pace}</span>
                      </div>
                    )}
                    {activity.calories && (
                      <div className="flex items-center space-x-1">
                        <Flame className="h-3 w-3 text-medium-gray" />
                        <span className="text-deep-navy dark:text-dark-text">{activity.calories} cal</span>
                      </div>
                    )}
                  </div>

                  {/* Activity Meta */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-gray dark:border-dark-border">
                    <div className="flex items-center space-x-2 text-xs text-medium-gray dark:text-dark-muted">
                      <span>{activity.date}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                      {activity.location && (
                        <>
                          <span>•</span>
                          <span>{activity.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Activities Button */}
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            className="text-bright-blue border-bright-blue hover:bg-bright-blue hover:text-white bg-transparent"
          >
            View All Activities
          </Button>
        </div>
      </div>

      {/* Achievements Wall */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-white">Achievements</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {achievements.slice(0, 4).map((achievement, index) => (
            <Card
              key={index}
              className={`p-3 border ${
                achievement.earned
                  ? "border-bright-blue/30 bg-gradient-to-br from-light-blue/10 to-bright-blue/10"
                  : "border-border-gray bg-light-gray/50"
              } dark:bg-dark-card`}
            >
              <div className="text-center space-y-2">
                <div className={`text-2xl ${achievement.earned ? "" : "grayscale opacity-50"}`}>{achievement.icon}</div>
                <div>
                  <p
                    className={`text-sm font-medium ${achievement.earned ? "text-deep-navy dark:text-white" : "text-medium-gray dark:text-gray-300"}`}
                  >
                    {achievement.title}
                  </p>
                  <p className="text-xs text-medium-gray dark:text-gray-300">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <Badge variant="secondary" className="bg-bright-blue/20 text-bright-blue text-xs">
                    Earned
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Settings */}
      <Card className="p-4 border border-border-gray dark:bg-dark-card">
        <div className="space-y-3">
          <h3 className="font-medium text-deep-navy dark:text-dark-text">Settings</h3>
          <div className="space-y-2">
            <button
              onClick={() => onNavigateToPage?.("settings")}
              className="w-full flex items-center justify-between py-2 hover:bg-gray-50 dark:hover:bg-dark-hover rounded-lg px-2 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">⚙️</span>
                <span className="text-sm text-deep-navy dark:text-dark-text">Settings</span>
              </div>
              <ChevronRight className="h-4 w-4 text-medium-gray" />
            </button>
            
            {/* Theme Toggle */}
            <div className="flex items-center justify-between py-2 px-2">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🌙</span>
                <span className="text-sm text-deep-navy dark:text-dark-text">Theme</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-6 w-6 text-medium-gray hover:text-deep-navy dark:hover:text-dark-text"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
