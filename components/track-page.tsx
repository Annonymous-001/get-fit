'use client'

import { useState } from "react"
import { 
  Utensils, 
  Droplets, 
  Moon, 
  Scale,
  Activity,
  ChevronRight,
  Plus,
  Clock,
  Flame,
  MapPin,
  X
} from "lucide-react"

interface TrackPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function TrackPage({ onNavigateToPage, onNavigateToTab }: TrackPageProps) {
  const [showModal, setShowModal] = useState(false)

  const activityOptions = [
    {
      icon: Utensils,
      title: "Food",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Activity,
      title: "Workout",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Scale,
      title: "Weight",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Droplets,
      title: "Water",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Activity,
      title: "Steps",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Moon,
      title: "Sleep",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "Food",
      title: "Breakfast Bowl",
      time: "8:30 AM",
      calories: "320 cal",
      icon: Utensils,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      id: 2,
      type: "Workout",
      title: "Morning Run",
      time: "6:15 AM",
      duration: "25 min",
      calories: "280 cal",
      icon: Activity,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: 3,
      type: "Water",
      title: "Water Intake",
      time: "9:00 AM",
      amount: "500ml",
      icon: Droplets,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 4,
      type: "Weight",
      title: "Weight Log",
      time: "7:00 AM",
      value: "75.2 kg",
      icon: Scale,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ]



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Main Content */}
      <div className="p-4">
        {/* Header */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-semibold text-deep-navy dark:text-dark-text mb-2">Add Activity</h1>
          <p className="text-medium-gray dark:text-dark-muted text-sm">Track your fitness journey</p>
        </div>

        {/* Quick Add Button */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Activity</span>
          </button>
        </div>

        {/* Recent Activities */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-deep-navy dark:text-dark-text">Recent Activities</h2>
            <button className="text-purple-500 hover:text-purple-600 font-medium">View All</button>
          </div>
          
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const Icon = activity.icon
              return (
                <div
                  key={activity.id}
                  className="bg-white dark:bg-dark-card rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => {
                    switch (activity.type) {
                      case "Workout":
                        onNavigateToPage?.("workout")
                        break
                      case "Food":
                        onNavigateToPage?.("food")
                        break
                      case "Weight":
                        onNavigateToPage?.("weight")
                        break
                      case "Water":
                        onNavigateToPage?.("water")
                        break
                      case "Sleep":
                        onNavigateToPage?.("sleep")
                        break
                      default:
                        break
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full ${activity.bgColor} flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${activity.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-deep-navy dark:text-dark-text">{activity.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-medium-gray dark:text-dark-muted">
                          <Clock className="h-4 w-4" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.calories && (
                        <div className="flex items-center space-x-1 text-sm text-purple-500">
                          <Flame className="h-4 w-4" />
                          <span>{activity.calories}</span>
                        </div>
                      )}
                      {activity.duration && (
                        <div className="text-sm text-medium-gray dark:text-dark-muted">{activity.duration}</div>
                      )}
                      {activity.amount && (
                        <div className="text-sm text-blue-500">{activity.amount}</div>
                      )}
                      {activity.value && (
                        <div className="text-sm text-green-500">{activity.value}</div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-dark-card rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                <Flame className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-medium-gray dark:text-dark-muted">Today's Calories</p>
                <p className="text-lg font-semibold text-deep-navy dark:text-dark-text">1,240</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-dark-card rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-medium-gray dark:text-dark-muted">Activities</p>
                <p className="text-lg font-semibold text-deep-navy dark:text-dark-text">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white dark:bg-dark-card rounded-t-3xl w-full max-w-md mx-4 mb-0 shadow-2xl max-h-[60vh]">
            {/* Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-deep-navy dark:text-dark-text">
                What Would You Like to Track?
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            {/* Activity Options List */}
            <div className="px-6 py-4 overflow-y-auto max-h-[40vh]">
              <div className="space-y-2">
                {activityOptions.map((option, index) => {
                  const Icon = option.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick={() => {
                        setShowModal(false)
                        switch (option.title) {
                          case "Workout":
                            onNavigateToPage?.("workout")
                            break
                          case "Food":
                            onNavigateToPage?.("food")
                            break
                          case "Weight":
                            onNavigateToPage?.("weight")
                            break
                          case "Water":
                            onNavigateToPage?.("water")
                            break
                          case "Sleep":
                            onNavigateToPage?.("sleep")
                            break
                          case "Steps":
                            onNavigateToPage?.("workout")
                            break
                          default:
                            break
                        }
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full ${option.bgColor} flex items-center justify-center`}>
                          <Icon className={`h-4 w-4 ${option.color}`} />
                        </div>
                        <span className="text-base font-medium text-deep-navy dark:text-dark-text">
                          {option.title}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Bottom Spacing */}
            <div className="h-4"></div>
          </div>
          
          {/* Backdrop Click to Close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={() => setShowModal(false)}
          />
        </div>
      )}
    </div>
  )
}
