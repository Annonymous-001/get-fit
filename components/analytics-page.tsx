import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Calendar,
  Award,
  Target,
  Sparkles,
  Users,
  ChevronDown,
  Flame,
  Footprints,
  Moon,
  Smile,
} from "lucide-react"

export default function AnalyticsPage() {
  const heroStats = [
    { label: "Current Streak", value: "12", unit: "days", icon: Calendar, color: "text-bright-blue" },
    { label: "Community Rank", value: "#247", unit: "of 10k", icon: Award, color: "text-light-blue" },
    { label: "Best Day", value: "15,420", unit: "steps", icon: Target, color: "text-bright-blue" },
  ]

  const chartData = [
    { day: "Mon", calories: 1850, steps: 8200, sleep: 7.2, mood: 4 },
    { day: "Tue", calories: 2100, steps: 9500, sleep: 6.8, mood: 3 },
    { day: "Wed", calories: 1950, steps: 10200, sleep: 7.5, mood: 5 },
    { day: "Thu", calories: 2200, steps: 8800, sleep: 7.0, mood: 4 },
    { day: "Fri", calories: 1800, steps: 12000, sleep: 8.0, mood: 5 },
    { day: "Sat", calories: 2300, steps: 15420, sleep: 8.2, mood: 5 },
    { day: "Sun", calories: 1900, steps: 7500, sleep: 7.8, mood: 4 },
  ]

  const insights = [
    {
      type: "Trend",
      title: "Your step count is trending upward",
      description: "23% increase compared to last week",
      icon: TrendingUp,
      color: "text-bright-blue",
    },
    {
      type: "Correlation",
      title: "Better sleep improves your mood",
      description: "Strong correlation detected in your data",
      icon: Sparkles,
      color: "text-light-blue",
    },
    {
      type: "Tip",
      title: "Peak activity time: 6-8 PM",
      description: "Schedule workouts during this window",
      icon: Target,
      color: "text-bright-blue",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Sarah M.", points: 2847, avatar: "🏃‍♀️" },
    { rank: 2, name: "Mike R.", points: 2756, avatar: "💪" },
    { rank: 3, name: "Emma L.", points: 2689, avatar: "🚴‍♀️" },
    { rank: 247, name: "You", points: 1923, avatar: "🎯", isUser: true },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-light text-deep-navy dark:text-dark-text mb-2">Analytics</h1>
        <p className="text-medium-gray dark:text-dark-muted text-sm">Insights into your fitness journey</p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          className="flex items-center space-x-2 bg-transparent border-border-gray dark:border-dark-border text-deep-navy dark:text-dark-text"
        >
          <Calendar className="h-4 w-4" />
          <span>This Week</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Badge variant="secondary" className="bg-primary-gradient text-white">
          7 days tracked
        </Badge>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-3 gap-3">
        {heroStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="p-3 border border-border-gray dark:border-dark-border text-center bg-white dark:bg-dark-card"
            >
              <Icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
              <p className="text-lg font-light text-deep-navy dark:text-dark-text">{stat.value}</p>
              <p className="text-xs text-medium-gray dark:text-dark-muted">{stat.unit}</p>
              <p className="text-xs text-medium-gray dark:text-dark-muted mt-1">{stat.label}</p>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="steps" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-light-gray dark:bg-dark-bg">
          <TabsTrigger
            value="steps"
            className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card"
          >
            Steps
          </TabsTrigger>
          <TabsTrigger
            value="calories"
            className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card"
          >
            Calories
          </TabsTrigger>
          <TabsTrigger
            value="sleep"
            className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card"
          >
            Sleep
          </TabsTrigger>
          <TabsTrigger
            value="mood"
            className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card"
          >
            Mood
          </TabsTrigger>
        </TabsList>

        <TabsContent value="steps" className="space-y-4">
          <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Footprints className="h-5 w-5 text-bright-blue" />
                <h3 className="font-medium text-deep-navy dark:text-dark-text">Daily Steps</h3>
              </div>
              <Badge variant="outline">Avg: 10,234</Badge>
            </div>
            <div className="h-32 flex items-end justify-between space-x-1">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-1 flex-1">
                  <div
                    className="w-full bg-primary-gradient rounded-t"
                    style={{ height: `${(data.steps / 16000) * 100}%`, minHeight: "4px" }}
                  />
                  <span className="text-xs text-medium-gray dark:text-dark-muted">{data.day}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="calories" className="space-y-4">
          <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-bright-blue" />
                <h3 className="font-medium text-deep-navy dark:text-dark-text">Calories Burned</h3>
              </div>
              <Badge variant="outline">Avg: 2,014</Badge>
            </div>
            <div className="h-32 flex items-end justify-between space-x-1">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-1 flex-1">
                  <div
                    className="w-full bg-primary-gradient rounded-t"
                    style={{ height: `${(data.calories / 2500) * 100}%`, minHeight: "4px" }}
                  />
                  <span className="text-xs text-medium-gray dark:text-dark-muted">{data.day}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-4">
          <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Moon className="h-5 w-5 text-bright-blue" />
                <h3 className="font-medium text-deep-navy dark:text-dark-text">Sleep Hours</h3>
              </div>
              <Badge variant="outline">Avg: 7.4h</Badge>
            </div>
            <div className="h-32 flex items-end justify-between space-x-1">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-1 flex-1">
                  <div
                    className="w-full bg-primary-gradient rounded-t"
                    style={{ height: `${(data.sleep / 10) * 100}%`, minHeight: "4px" }}
                  />
                  <span className="text-xs text-medium-gray dark:text-dark-muted">{data.day}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="mood" className="space-y-4">
          <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Smile className="h-5 w-5 text-bright-blue" />
                <h3 className="font-medium text-deep-navy dark:text-dark-text">Mood Rating</h3>
              </div>
              <Badge variant="outline">Avg: 4.3/5</Badge>
            </div>
            <div className="h-32 flex items-end justify-between space-x-1">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-1 flex-1">
                  <div
                    className="w-full bg-primary-gradient rounded-t"
                    style={{ height: `${(data.mood / 5) * 100}%`, minHeight: "4px" }}
                  />
                  <span className="text-xs text-medium-gray dark:text-dark-muted">{data.day}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Insights */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-bright-blue" />
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">AI Insights</h2>
        </div>
        <div className="space-y-2">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <Card
                key={index}
                className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text mb-1">{insight.title}</p>
                    <p className="text-xs text-medium-gray dark:text-dark-muted">{insight.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Community Leaderboard */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-bright-blue" />
            <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Leaderboard</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            View Full
          </Button>
        </div>
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  user.isUser ? "bg-primary-gradient text-white" : "bg-light-gray dark:bg-dark-bg"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      user.isUser ? "bg-white/20" : "bg-white dark:bg-dark-card"
                    }`}
                  >
                    {user.rank <= 3 ? (
                      <span className={user.isUser ? "text-white" : "text-deep-navy dark:text-dark-text"}>
                        #{user.rank}
                      </span>
                    ) : (
                      <span className="text-lg">{user.avatar}</span>
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${user.isUser ? "text-white" : "text-deep-navy dark:text-dark-text"}`}
                    >
                      {user.name}
                    </p>
                    <p className={`text-xs ${user.isUser ? "text-white/80" : "text-medium-gray dark:text-dark-muted"}`}>
                      {user.points} points
                    </p>
                  </div>
                </div>
                {user.rank <= 3 && (
                  <Award
                    className={`h-4 w-4 ${
                      user.rank === 1 ? "text-yellow-500" : user.rank === 2 ? "text-gray-400" : "text-orange-500"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
