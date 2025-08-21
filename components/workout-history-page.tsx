'use client'

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft,
  MapPin,
  Clock,
  Flame,
  TrendingUp,
  Calendar,
  Activity,
  Play,
  Route,
  Target,
  Zap,
  Heart,
  Navigation
} from "lucide-react"

interface WorkoutSession {
  id: string
  type: string
  startTime: Date
  endTime?: Date
  duration: number // in seconds
  distance?: number // in meters
  calories: number
  pace?: string
  route?: Array<{lat: number, lng: number}>
  isActive: boolean
}

interface WorkoutHistoryPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function WorkoutHistoryPage({ onNavigateToPage, onNavigateToTab }: WorkoutHistoryPageProps) {
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([])
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutSession | null>(null)
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 37.7749, lng: -122.4194 })

  // Load workout history on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('workoutHistory')
    if (savedHistory) {
      const history = JSON.parse(savedHistory)
      // Convert string dates back to Date objects
      const parsedHistory = history.map((workout: any) => ({
        ...workout,
        startTime: new Date(workout.startTime),
        endTime: workout.endTime ? new Date(workout.endTime) : undefined
      }))
      setWorkoutHistory(parsedHistory)
      
      // Set map center to the first workout's starting point if available
      if (parsedHistory.length > 0 && parsedHistory[0].route && parsedHistory[0].route.length > 0) {
        setMapCenter(parsedHistory[0].route[0])
      }
    }
  }, [])

  // Helper functions
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`
    }
    return `${(meters / 1000).toFixed(2)}km`
  }

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'running':
        return <Activity className="h-5 w-5 text-red-500" />
      case 'walking':
        return <MapPin className="h-5 w-5 text-green-500" />
      case 'cycling':
        return <Route className="h-5 w-5 text-blue-500" />
      case 'swimming':
        return <Target className="h-5 w-5 text-cyan-500" />
      default:
        return <Activity className="h-5 w-5 text-purple-500" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'running':
        return 'bg-red-500/10 text-red-500'
      case 'walking':
        return 'bg-green-500/10 text-green-500'
      case 'cycling':
        return 'bg-blue-500/10 text-blue-500'
      case 'swimming':
        return 'bg-cyan-500/10 text-cyan-500'
      default:
        return 'bg-purple-500/10 text-purple-500'
    }
  }

  const calculateAveragePace = (workouts: WorkoutSession[]): string => {
    if (workouts.length === 0) return "0:00"
    
    const totalTime = workouts.reduce((sum, w) => sum + w.duration, 0)
    const totalDistance = workouts.reduce((sum, w) => sum + (w.distance || 0), 0)
    
    if (totalDistance === 0) return "0:00"
    
    const paceSeconds = (totalTime / totalDistance) * 1000 // seconds per km
    const minutes = Math.floor(paceSeconds / 60)
    const secs = Math.floor(paceSeconds % 60)
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const totalStats = {
    workouts: workoutHistory.length,
    totalDistance: workoutHistory.reduce((sum, w) => sum + (w.distance || 0), 0),
    totalCalories: workoutHistory.reduce((sum, w) => sum + w.calories, 0),
    totalTime: workoutHistory.reduce((sum, w) => sum + w.duration, 0),
    averagePace: calculateAveragePace(workoutHistory)
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
        <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">Workout History</h1>
        <div className="w-10" />
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-1">
            <p className="text-sm text-medium-gray dark:text-dark-muted">Total Workouts</p>
            <div className="flex items-baseline space-x-1">
              <Activity className="h-4 w-4 text-bright-blue" />
              <span className="text-2xl font-light text-deep-navy dark:text-dark-text">
                {totalStats.workouts}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-1">
            <p className="text-sm text-medium-gray dark:text-dark-muted">Total Distance</p>
            <div className="flex items-baseline space-x-1">
              <MapPin className="h-4 w-4 text-green-500" />
              <span className="text-2xl font-light text-deep-navy dark:text-dark-text">
                {formatDistance(totalStats.totalDistance)}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-1">
            <p className="text-sm text-medium-gray dark:text-dark-muted">Total Calories</p>
            <div className="flex items-baseline space-x-1">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-2xl font-light text-deep-navy dark:text-dark-text">
                {totalStats.totalCalories}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-1">
            <p className="text-sm text-medium-gray dark:text-dark-muted">Avg Pace</p>
            <div className="flex items-baseline space-x-1">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span className="text-2xl font-light text-deep-navy dark:text-dark-text">
                {totalStats.averagePace}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Map Section */}
      {selectedWorkout && selectedWorkout.route && selectedWorkout.route.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Route Map</h2>
          <Card className="aspect-square w-full border border-border-gray dark:border-dark-border bg-light-gray dark:bg-dark-bg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* This would be replaced with an actual map component */}
              <div className="text-center space-y-2">
                <Navigation className="h-12 w-12 text-bright-blue mx-auto" />
                <p className="text-sm text-medium-gray dark:text-dark-muted">Map View</p>
                <p className="text-xs text-medium-gray dark:text-dark-muted">
                  Route: {selectedWorkout.route.length} points
                </p>
              </div>
            </div>
            
            {/* Route visualization overlay */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
              <polyline
                points={selectedWorkout.route.map((point, index) => {
                  const x = ((point.lng + 180) / 360) * 100
                  const y = ((90 - point.lat) / 180) * 100
                  return `${x}%,${y}%`
                }).join(' ')}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Start point */}
              {selectedWorkout.route.length > 0 && (
                <circle
                  cx={`${((selectedWorkout.route[0].lng + 180) / 360) * 100}%`}
                  cy={`${((90 - selectedWorkout.route[0].lat) / 180) * 100}%`}
                  r="4"
                  fill="#10B981"
                />
              )}
              {/* End point */}
              {selectedWorkout.route.length > 1 && (
                <circle
                  cx={`${((selectedWorkout.route[selectedWorkout.route.length - 1].lng + 180) / 360) * 100}%`}
                  cy={`${((90 - selectedWorkout.route[selectedWorkout.route.length - 1].lat) / 180) * 100}%`}
                  r="4"
                  fill="#EF4444"
                />
              )}
            </svg>
          </Card>
        </div>
      )}

      {/* Workout History List */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Recent Workouts</h2>
        
        {workoutHistory.length > 0 ? (
          <div className="space-y-3">
            {workoutHistory.map((workout) => (
              <Card 
                key={workout.id} 
                className={`p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card cursor-pointer transition-all hover:shadow-md ${
                  selectedWorkout?.id === workout.id ? 'ring-2 ring-bright-blue' : ''
                }`}
                onClick={() => setSelectedWorkout(workout)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${getActivityColor(workout.type)} flex items-center justify-center`}>
                      {getActivityIcon(workout.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-deep-navy dark:text-dark-text text-sm">{workout.type}</h3>
                      <p className="text-xs text-medium-gray dark:text-dark-muted">
                        {formatDate(workout.startTime)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getActivityColor(workout.type)}>
                    {workout.route && workout.route.length > 0 ? 'GPS' : 'Manual'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-medium-gray" />
                    <span className="text-deep-navy dark:text-dark-text">{formatTime(workout.duration)}</span>
                  </div>
                  {workout.distance && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-medium-gray" />
                      <span className="text-deep-navy dark:text-dark-text">{formatDistance(workout.distance)}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Flame className="h-3 w-3 text-medium-gray" />
                    <span className="text-deep-navy dark:text-dark-text">{workout.calories} cal</span>
                  </div>
                  {workout.pace && (
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-medium-gray" />
                      <span className="text-deep-navy dark:text-dark-text">{workout.pace}</span>
                    </div>
                  )}
                </div>

                {/* Route info */}
                {workout.route && workout.route.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border-gray dark:border-dark-border">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <Route className="h-3 w-3 text-medium-gray" />
                        <span className="text-deep-navy dark:text-dark-text">
                          Route: {workout.route.length} GPS points
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-bright-blue text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedWorkout(workout)
                        }}
                      >
                        View Route
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-medium-gray dark:text-dark-muted">
            <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No workouts yet</p>
            <p className="text-sm">Start your first outdoor activity to see your history here!</p>
            <Button 
              className="mt-4 bg-primary-gradient hover:opacity-90 text-white"
              onClick={() => onNavigateToTab?.("add-activity")}
            >
              <Play className="h-4 w-4 mr-2" />
              Start Workout
            </Button>
          </div>
        )}
      </div>

      {/* Selected Workout Details */}
      {selectedWorkout && (
        <div className="space-y-3">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Workout Details</h2>
          <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full ${getActivityColor(selectedWorkout.type)} flex items-center justify-center`}>
                    {getActivityIcon(selectedWorkout.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-navy dark:text-dark-text">{selectedWorkout.type}</h3>
                    <p className="text-sm text-medium-gray dark:text-dark-muted">
                      {formatDate(selectedWorkout.startTime)}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={getActivityColor(selectedWorkout.type)}>
                  {selectedWorkout.route && selectedWorkout.route.length > 0 ? 'GPS Tracked' : 'Manual Entry'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-medium-gray dark:text-dark-muted">Duration</span>
                    <span className="font-medium text-deep-navy dark:text-dark-text">
                      {formatTime(selectedWorkout.duration)}
                    </span>
                  </div>
                  {selectedWorkout.distance && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-medium-gray dark:text-dark-muted">Distance</span>
                      <span className="font-medium text-deep-navy dark:text-dark-text">
                        {formatDistance(selectedWorkout.distance)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-medium-gray dark:text-dark-muted">Calories</span>
                    <span className="font-medium text-deep-navy dark:text-dark-text">
                      {selectedWorkout.calories} kcal
                    </span>
                  </div>
                  {selectedWorkout.pace && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-medium-gray dark:text-dark-muted">Pace</span>
                      <span className="font-medium text-deep-navy dark:text-dark-text">
                        {selectedWorkout.pace} /km
                      </span>
                    </div>
                  )}
                </div>

                {selectedWorkout.route && selectedWorkout.route.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-medium-gray dark:text-dark-muted">GPS Points</span>
                      <span className="font-medium text-deep-navy dark:text-dark-text">
                        {selectedWorkout.route.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-medium-gray dark:text-dark-muted">Start Time</span>
                      <span className="font-medium text-deep-navy dark:text-dark-text">
                        {selectedWorkout.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {selectedWorkout.endTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-medium-gray dark:text-dark-muted">End Time</span>
                        <span className="font-medium text-deep-navy dark:text-dark-text">
                          {selectedWorkout.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
