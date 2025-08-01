import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Footprints,
  Flame,
  Calendar,
  Droplets,
  Trophy,
  Users,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Clock,
  Plus,
  Target,
  ChevronRight,
  Camera,
  Barcode,
  Dumbbell,
  Utensils,
  Settings,
} from "lucide-react"

interface HomePageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function HomePage({ onNavigateToPage, onNavigateToTab }: HomePageProps) {
  const goalWidgets = [
    {
      icon: Flame,
      label: "Calorie Intake",
      value: "1200",
      target: "2000",
      unit: "kcal",
      subtext: "+200 kcal surplus",
      color: "text-bright-blue",
      bgColor: "bg-bright-blue/10",
      progress: 60,
    },
    {
      icon: Flame,
      label: "Active Calories",
      value: "800",
      target: "1000",
      unit: "kcal",
      subtext: "BMR: 1600 kcal",
      color: "text-light-blue",
      bgColor: "bg-light-blue/10",
      progress: 80,
    },
    {
      icon: Footprints,
      label: "Steps Walked",
      value: "5400",
      target: "8000",
      unit: "steps",
      subtext: "",
      color: "text-bright-blue",
      bgColor: "bg-bright-blue/10",
      progress: 67.5,
    },
    {
      icon: Droplets,
      label: "Water Intake",
      value: "1000",
      target: "3000",
      unit: "ml",
      subtext: "",
      color: "text-light-blue",
      bgColor: "bg-light-blue/10",
      progress: 33.3,
    },
  ]

  const userGoals = [
    { id: 1, title: "Lose 10 lbs", progress: 60, target: "10 lbs", current: "6 lbs", icon: "⚖️" },
    { id: 2, title: "Run 5K", progress: 80, target: "5K", current: "4K", icon: "🏃‍♀️" },
    { id: 3, title: "Build Muscle", progress: 45, target: "5 lbs", current: "2.25 lbs", icon: "💪" },
  ]

  const challenges = [
    { title: "30-Day Step Challenge", participants: "2.4k", progress: 65 },
    { title: "Hydration Hero", participants: "1.8k", progress: 80 },
    { title: "Morning Warrior", participants: "3.1k", progress: 45 },
  ]

  const stories = [
    { user: "You", avatar: "🎯", hasStory: true, isViewed: false },
    { user: "Sarah", avatar: "/placeholder.svg?height=40&width=40", hasStory: true, isViewed: false },
    { user: "Mike", avatar: "/placeholder.svg?height=40&width=40", hasStory: true, isViewed: true },
    { user: "Emma", avatar: "/placeholder.svg?height=40&width=40", hasStory: true, isViewed: false },
    { user: "Jake", avatar: "/placeholder.svg?height=40&width=40", hasStory: true, isViewed: true },
    { user: "Lisa", avatar: "/placeholder.svg?height=40&width=40", hasStory: true, isViewed: false },
  ]

  const feedPosts = [
    {
      id: 1,
      user: {
        name: "Sarah Martinez",
        username: "@sarah_fit",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      timestamp: "2 hours ago",
      location: "Central Park, NYC",
      content: {
        text: "Just crushed my morning 5K run! 🏃‍♀️ The weather was perfect and I beat my personal record by 30 seconds. Feeling unstoppable today! 💪",
        image: "/images/workout-run.png",
        type: "workout",
      },
      stats: {
        distance: "5.2 km",
        time: "24:15",
        pace: "4:39/km",
        calories: 312,
      },
      engagement: {
        likes: 47,
        comments: 12,
        shares: 3,
        isLiked: false,
        isBookmarked: false,
      },
    },
    {
      id: 2,
      user: {
        name: "Mike Rodriguez",
        username: "@mike_gains",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      timestamp: "4 hours ago",
      location: "Gold's Gym",
      content: {
        text: "Leg day complete! 🦵 Hit a new PR on squats today - 225lbs for 3 reps. The grind never stops! Who else is crushing their goals today?",
        image: "/images/gym-squat.png",
        type: "strength",
      },
      stats: {
        exercise: "Squats",
        weight: "225 lbs",
        reps: "3x5",
        duration: "45 min",
      },
      engagement: {
        likes: 89,
        comments: 23,
        shares: 7,
        isLiked: true,
        isBookmarked: true,
      },
    },
    {
      id: 3,
      user: {
        name: "Emma Chen",
        username: "@emma_wellness",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      timestamp: "6 hours ago",
      location: "Home Kitchen",
      content: {
        text: "Meal prep Sunday done right! 🥗 Prepared 5 days worth of balanced meals. This colorful Buddha bowl has quinoa, roasted veggies, and tahini dressing. Nutrition is 80% of the journey!",
        image: "/images/healthy-bowl.png",
        type: "nutrition",
      },
      stats: {
        calories: 485,
        protein: "22g",
        carbs: "58g",
        fat: "18g",
      },
      engagement: {
        likes: 156,
        comments: 34,
        shares: 18,
        isLiked: true,
        isBookmarked: false,
      },
    },
    {
      id: 4,
      user: {
        name: "Jake Thompson",
        username: "@jake_transform",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      timestamp: "8 hours ago",
      location: "Sunset Beach",
      content: {
        text: "6 months transformation update! 📸 Down 35 pounds and feeling incredible. The journey isn't easy but every small step counts. Thank you all for the support! 🙏",
        image: "/images/transformation.png",
        type: "progress",
      },
      stats: {
        weightLoss: "35 lbs",
        timeframe: "6 months",
        bodyFat: "-12%",
        muscle: "+8 lbs",
      },
      engagement: {
        likes: 312,
        comments: 67,
        shares: 45,
        isLiked: true,
        isBookmarked: true,
      },
    },
    {
      id: 5,
      user: {
        name: "Lisa Park",
        username: "@lisa_zen",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      timestamp: "10 hours ago",
      location: "Malibu Beach",
      content: {
        text: "Starting the day with some peaceful yoga by the ocean 🧘‍♀️ There's something magical about connecting with nature while moving your body. Namaste! ✨",
        image: "/images/yoga-morning.png",
        type: "mindfulness",
      },
      stats: {
        duration: "30 min",
        style: "Vinyasa",
        poses: "15",
        mindfulness: "High",
      },
      engagement: {
        likes: 203,
        comments: 28,
        shares: 15,
        isLiked: false,
        isBookmarked: true,
      },
    },
    {
      id: 6,
      user: {
        name: "Alex Rivera",
        username: "@alex_fuel",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      timestamp: "12 hours ago",
      location: "Home Kitchen",
      content: {
        text: "Post-workout fuel! 🥤 This protein smoothie bowl is packed with berries, banana, protein powder, and topped with granola. Perfect recovery meal after leg day! 💪",
        image: "/images/protein-smoothie.png",
        type: "nutrition",
      },
      stats: {
        protein: "35g",
        calories: 420,
        carbs: "45g",
        fiber: "12g",
      },
      engagement: {
        likes: 78,
        comments: 19,
        shares: 8,
        isLiked: true,
        isBookmarked: false,
      },
    },
    {
      id: 7,
      user: {
        name: "David Kim",
        username: "@david_trails",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      timestamp: "14 hours ago",
      location: "Rocky Mountain Trail",
      content: {
        text: "Nothing beats a good hike to clear the mind! 🥾 Conquered this 8-mile trail today with 2,000ft elevation gain. The views at the top were absolutely worth every step! 🏔️",
        image: "/images/hiking-trail.png",
        type: "outdoor",
      },
      stats: {
        distance: "8.2 miles",
        elevation: "2,000 ft",
        time: "3h 45m",
        calories: 1240,
      },
      engagement: {
        likes: 134,
        comments: 41,
        shares: 22,
        isLiked: false,
        isBookmarked: true,
      },
    },
    {
      id: 8,
      user: {
        name: "Marcus Johnson",
        username: "@marcus_power",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      timestamp: "16 hours ago",
      location: "Iron Temple Gym",
      content: {
        text: "Deadlift day is the best day! 💀 Pulled 405lbs for a new 1RM today. Form was clean and felt strong throughout. Time to celebrate with some well-deserved rest! 🎉",
        image: "/images/gym-deadlift.png",
        type: "strength",
      },
      stats: {
        exercise: "Deadlift",
        weight: "405 lbs",
        reps: "1RM",
        duration: "60 min",
      },
      engagement: {
        likes: 267,
        comments: 52,
        shares: 31,
        isLiked: true,
        isBookmarked: true,
      },
    },
  ]

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "workout":
        return "bg-red-500"
      case "strength":
        return "bg-purple-500"
      case "nutrition":
        return "bg-green-500"
      case "progress":
        return "bg-blue-500"
      case "mindfulness":
        return "bg-indigo-500"
      case "outdoor":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "workout":
        return "🏃‍♀️"
      case "strength":
        return "💪"
      case "nutrition":
        return "🥗"
      case "progress":
        return "📈"
      case "mindfulness":
        return "🧘‍♀️"
      case "outdoor":
        return "🥾"
      default:
        return "🎯"
    }
  }

  const quickActions = [
    {
      icon: Camera,
      label: "Snap Photo",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      onClick: () => {
        // Handle snap photo action
        console.log("Snap Photo clicked")
      }
    },
    {
      icon: Barcode,
      label: "Barcode Scanner",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      onClick: () => {
        // Handle barcode scanner action
        console.log("Barcode Scanner clicked")
      }
    },
    {
      icon: Dumbbell,
      label: "Start Workout",
      color: "text-green-600",
      bgColor: "bg-green-100",
      onClick: () => {
        onNavigateToPage?.("workout")
      }
    },
    {
      icon: Utensils,
      label: "Track Meal",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      onClick: () => {
        onNavigateToPage?.("food")
      }
    },
    {
      icon: Settings,
      label: "Edit",
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      onClick: () => {
        // Handle edit quick actions
        console.log("Edit Quick Actions clicked")
      }
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-light text-deep-navy dark:text-dark-text mb-2">Good morning, Alex</h1>
        <p className="text-medium-gray dark:text-dark-muted text-sm">Ready to crush your goals today?</p>
      </div>

      {/* Goal Widgets */}
      <div className="grid grid-cols-2 gap-3">
        {goalWidgets.map((widget, index) => {
          const Icon = widget.icon
          return (
            <Card 
              key={index} 
              className="bg-white dark:bg-dark-card p-4 border border-border-gray dark:border-dark-border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                switch (widget.label) {
                  case "Calorie Intake":
                    onNavigateToPage?.("food")
                    break
                  case "Active Calories":
                    onNavigateToPage?.("workout")
                    break
                  case "Steps Walked":
                    onNavigateToPage?.("workout")
                    break
                  case "Water Intake":
                    onNavigateToPage?.("water")
                    break
                  default:
                    break
                }
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-full ${widget.bgColor} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${widget.color}`} />
                </div>
                <span className="text-xs text-medium-gray dark:text-dark-muted">{widget.target} {widget.unit}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline space-x-1">
                  <p className="text-2xl font-light text-deep-navy dark:text-dark-text">{widget.value}</p>
                  <span className="text-sm text-medium-gray dark:text-dark-muted">/ {widget.target}</span>
                </div>
                <p className="text-xs text-medium-gray dark:text-dark-muted">{widget.label}</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-light-gray dark:bg-dark-bg rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${widget.color.replace('text-', 'bg-')}`}
                    style={{ width: `${widget.progress}%` }}
                  />
                </div>
                
                {/* Subtext */}
                {widget.subtext && (
                  <p className="text-xs text-bright-blue font-medium">{widget.subtext}</p>
                )}
                
                {/* Quick Add Button for Water */}
                {widget.label === "Water Intake" && (
                  <Button
                    size="sm"
                    className="mt-2 bg-bright-blue hover:bg-bright-blue/90 text-white h-6 px-2 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    +250ml
                  </Button>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions Section */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Quick Actions</h2>
        <div className="grid grid-cols-5 gap-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card 
                key={index} 
                className="bg-white dark:bg-dark-card p-3 border border-border-gray dark:border-dark-border hover:shadow-md transition-shadow cursor-pointer"
                onClick={action.onClick}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-8 h-8 rounded-lg ${action.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${action.color}`} />
                  </div>
                  <p className="text-xs font-medium text-deep-navy dark:text-dark-text text-center leading-tight">
                    {action.label}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Goal Overview Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Goal Overview</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-bright-blue"
            onClick={() => onNavigateToPage?.("goals")}
          >
            See All Goals
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-2">
          {userGoals.map((goal) => (
            <Card key={goal.id} className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center text-sm">
                    {goal.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{goal.title}</p>
                    <p className="text-xs text-medium-gray dark:text-dark-muted">
                      {goal.current} / {goal.target}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{goal.progress}%</p>
                  <div className="w-16 bg-light-gray dark:bg-dark-bg rounded-full h-1.5 mt-1">
                    <div
                      className="bg-bright-blue h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Challenges */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Featured Challenges</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {challenges.map((challenge, index) => (
            <Card key={index} className="bg-primary-gradient p-4 border-0 text-white min-w-[200px] flex-shrink-0">
              <div className="flex items-center mb-2">
                <Trophy className="h-4 w-4 mr-2" />
                <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                  {challenge.participants}
                </Badge>
              </div>
              <h3 className="font-medium text-sm mb-2">{challenge.title}</h3>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
              <p className="text-xs opacity-90">{challenge.progress}% complete</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Stories Section */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Stories</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {stories.map((story, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 min-w-[60px]">
              <div
                className={`relative ${story.hasStory ? "p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600" : ""}`}
              >
                <div className={`${story.hasStory ? "p-0.5 bg-white dark:bg-dark-card rounded-full" : ""}`}>
                  <Avatar className={`w-14 h-14 ${story.isViewed ? "opacity-60" : ""}`}>
                    <AvatarImage src={story.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary-gradient text-white">
                      {story.user === "You" ? "🎯" : story.user[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {story.user === "You" && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-bright-blue rounded-full border-2 border-white dark:border-dark-card flex items-center justify-center">
                    <span className="text-white text-xs">+</span>
                  </div>
                )}
              </div>
              <span className="text-xs text-deep-navy dark:text-dark-text font-medium truncate w-full text-center">
                {story.user === "You" ? "Your story" : story.user}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Community Feed</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            <Users className="h-4 w-4 mr-1" />
            Discover
          </Button>
        </div>

        {/* Feed Posts */}
        <div className="space-y-4">
          {feedPosts.map((post) => (
            <Card
              key={post.id}
              className="border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card overflow-hidden"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary-gradient text-white">{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1">
                      <h3 className="font-semibold text-sm text-deep-navy dark:text-dark-text">{post.user.name}</h3>
                      {post.user.isVerified && (
                        <div className="w-4 h-4 bg-bright-blue rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-medium-gray dark:text-dark-muted">
                      <span>{post.user.username}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4 text-medium-gray" />
                </Button>
              </div>

              {/* Post Image */}
              <div className="relative">
                <img
                  src={post.content.image || "/placeholder.svg"}
                  alt="Post content"
                  className="w-full h-64 object-cover"
                />
                {/* Post Type Badge */}
                <div
                  className={`absolute top-3 left-3 ${getPostTypeColor(post.content.type)} rounded-full px-2 py-1 flex items-center space-x-1`}
                >
                  <span className="text-xs">{getPostTypeIcon(post.content.type)}</span>
                  <span className="text-xs font-medium text-white capitalize">{post.content.type}</span>
                </div>
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`p-0 h-auto ${post.engagement.isLiked ? "text-red-500" : "text-medium-gray dark:text-dark-muted"}`}
                    >
                      <Heart className={`h-6 w-6 ${post.engagement.isLiked ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-medium-gray dark:text-dark-muted">
                      <MessageCircle className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-medium-gray dark:text-dark-muted">
                      <Share className="h-6 w-6" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-0 h-auto ${post.engagement.isBookmarked ? "text-bright-blue" : "text-medium-gray dark:text-dark-muted"}`}
                  >
                    <Bookmark className={`h-6 w-6 ${post.engagement.isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                </div>

                {/* Engagement Stats */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-deep-navy dark:text-dark-text">
                    {post.engagement.likes.toLocaleString()} likes
                  </p>

                  {/* Post Content */}
                  <div className="text-sm text-deep-navy dark:text-dark-text">
                    <span className="font-semibold">{post.user.username}</span> <span>{post.content.text}</span>
                  </div>

                  {/* Location */}
                  {post.location && (
                    <div className="flex items-center space-x-1 text-xs text-medium-gray dark:text-dark-muted">
                      <MapPin className="h-3 w-3" />
                      <span>{post.location}</span>
                    </div>
                  )}

                  {/* Workout Stats */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(post.stats).map(([key, value]) => (
                      <Badge key={key} variant="secondary" className="text-xs bg-light-gray dark:bg-dark-bg">
                        {key}: {value}
                      </Badge>
                    ))}
                  </div>

                  {/* Comments Preview */}
                  {post.engagement.comments > 0 && (
                    <Button variant="ghost" className="p-0 h-auto text-xs text-medium-gray dark:text-dark-muted">
                      View all {post.engagement.comments} comments
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="flex justify-center py-4">
        <Button
          variant="outline"
          className="text-bright-blue border-bright-blue hover:bg-bright-blue hover:text-white bg-transparent"
        >
          Load More Posts
        </Button>
      </div>
    </div>
  )
}
