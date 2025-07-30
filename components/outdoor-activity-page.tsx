'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft,
  Play,
  Pause,
  CircleStop,
  MapPin,
  Navigation,
  Timer,
  TrendingUp,
  Heart,
  Clock,
  Zap,
  Settings,
  MoreHorizontal,
  ChevronDown
} from "lucide-react"

interface OutdoorActivityPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function OutdoorActivityPage({ onNavigateToPage, onNavigateToTab }: OutdoorActivityPageProps) {
  const activityData = {
    type: "Running",
    status: "active", // 'ready', 'active', 'paused'
    duration: "00:24:15",
    distance: "3.2",
    pace: "7:35",
    elevation: "45",
    heartRate: "145",
    calories: "324",
    gps: {
      accuracy: "Good",
      signal: "Strong",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194
      }
    }
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
        <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">{activityData.type}</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Map Area */}
      <Card className="aspect-square w-full border border-border-gray dark:border-dark-border bg-light-gray dark:bg-dark-bg overflow-hidden">
        <div className="relative w-full h-full">
          {/* Map would be rendered here using a mapping library */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button variant="outline" size="icon" className="bg-white dark:bg-dark-card h-8 w-8">
              <Navigation className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-white dark:bg-dark-card h-8 w-8">
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
          
          {/* GPS Status */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-green-500 text-white border-0">
              GPS Signal: {activityData.gps.accuracy}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-2 gap-3">
        {/* Duration */}
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-1">
            <p className="text-sm text-medium-gray dark:text-dark-muted">Duration</p>
            <div className="flex items-baseline space-x-1">
              <Clock className="h-4 w-4 text-bright-blue" />
              <span className="text-2xl font-light text-deep-navy dark:text-dark-text">
                {activityData.duration}
              </span>
            </div>
          </div>
        </Card>

        {/* Distance */}
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-1">
            <p className="text-sm text-medium-gray dark:text-dark-muted">Distance</p>
            <div className="flex items-baseline space-x-1">
              <MapPin className="h-4 w-4 text-green-500" />
              <span className="text-2xl font-light text-deep-navy dark:text-dark-text">
                {activityData.distance}
              </span>
              <span className="text-sm text-medium-gray dark:text-dark-muted">km</span>
            </div>
          </div>
        </Card>

        {/* Pace */}
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-1">
            <p className="text-sm text-medium-gray dark:text-dark-muted">Pace</p>
            <div className="flex items-baseline space-x-1">
              <Timer className="h-4 w-4 text-orange-500" />
              <span className="text-2xl font-light text-deep-navy dark:text-dark-text">
                {activityData.pace}
              </span>
              <span className="text-sm text-medium-gray dark:text-dark-muted">/km</span>
            </div>
          </div>
        </Card>

        {/* Heart Rate */}
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-1">
            <p className="text-sm text-medium-gray dark:text-dark-muted">Heart Rate</p>
            <div className="flex items-baseline space-x-1">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-2xl font-light text-deep-navy dark:text-dark-text">
                {activityData.heartRate}
              </span>
              <span className="text-sm text-medium-gray dark:text-dark-muted">bpm</span>
            </div>
          </div>
        </Card>

        {/* Elevation */}
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-1">
            <p className="text-sm text-medium-gray dark:text-dark-muted">Elevation</p>
            <div className="flex items-baseline space-x-1">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span className="text-2xl font-light text-deep-navy dark:text-dark-text">
                {activityData.elevation}
              </span>
              <span className="text-sm text-medium-gray dark:text-dark-muted">m</span>
            </div>
          </div>
        </Card>

        {/* Calories */}
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-1">
            <p className="text-sm text-medium-gray dark:text-dark-muted">Calories</p>
            <div className="flex items-baseline space-x-1">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-2xl font-light text-deep-navy dark:text-dark-text">
                {activityData.calories}
              </span>
              <span className="text-sm text-medium-gray dark:text-dark-muted">kcal</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Control Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-dark-card border-t border-border-gray dark:border-dark-border">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Settings className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="h-16 w-16 rounded-full border-2 border-red-500">
              <CircleStop className="h-8 w-8 text-red-500" />
            </Button>
            <Button className="h-16 w-16 rounded-full bg-primary-gradient hover:opacity-90">
              {activityData.status === 'active' ? (
                <Pause className="h-8 w-8 text-white" />
              ) : (
                <Play className="h-8 w-8 text-white" />
              )}
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="h-12 w-12">
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}