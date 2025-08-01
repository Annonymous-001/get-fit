'use client'

import { useState } from "react"
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
  ChevronRight,
  Save,
  FolderOpen,
  Edit,
  Trash2,
  X,
  Search
} from "lucide-react"

interface StrengthTrainingPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

interface Exercise {
  id: number
  name: string
  sets: number
  targetReps: string
  weight: string
  restTime: number
  equipment: string[]
  notes: string
  completed: number
  currentSet?: {
    number: number
    reps: number
    weight: string
    isResting: boolean
    timeLeft: number
  }
}

interface WorkoutProgram {
  id: number
  name: string
  exercises: Exercise[]
  duration: string
  lastUsed: string
  category: string
}

export default function StrengthTrainingPage({ onNavigateToPage, onNavigateToTab }: StrengthTrainingPageProps) {
  const [currentView, setCurrentView] = useState<'selection' | 'workout' | 'manage' | 'create'>('selection')
  const [autoRest, setAutoRest] = useState(true)
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)
  const [newProgramName, setNewProgramName] = useState("")
  const [newProgramCategory, setNewProgramCategory] = useState("Strength")
  const [currentWeight, setCurrentWeight] = useState("135")
  const [currentReps, setCurrentReps] = useState("0")

  const availableExercises = [
    { id: 1, name: "Barbell Squat", category: "Legs", equipment: ["Barbell", "Squat Rack"] },
    { id: 2, name: "Bench Press", category: "Chest", equipment: ["Barbell", "Bench"] },
    { id: 3, name: "Bent Over Row", category: "Back", equipment: ["Barbell"] },
    { id: 4, name: "Deadlift", category: "Back", equipment: ["Barbell"] },
    { id: 5, name: "Overhead Press", category: "Shoulders", equipment: ["Barbell"] },
    { id: 6, name: "Pull-ups", category: "Back", equipment: ["Pull-up Bar"] },
    { id: 7, name: "Dumbbell Curls", category: "Arms", equipment: ["Dumbbells"] },
    { id: 8, name: "Tricep Dips", category: "Arms", equipment: ["Dip Bars"] },
    { id: 9, name: "Lunges", category: "Legs", equipment: ["Dumbbells"] },
    { id: 10, name: "Plank", category: "Core", equipment: ["None"] }
  ]

  const [savedWorkouts, setSavedWorkouts] = useState<WorkoutProgram[]>([
    {
      id: 1,
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
          completed: 0
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
          completed: 0
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
          completed: 0
        }
      ],
      duration: "45 min",
      lastUsed: "2 days ago",
      category: "Strength"
    },
    {
      id: 2,
      name: "Push Day",
      exercises: [
        {
          id: 1,
          name: "Bench Press",
          sets: 4,
          targetReps: "8-12",
          weight: "185 lbs",
          restTime: 90,
          equipment: ["Barbell", "Bench"],
          notes: "Retract scapula, feet planted",
          completed: 0
        },
        {
          id: 2,
          name: "Overhead Press",
          sets: 3,
          targetReps: "8-10",
          weight: "95 lbs",
          restTime: 60,
          equipment: ["Barbell"],
          notes: "Keep core tight, press overhead",
          completed: 0
        }
      ],
      duration: "35 min",
      lastUsed: "1 week ago",
      category: "Push"
    }
  ])

  const [newProgramExercises, setNewProgramExercises] = useState<Exercise[]>([])

  const startNewWorkout = () => {
    setCurrentView('workout')
    setSelectedProgram(null)
    setCurrentExerciseIndex(0)
    setIsWorkoutActive(true)
  }

  const startSavedWorkout = (program: WorkoutProgram) => {
    setSelectedProgram(program)
    setCurrentView('workout')
    setCurrentExerciseIndex(0)
    setIsWorkoutActive(true)
    // Reset weight and reps for the first exercise
    if (program.exercises.length > 0) {
      setCurrentWeight(program.exercises[0].weight)
      setCurrentReps("0")
    }
  }

  const addExerciseToProgram = (exercise: any) => {
    const newExercise: Exercise = {
      id: Date.now(),
      name: exercise.name,
      sets: 3,
      targetReps: "8-12",
      weight: "0 lbs",
      restTime: 60,
      equipment: exercise.equipment,
      notes: "",
      completed: 0
    }
    setNewProgramExercises([...newProgramExercises, newExercise])
  }

  const createNewProgram = () => {
    if (newProgramName.trim() && newProgramExercises.length > 0) {
      const newProgram: WorkoutProgram = {
        id: Date.now(),
        name: newProgramName,
        exercises: newProgramExercises,
        duration: `${newProgramExercises.length * 5} min`,
        lastUsed: "Never",
        category: newProgramCategory
      }
      setSavedWorkouts([...savedWorkouts, newProgram])
      setNewProgramName("")
      setNewProgramCategory("Strength")
      setNewProgramExercises([])
      setCurrentView('manage')
    }
  }

  const deleteProgram = (programId: number) => {
    setSavedWorkouts(savedWorkouts.filter(program => program.id !== programId))
  }

  const currentWorkout = selectedProgram || {
    name: "New Workout",
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
        completed: 0,
        currentSet: {
          number: 1,
          reps: 0,
          weight: "135 lbs",
          isResting: false,
          timeLeft: 90
        }
      }
    ]
  }

  const currentExercise = currentWorkout.exercises[currentExerciseIndex]

  const completeSet = () => {
    if (currentExercise) {
      currentExercise.completed = (currentExercise.completed || 0) + 1
      if (currentExercise.completed >= currentExercise.sets) {
        // Move to next exercise
        if (currentExerciseIndex < currentWorkout.exercises.length - 1) {
          const nextExerciseIndex = currentExerciseIndex + 1
          setCurrentExerciseIndex(nextExerciseIndex)
          // Reset weight and reps for the next exercise
          const nextExercise = currentWorkout.exercises[nextExerciseIndex]
          setCurrentWeight(nextExercise.weight)
          setCurrentReps("0")
        } else {
          // Workout complete
          setIsWorkoutActive(false)
          setCurrentView('selection')
        }
      }
    }
  }

  // Workout Selection Screen
  if (currentView === 'selection') {
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
          <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">Strength Training</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Start Options */}
        <div className="space-y-3">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Start Workout</h2>
          
          {/* New Workout */}
          <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-md transition-shadow cursor-pointer"
                onClick={startNewWorkout}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-deep-navy dark:text-dark-text">New Workout</h3>
                <p className="text-sm text-medium-gray dark:text-dark-muted">Start a fresh workout session</p>
              </div>
              <ChevronRight className="h-5 w-5 text-medium-gray" />
            </div>
          </Card>

          {/* Saved Workouts */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-deep-navy dark:text-dark-text">Saved Programs</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-500"
                onClick={() => setCurrentView('manage')}
              >
                <Edit className="h-4 w-4 mr-1" />
                Manage
              </Button>
            </div>
            
            {savedWorkouts.map((workout) => (
              <Card 
                key={workout.id}
                className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => startSavedWorkout(workout)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <FolderOpen className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-navy dark:text-dark-text">{workout.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-medium-gray dark:text-dark-muted">
                        <span>{workout.exercises.length} exercises</span>
                        <span>•</span>
                        <span>{workout.duration}</span>
                        <span>•</span>
                        <span>{workout.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {workout.category}
                    </Badge>
                    <ChevronRight className="h-5 w-5 text-medium-gray" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Settings */}
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <h3 className="font-medium text-deep-navy dark:text-dark-text mb-3">Workout Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-deep-navy dark:text-dark-text">Auto Start Rest Timer</p>
                <p className="text-xs text-medium-gray dark:text-dark-muted">Automatically start rest timer after completing a set</p>
              </div>
              <Button
                variant={autoRest ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRest(!autoRest)}
                className={autoRest ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {autoRest ? "On" : "Off"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Manage Programs Screen
  if (currentView === 'manage') {
    return (
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCurrentView('selection')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">Manage Programs</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCurrentView('create')}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Programs List */}
        <div className="space-y-3">
          {savedWorkouts.map((workout) => (
            <Card 
              key={workout.id}
              className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                    <FolderOpen className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-navy dark:text-dark-text">{workout.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-medium-gray dark:text-dark-muted">
                      <span>{workout.exercises.length} exercises</span>
                      <span>•</span>
                      <span>{workout.duration}</span>
                      <span>•</span>
                      <span>{workout.lastUsed}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {workout.category}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteProgram(workout.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Create Program Screen
  if (currentView === 'create') {
    return (
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCurrentView('manage')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">Create Program</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={createNewProgram}
            disabled={!newProgramName.trim() || newProgramExercises.length === 0}
          >
            <Save className="h-5 w-5" />
          </Button>
        </div>

        {/* Program Details */}
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-deep-navy dark:text-dark-text">Program Name</label>
              <Input
                value={newProgramName}
                onChange={(e) => setNewProgramName(e.target.value)}
                placeholder="Enter program name"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-deep-navy dark:text-dark-text">Category</label>
              <select
                value={newProgramCategory}
                onChange={(e) => setNewProgramCategory(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Strength">Strength</option>
                <option value="Push">Push</option>
                <option value="Pull">Pull</option>
                <option value="Legs">Legs</option>
                <option value="Cardio">Cardio</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Selected Exercises */}
        {newProgramExercises.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-light text-deep-navy dark:text-dark-text">Selected Exercises</h3>
            <div className="space-y-2">
              {newProgramExercises.map((exercise, index) => (
                <Card key={exercise.id} className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-deep-navy dark:text-dark-text">{exercise.name}</h4>
                      <p className="text-sm text-medium-gray dark:text-dark-muted">
                        {exercise.sets} sets × {exercise.targetReps} reps
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setNewProgramExercises(newProgramExercises.filter((_, i) => i !== index))}
                      className="text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Exercises */}
        <div className="space-y-3">
          <h3 className="text-lg font-light text-deep-navy dark:text-dark-text">Add Exercises</h3>
          <div className="space-y-2">
            {availableExercises.map((exercise) => (
              <Card 
                key={exercise.id}
                className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => addExerciseToProgram(exercise)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-deep-navy dark:text-dark-text">{exercise.name}</h4>
                    <p className="text-sm text-medium-gray dark:text-dark-muted">{exercise.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {exercise.equipment.join(", ")}
                    </Badge>
                    <Plus className="h-4 w-4 text-medium-gray" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Active Workout Screen
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => {
            setIsWorkoutActive(false)
            setCurrentView('selection')
          }}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">{currentWorkout.name}</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between text-sm text-medium-gray dark:text-dark-muted">
        <span>Exercise {currentExerciseIndex + 1} of {currentWorkout.exercises.length}</span>
        <span>{Math.round(((currentExerciseIndex + 1) / currentWorkout.exercises.length) * 100)}% Complete</span>
      </div>

      {/* Active Exercise */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <div className="space-y-4">
          {/* Exercise Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-deep-navy dark:text-dark-text">
                {currentExercise.name}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  Set {(currentExercise.completed || 0) + 1} of {currentExercise.sets}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Target: {currentExercise.targetReps} reps
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
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setCurrentWeight(prev => Math.max(0, parseInt(prev) - 5).toString())}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input 
                  type="number" 
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  className="text-center"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setCurrentWeight(prev => (parseInt(prev) + 5).toString())}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-medium-gray dark:text-dark-muted">Reps</label>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setCurrentReps(prev => Math.max(0, parseInt(prev) - 1).toString())}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input 
                  type="number" 
                  value={currentReps}
                  onChange={(e) => setCurrentReps(e.target.value)}
                  className="text-center"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setCurrentReps(prev => (parseInt(prev) + 1).toString())}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Complete Set Button - Above Rest Timer */}
          <Button 
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            onClick={completeSet}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Set
          </Button>

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
              <Button variant="outline" className="px-4">
                Finish Rest
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Equipment Info */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <h3 className="font-medium text-deep-navy dark:text-dark-text mb-3">Equipment Needed</h3>
        <div className="flex flex-wrap gap-2">
          {currentExercise.equipment.map((item, index) => (
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
          {currentExercise.notes}
        </p>
      </Card>

      {/* Upcoming Exercises */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Up Next</h2>
        <div className="space-y-2">
          {currentWorkout.exercises.slice(currentExerciseIndex + 1).map((exercise) => (
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
            <p className="text-lg font-light text-deep-navy dark:text-dark-text">
              {currentWorkout.exercises.reduce((total, ex) => total + (ex.completed || 0), 0)}/
              {currentWorkout.exercises.reduce((total, ex) => total + ex.sets, 0)}
            </p>
            <p className="text-xs text-medium-gray dark:text-dark-muted">Sets Done</p>
          </div>
        </div>
      </Card>
    </div>
  )
}