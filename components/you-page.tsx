import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Calendar, Star, Target, Award, Edit, Share, ChevronRight } from "lucide-react"

export default function YouPage() {
  const achievements = [
    { title: "First Steps", description: "Completed your first day", icon: "🎯", earned: true },
    { title: "Week Warrior", description: "7-day streak achieved", icon: "🔥", earned: true },
    { title: "Hydration Hero", description: "Drank 8 glasses daily for a week", icon: "💧", earned: true },
    { title: "Early Bird", description: "Morning workouts for 5 days", icon: "🌅", earned: false },
    { title: "Step Master", description: "Reached 15,000 steps in a day", icon: "👟", earned: true },
    { title: "Consistency King", description: "30-day streak", icon: "👑", earned: false },
  ]

  const journeyMilestones = [
    { date: "Today", event: "Completed water goal", type: "goal", icon: "💧" },
    { date: "Yesterday", event: "New personal best: 15,420 steps", type: "achievement", icon: "🏆" },
    { date: "3 days ago", event: "Started 30-Day Step Challenge", type: "challenge", icon: "🎯" },
    { date: "1 week ago", event: "Reached 7-day streak", type: "milestone", icon: "🔥" },
    { date: "2 weeks ago", event: "Joined GetFit community", type: "milestone", icon: "🎉" },
  ]

  // Calendar heatmap data (simplified)
  const heatmapData = Array.from({ length: 365 }, (_, i) => ({
    date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000),
    intensity: Math.floor(Math.random() * 5), // 0-4 intensity levels
  }))

  const getHeatmapColor = (intensity: number) => {
    const colors = [
      "bg-border-gray dark:bg-dark-border", // 0 - no activity
      "bg-light-blue/30 dark:bg-light-blue/20", // 1 - low
      "bg-light-blue/60 dark:bg-light-blue/40", // 2 - medium
      "bg-bright-blue/80 dark:bg-bright-blue/60", // 3 - high
      "bg-bright-blue dark:bg-bright-blue", // 4 - very high
    ]
    return colors[intensity] || colors[0]
  }

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="p-6 border border-border-gray bg-gradient-to-br from-light-blue/10 to-bright-blue/10 dark:bg-dark-card">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
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
          <Button variant="ghost" size="icon" className="text-medium-gray">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 border border-border-gray text-center dark:bg-dark-card">
          <Calendar className="h-5 w-5 mx-auto mb-1 text-bright-blue" />
          <p className="text-lg font-light text-deep-navy dark:text-dark-text">12</p>
          <p className="text-xs text-medium-gray dark:text-dark-muted">Day Streak</p>
        </Card>
        <Card className="p-3 border border-border-gray text-center dark:bg-dark-card">
          <Target className="h-5 w-5 mx-auto mb-1 text-light-blue" />
          <p className="text-lg font-light text-deep-navy dark:text-dark-text">8</p>
          <p className="text-xs text-medium-gray dark:text-dark-muted">Goals Active</p>
        </Card>
        <Card className="p-3 border border-border-gray text-center dark:bg-dark-card">
          <Award className="h-5 w-5 mx-auto mb-1 text-bright-blue" />
          <p className="text-lg font-light text-deep-navy dark:text-dark-text">4</p>
          <p className="text-xs text-medium-gray dark:text-dark-muted">Achievements</p>
        </Card>
      </div>

      {/* Fitness Journey Timeline */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-white">Fitness Journey</h2>
        <Card className="p-4 border border-border-gray dark:bg-dark-card">
          <div className="space-y-3">
            {journeyMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center text-sm">
                  {milestone.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{milestone.event}</p>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">{milestone.date}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {milestone.type}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
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

      {/* Activity Calendar Heatmap */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Activity Calendar</h2>
        <Card className="p-3 border border-border-gray dark:border-dark-border dark:bg-dark-card">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-medium-gray dark:text-dark-muted">Less</span>
              <div className="flex items-center space-x-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div key={level} className={`w-2 h-2 rounded-sm ${getHeatmapColor(level)}`} />
                ))}
              </div>
              <span className="text-medium-gray dark:text-dark-muted">More</span>
            </div>

            {/* Compact 12-week view */}
            <div className="grid grid-cols-12 gap-0.5">
              {Array.from({ length: 84 }, (_, i) => {
                const intensity = Math.floor(Math.random() * 5)
                return (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-sm ${getHeatmapColor(intensity)}`}
                    title={`Week ${Math.floor(i / 7) + 1}`}
                  />
                )
              })}
            </div>

            {/* Month labels */}
            <div className="flex justify-between text-xs text-medium-gray dark:text-dark-muted mt-1">
              <span>3 months ago</span>
              <span>Now</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border-gray dark:border-dark-border">
              <p className="text-xs text-medium-gray dark:text-dark-muted">247 activities this year</p>
              <Badge variant="outline" className="text-xs">
                12-day streak
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Settings */}
      <Card className="p-4 border border-border-gray dark:bg-dark-card">
        <div className="space-y-3">
          <h3 className="font-medium text-deep-navy dark:text-dark-text">Settings</h3>
          <div className="space-y-2">
            {[
              { label: "Notifications", icon: "🔔" },
              { label: "Privacy", icon: "🔒" },
              { label: "Data Export", icon: "📊" },
              { label: "Help & Support", icon: "❓" },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{setting.icon}</span>
                  <span className="text-sm text-deep-navy dark:text-dark-text">{setting.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-medium-gray" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
