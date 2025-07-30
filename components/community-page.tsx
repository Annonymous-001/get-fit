import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Trophy,
  TrendingUp,
  MapPin,
  Clock,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  Search,
  Filter,
} from "lucide-react"

interface CommunityPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function CommunityPage({ onNavigateToPage, onNavigateToTab }: CommunityPageProps) {
  const communityStats = [
    { label: "Active Users", value: "2.4k", icon: Users, color: "text-bright-blue" },
    { label: "Challenges", value: "12", icon: Trophy, color: "text-light-blue" },
    { label: "Activities", value: "8.7k", icon: TrendingUp, color: "text-bright-blue" },
  ]

  const featuredChallenges = [
    {
      id: 1,
      title: "30-Day Step Challenge",
      participants: "2.4k",
      progress: 65,
      daysLeft: 12,
      reward: "🏆 Exclusive Badge",
      image: "/images/workout-run.png",
    },
    {
      id: 2,
      title: "Hydration Hero",
      participants: "1.8k",
      progress: 80,
      daysLeft: 8,
      reward: "💧 Water Master",
      image: "/images/healthy-bowl.png",
    },
    {
      id: 3,
      title: "Morning Warrior",
      participants: "3.1k",
      progress: 45,
      daysLeft: 15,
      reward: "🌅 Early Bird",
      image: "/images/yoga-morning.png",
    },
  ]

  const communityPosts = [
    {
      id: 1,
      user: {
        name: "Sarah Martinez",
        username: "@sarah_fit",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
        level: "Elite",
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
        level: "Pro",
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

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-light text-deep-navy dark:text-dark-text mb-2">Community</h1>
        <p className="text-medium-gray dark:text-dark-muted text-sm">Connect with fitness enthusiasts</p>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-medium-gray" />
          <input
            type="text"
            placeholder="Search community..."
            className="w-full pl-10 pr-4 py-2 bg-light-gray dark:bg-dark-bg border border-border-gray dark:border-dark-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bright-blue"
          />
        </div>
        <Button variant="outline" size="icon" className="border-border-gray dark:border-dark-border">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-3 gap-3">
        {communityStats.map((stat, index) => {
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

      {/* Featured Challenges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Featured Challenges</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            View All
          </Button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {featuredChallenges.map((challenge) => (
            <Card key={challenge.id} className="bg-primary-gradient p-4 border-0 text-white min-w-[200px] flex-shrink-0">
              <div className="relative mb-3">
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-20 object-cover rounded-lg opacity-80"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    {challenge.daysLeft}d left
                  </Badge>
                </div>
              </div>
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
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-90">{challenge.progress}% complete</p>
                <p className="text-xs opacity-90">{challenge.reward}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Recent Activity</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            <Users className="h-4 w-4 mr-1" />
            Follow
          </Button>
        </div>

        {/* Feed Posts */}
        <div className="space-y-4">
          {communityPosts.map((post) => (
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
                      <Badge variant="outline" className="text-xs bg-bright-blue/10 text-bright-blue border-bright-blue/20">
                        {post.user.level}
                      </Badge>
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