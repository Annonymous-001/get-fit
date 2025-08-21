'use client'

import { useState, useEffect, useRef } from "react"
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
  ChevronDown,
  Save,
  X
} from "lucide-react"

interface OutdoorActivityPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

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

interface OutdoorActivityState {
  isTracking: boolean
  currentSession: WorkoutSession | null
  elapsedTime: number
  distance: number
  calories: number
  pace: string
  currentSpeed: number
  route: Array<{lat: number, lng: number}>
  gpsAccuracy: number
  heartRate: number
  elevation: number
}

export default function OutdoorActivityPage({ onNavigateToPage, onNavigateToTab }: OutdoorActivityPageProps) {
  // Outdoor activity tracking state
  const [outdoorState, setOutdoorState] = useState<OutdoorActivityState>({
    isTracking: false,
    currentSession: null,
    elapsedTime: 0,
    distance: 0,
    calories: 0,
    pace: "0:00",
    currentSpeed: 0,
    route: [],
    gpsAccuracy: 0,
    heartRate: 0,
    elevation: 0
  })

  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const watchIdRef = useRef<number | null>(null)
  const activityType = "Running" // This could be passed as a prop or from URL params

  // Outdoor activity tracking functions
  const startOutdoorActivity = () => {
    if (!navigator.geolocation) {
      alert("GPS is not supported on this device")
      return
    }

    const newSession: WorkoutSession = {
      id: Date.now().toString(),
      type: activityType,
      startTime: new Date(),
      duration: 0,
      calories: 0,
      isActive: true
    }

    setOutdoorState(prev => ({
      ...prev,
      isTracking: true,
      currentSession: newSession,
      elapsedTime: 0,
      distance: 0,
      calories: 0,
      pace: "0:00",
      currentSpeed: 0,
      route: [],
      gpsAccuracy: 0,
      heartRate: 0,
      elevation: 0
    }))

    // Start timer
    intervalRef.current = setInterval(() => {
      setOutdoorState(prev => {
        const newElapsedTime = prev.elapsedTime + 1
        const newCalories = Math.round((newElapsedTime / 60) * getCaloriesPerMinute(activityType))
        const newPace = prev.distance > 0 ? formatPace(newElapsedTime, prev.distance) : "0:00"
        
        return {
          ...prev,
          elapsedTime: newElapsedTime,
          calories: newCalories,
          pace: newPace
        }
      })
    }, 1000)

    // Start GPS tracking
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords
        const newPoint = { lat: latitude, lng: longitude }
        
        setOutdoorState(prev => {
          const newRoute = [...prev.route, newPoint]
          const newDistance = calculateTotalDistance(newRoute)
          const newSpeed = calculateCurrentSpeed(newRoute, prev.elapsedTime)
          
          return {
            ...prev,
            route: newRoute,
            distance: newDistance,
            currentSpeed: newSpeed,
            gpsAccuracy: accuracy
          }
        })
      },
      (error) => {
        console.error("GPS Error:", error)
        alert("Unable to get GPS location. Please check your location settings.")
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  const stopOutdoorActivity = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }

    setOutdoorState(prev => {
      const completedSession: WorkoutSession = {
        ...prev.currentSession!,
        endTime: new Date(),
        duration: prev.elapsedTime,
        distance: prev.distance,
        calories: prev.calories,
        pace: prev.pace,
        route: prev.route,
        isActive: false
      }

      // Save to history
      const newHistory = [completedSession, ...workoutHistory]
      setWorkoutHistory(newHistory)
      localStorage.setItem('workoutHistory', JSON.stringify(newHistory))

      return {
        ...prev,
        isTracking: false,
        currentSession: null
      }
    })

    onNavigateToPage?.("workout-history")
  }

  const pauseOutdoorActivity = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setOutdoorState(prev => ({ ...prev, isTracking: false }))
  }

  const resumeOutdoorActivity = () => {
    intervalRef.current = setInterval(() => {
      setOutdoorState(prev => {
        const newElapsedTime = prev.elapsedTime + 1
        const newCalories = Math.round((newElapsedTime / 60) * getCaloriesPerMinute(activityType))
        const newPace = prev.distance > 0 ? formatPace(newElapsedTime, prev.distance) : "0:00"
        
        return {
          ...prev,
          elapsedTime: newElapsedTime,
          calories: newCalories,
          pace: newPace
        }
      })
    }, 1000)
    setOutdoorState(prev => ({ ...prev, isTracking: true }))
  }

  // Helper functions
  const getCaloriesPerMinute = (activity: string): number => {
    const caloriesMap: { [key: string]: number } = {
      "Running": 12,
      "Walking": 6,
      "Swimming": 10,
      "Cycling": 8
    }
    return caloriesMap[activity] || 8
  }

  const formatPace = (seconds: number, distance: number): string => {
    if (distance === 0) return "0:00"
    const paceSeconds = (seconds / distance) * 1000 // seconds per km
    const minutes = Math.floor(paceSeconds / 60)
    const secs = Math.floor(paceSeconds % 60)
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const calculateTotalDistance = (route: Array<{lat: number, lng: number}>): number => {
    if (route.length < 2) return 0
    
    let totalDistance = 0
    for (let i = 1; i < route.length; i++) {
      totalDistance += calculateDistance(route[i-1], route[i])
    }
    return totalDistance
  }

  const calculateDistance = (point1: {lat: number, lng: number}, point2: {lat: number, lng: number}): number => {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = point1.lat * Math.PI / 180
    const φ2 = point2.lat * Math.PI / 180
    const Δφ = (point2.lat - point1.lat) * Math.PI / 180
    const Δλ = (point2.lng - point1.lng) * Math.PI / 180

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    return R * c
  }

  const calculateCurrentSpeed = (route: Array<{lat: number, lng: number}>, elapsedTime: number): number => {
    if (route.length < 2 || elapsedTime === 0) return 0
    
    const recentDistance = calculateTotalDistance(route.slice(-5)) // Last 5 points
    const recentTime = Math.min(30, elapsedTime) // Last 30 seconds or total time
    return (recentDistance / recentTime) * 3.6 // Convert to km/h
  }

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
    return `${(meters / 1000).toFixed(2)}`
  }

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
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
    }
  }, [])

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
        <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">{activityType}</h1>
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
              GPS Signal: {outdoorState.gpsAccuracy < 10 ? "Excellent" : "Good"}
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
                {formatTime(outdoorState.elapsedTime)}
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
                {formatDistance(outdoorState.distance)}
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
                {outdoorState.pace}
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
                {outdoorState.heartRate || 0}
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
                {outdoorState.elevation || 0}
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
                {outdoorState.calories}
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-16 w-16 rounded-full border-2 border-red-500"
              onClick={stopOutdoorActivity}
            >
              <CircleStop className="h-8 w-8 text-red-500" />
            </Button>
            <Button 
              className="h-16 w-16 rounded-full bg-primary-gradient hover:opacity-90"
              onClick={outdoorState.isTracking ? pauseOutdoorActivity : (outdoorState.currentSession ? resumeOutdoorActivity : startOutdoorActivity)}
            >
              {outdoorState.isTracking ? (
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