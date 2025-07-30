'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  ChevronLeft,
  Dumbbell,
  Timer,
  Play,
  Pause,
  Plus,
  Minus,
  RotateCcw,
  CheckCircle,
  Clock,
  Weight,
  Info,
  Settings,
  MoreHorizontal,
  ChevronRight
} from "lucide-react"

interface StrengthTrainingPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function StrengthTrainingPage({ onNavigateToPage, onNavigateToTab }: StrengthTrainingPageProps) {
  const currentWorkout = {
    name: "Full Body Strength",
    exercises: [
      {
        id: 1,
        name: "Barbell Squat",
        sets: 4,
        targetReps: "8-12",
        weight: "135 lbs",
        restTime: 90,
        equipment: ["Barbell", "Squat Rack"],
        notes: "Keep chest up, break parallel",
        completed: 2,
        currentSet: {
          number: 3,
          reps: 0,
          weight: "135 lbs",
          isResting: false,
          timeLeft: 90
        }
      },
      {
        id: 2,
        name: "Bench Press",
        sets: 4,
        targetReps: "8-12",
        weight: "185 lbs",
        restTime: 90,
        equipment: ["Barbell", "Bench"],
        notes: "Retract scapula, feet planted",
        completed: 0,
        currentSet: null
      },
      {
        id: 3,
        name: "Bent Over Row",
        sets: 4,
        targetReps: "10-15",
        weight: "135 lbs",
        restTime: 60,
        equipment: ["Barbell"],
        notes: "Keep back straight, pull to chest",
        completed: 0,
        currentSet: null
      }
    ],
    timer: {
      isRunning: false,
      timeLeft: 90,
      totalTime: 90
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
        <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">{currentWorkout.name}</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Active Exercise */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <div className="space-y-4">
          {/* Exercise Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-deep-navy dark:text-dark-text">
                {currentWorkout.exercises[0].name}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  Set {currentWorkout.exercises[0].currentSet?.number} of {currentWorkout.exercises[0].sets}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Target: {currentWorkout.exercises[0].targetReps} reps
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Info className="h-4 w-4" />
            </Button>
          </div>

          {/* Weight and Reps Input */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-medium-gray dark:text-dark-muted">Weight</label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Minus className="h-4 w-4" />
                </Button>
                <Input 
                  type="number" 
                  value="135"
                  className="text-center"
                />
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-medium-gray dark:text-dark-muted">Reps</label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Minus className="h-4 w-4" />
                </Button>
                <Input 
                  type="number" 
                  value="0"
                  className="text-center"
                />
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Rest Timer */}
          <div className="bg-light-gray dark:bg-dark-bg rounded-lg p-4 text-center">
            <div className="text-3xl font-light text-deep-navy dark:text-dark-text mb-2">
              01:30
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button className="bg-primary-gradient hover:opacity-90 text-white px-6">
                <Play className="h-4 w-4 mr-2" />
                Start Rest
              </Button>
            </div>
          </div>

          {/* Complete Set Button */}
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Set
          </Button>
        </div>
      </Card>

      {/* Equipment Info */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <h3 className="font-medium text-deep-navy dark:text-dark-text mb-3">Equipment Needed</h3>
        <div className="flex flex-wrap gap-2">
          {currentWorkout.exercises[0].equipment.map((item, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Exercise Notes */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <h3 className="font-medium text-deep-navy dark:text-dark-text mb-3">Form Notes</h3>
        <p className="text-sm text-medium-gray dark:text-dark-muted">
          {currentWorkout.exercises[0].notes}
        </p>
      </Card>

      {/* Upcoming Exercises */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Up Next</h2>
        <div className="space-y-2">
          {currentWorkout.exercises.slice(1).map((exercise) => (
            <Card 
              key={exercise.id} 
              className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center">
                    <Dumbbell className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{exercise.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-medium-gray dark:text-dark-muted">
                        {exercise.sets} sets
                      </span>
                      <span className="text-xs text-medium-gray dark:text-dark-muted">•</span>
                      <span className="text-xs text-medium-gray dark:text-dark-muted">
                        {exercise.targetReps} reps
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-medium-gray" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Workout Summary */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-gradient-to-r from-bright-blue/5 to-light-blue/5 dark:bg-dark-card">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Clock className="h-5 w-5 mx-auto mb-1 text-bright-blue" />
            <p className="text-lg font-light text-deep-navy dark:text-dark-text">24:15</p>
            <p className="text-xs text-medium-gray dark:text-dark-muted">Duration</p>
          </div>
          <div className="text-center">
            <Weight className="h-5 w-5 mx-auto mb-1 text-green-500" />
            <p className="text-lg font-light text-deep-navy dark:text-dark-text">6,420</p>
            <p className="text-xs text-medium-gray dark:text-dark-muted">Total lbs</p>
          </div>
          <div className="text-center">
            <Timer className="h-5 w-5 mx-auto mb-1 text-orange-500" />
            <p className="text-lg font-light text-deep-navy dark:text-dark-text">8/12</p>
            <p className="text-xs text-medium-gray dark:text-dark-muted">Sets Done</p>
          </div>
        </div>
      </Card>
    </div>
  )
}