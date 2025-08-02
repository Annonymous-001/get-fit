'use client'

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Search,
  BarChart3,
  TrendingUp,
  Calendar,
  Target,
  Flame,
  Zap,
  BookOpen,
  History,
  PlusCircle
} from "lucide-react"

interface StrengthTrainingPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

interface Exercise {
  id: string
  name: string
  category: string
  muscleGroups: string[]
  equipment: string[]
  instructions?: string
}

interface Set {
  id: string
  reps: number
  weight: number
  isCompleted: boolean
  isWarmup: boolean
  isFailure: boolean
  isDropSet: boolean
  restTime: number
  notes?: string
}

interface WorkoutExercise {
  id: string
  exercise: Exercise
  sets: Set[]
  restBetweenSets: number
  notes?: string
}

interface Workout {
  id: string
  name: string
  exercises: WorkoutExercise[]
  startTime?: Date
  endTime?: Date
  isActive: boolean
  notes?: string
  totalDuration?: number
  totalSets?: number
  completedSets?: number
}

interface SavedProgram {
  id: string
  name: string
  description: string
  exercises: WorkoutExercise[]
  estimatedDuration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
}

export default function StrengthTrainingPage({ onNavigateToPage, onNavigateToTab }: StrengthTrainingPageProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null)
  const [savedPrograms, setSavedPrograms] = useState<SavedProgram[]>([])
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([])
  const [showExerciseDialog, setShowExerciseDialog] = useState(false)
  const [showProgramDialog, setShowProgramDialog] = useState(false)
  const [showCreateProgramDialog, setShowCreateProgramDialog] = useState(false)
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [selectedHistoryWorkout, setSelectedHistoryWorkout] = useState<Workout | null>(null)
  const [workoutTimer, setWorkoutTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [restTimer, setRestTimer] = useState(0)
  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Create program states
  const [newProgramName, setNewProgramName] = useState("")
  const [newProgramDescription, setNewProgramDescription] = useState("")
  const [newProgramCategory, setNewProgramCategory] = useState("Strength")
  const [newProgramDifficulty, setNewProgramDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate')
  const [newProgramExercises, setNewProgramExercises] = useState<WorkoutExercise[]>([])

  // Sample exercises database
  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Bench Press',
      category: 'Strength',
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      equipment: ['Barbell', 'Bench'],
      instructions: 'Lie on bench, lower bar to chest, press up'
    },
    {
      id: '2',
      name: 'Squat',
      category: 'Strength',
      muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
      equipment: ['Barbell'],
      instructions: 'Stand with bar on shoulders, squat down, stand up'
    },
    {
      id: '3',
      name: 'Deadlift',
      category: 'Strength',
      muscleGroups: ['Back', 'Hamstrings', 'Glutes'],
      equipment: ['Barbell'],
      instructions: 'Stand over bar, grip and lift with straight back'
    },
    {
      id: '4',
      name: 'Pull-ups',
      category: 'Strength',
      muscleGroups: ['Back', 'Biceps'],
      equipment: ['Pull-up Bar'],
      instructions: 'Hang from bar, pull body up until chin over bar'
    },
    {
      id: '5',
      name: 'Overhead Press',
      category: 'Strength',
      muscleGroups: ['Shoulders', 'Triceps'],
      equipment: ['Barbell', 'Dumbbells'],
      instructions: 'Press weight overhead from shoulder level'
    },
    {
      id: '6',
      name: 'Bicep Curls',
      category: 'Strength',
      muscleGroups: ['Biceps'],
      equipment: ['Dumbbells', 'Barbell'],
      instructions: 'Curl weight from waist to shoulder level'
    },
    {
      id: '7',
      name: 'Tricep Dips',
      category: 'Strength',
      muscleGroups: ['Triceps', 'Chest'],
      equipment: ['Dip Bars'],
      instructions: 'Lower body between bars, push back up'
    },
    {
      id: '8',
      name: 'Lunges',
      category: 'Strength',
      muscleGroups: ['Quadriceps', 'Glutes'],
      equipment: ['Bodyweight', 'Dumbbells'],
      instructions: 'Step forward, lower back knee, return to start'
    },
    {
      id: '9',
      name: 'Push-ups',
      category: 'Strength',
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      equipment: ['Bodyweight'],
      instructions: 'Lower body to ground, push back up'
    },
    {
      id: '10',
      name: 'Planks',
      category: 'Core',
      muscleGroups: ['Core', 'Shoulders'],
      equipment: ['Bodyweight'],
      instructions: 'Hold body in straight line from head to heels'
    }
  ]

  // Sample saved programs
  const defaultPrograms: SavedProgram[] = [
    {
      id: '1',
      name: 'Push Day',
      description: 'Chest, shoulders, and triceps workout',
      exercises: [
        {
          id: '1',
          exercise: exercises[0], // Bench Press
          sets: [
            { id: '1', reps: 8, weight: 135, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 90 },
            { id: '2', reps: 8, weight: 155, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 90 },
            { id: '3', reps: 6, weight: 175, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 90 }
          ],
          restBetweenSets: 90,
          notes: 'Focus on form and controlled movement'
        },
        {
          id: '2',
          exercise: exercises[4], // Overhead Press
          sets: [
            { id: '1', reps: 10, weight: 65, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 60 },
            { id: '2', reps: 10, weight: 75, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 60 },
            { id: '3', reps: 8, weight: 85, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 60 }
          ],
          restBetweenSets: 60,
          notes: 'Keep core tight throughout movement'
        }
      ],
      estimatedDuration: 45,
      difficulty: 'intermediate',
      category: 'Strength'
    },
    {
      id: '2',
      name: 'Pull Day',
      description: 'Back and biceps workout',
      exercises: [
        {
          id: '1',
          exercise: exercises[3], // Pull-ups
          sets: [
            { id: '1', reps: 8, weight: 0, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 90 },
            { id: '2', reps: 8, weight: 0, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 90 },
            { id: '3', reps: 6, weight: 0, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 90 }
          ],
          restBetweenSets: 90,
          notes: 'Full range of motion, controlled descent'
        },
        {
          id: '2',
          exercise: exercises[5], // Bicep Curls
          sets: [
            { id: '1', reps: 12, weight: 25, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 60 },
            { id: '2', reps: 12, weight: 30, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 60 },
            { id: '3', reps: 10, weight: 35, isCompleted: false, isWarmup: false, isFailure: false, isDropSet: false, restTime: 60 }
          ],
          restBetweenSets: 60,
          notes: 'Keep elbows at sides, no swinging'
        }
      ],
      estimatedDuration: 40,
      difficulty: 'intermediate',
      category: 'Strength'
    }
  ]

  useEffect(() => {
    setSavedPrograms(defaultPrograms)
  }, [])

  // Timer effects
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRestTimerRunning && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsRestTimerRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRestTimerRunning, restTimer])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const startNewWorkout = () => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: 'New Workout',
      exercises: [],
      startTime: new Date(),
      isActive: true
    }
    setCurrentWorkout(newWorkout)
    setActiveTab('workout')
    setIsTimerRunning(true)
  }

  const addExerciseToWorkout = (exercise: Exercise) => {
    if (!currentWorkout) return

    const newExercise: WorkoutExercise = {
      id: Date.now().toString(),
      exercise,
      sets: [
        {
          id: '1',
          reps: 10,
          weight: 0,
          isCompleted: false,
          isWarmup: false,
          isFailure: false,
          isDropSet: false,
          restTime: 60
        }
      ],
      restBetweenSets: 60
    }

    setCurrentWorkout({
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, newExercise]
    })
    setShowExerciseDialog(false)
  }

  const addSetToExercise = (exerciseId: string) => {
    if (!currentWorkout) return

    const updatedExercises = currentWorkout.exercises.map(ex => {
      if (ex.id === exerciseId) {
        const lastSet = ex.sets[ex.sets.length - 1]
        const newSet: Set = {
          id: Date.now().toString(),
          reps: lastSet.reps,
          weight: lastSet.weight,
          isCompleted: false,
          isWarmup: false,
          isFailure: false,
          isDropSet: false,
          restTime: ex.restBetweenSets
        }
        return { ...ex, sets: [...ex.sets, newSet] }
      }
      return ex
    })

    setCurrentWorkout({
      ...currentWorkout,
      exercises: updatedExercises
    })
  }

  const removeSetFromExercise = (exerciseId: string, setId: string) => {
    if (!currentWorkout) return

    const updatedExercises = currentWorkout.exercises.map(ex => {
      if (ex.id === exerciseId) {
        const updatedSets = ex.sets.filter(set => set.id !== setId)
        return { ...ex, sets: updatedSets }
      }
      return ex
    })

    setCurrentWorkout({
      ...currentWorkout,
      exercises: updatedExercises
    })
  }

  const updateSet = (exerciseId: string, setId: string, updates: Partial<Set>) => {
    if (!currentWorkout) return

    const updatedExercises = currentWorkout.exercises.map(ex => {
      if (ex.id === exerciseId) {
        const updatedSets = ex.sets.map(set => {
          if (set.id === setId) {
            return { ...set, ...updates }
          }
          return set
        })
        return { ...ex, sets: updatedSets }
      }
      return ex
    })

    setCurrentWorkout({
      ...currentWorkout,
      exercises: updatedExercises
    })
  }

  const completeSet = (exerciseId: string, setId: string) => {
    updateSet(exerciseId, setId, { isCompleted: true })
    // Start rest timer
    const exercise = currentWorkout?.exercises.find(ex => ex.id === exerciseId)
    if (exercise) {
      setRestTimer(exercise.restBetweenSets)
      setIsRestTimerRunning(true)
    }
  }

  const loadProgram = (program: SavedProgram) => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: program.name,
      exercises: program.exercises.map(ex => ({
        ...ex,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        sets: ex.sets.map(set => ({
          ...set,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          isCompleted: false
        }))
      })),
      startTime: new Date(),
      isActive: true
    }
    setCurrentWorkout(newWorkout)
    setActiveTab('workout')
    setIsTimerRunning(true)
    setShowProgramDialog(false)
  }

  const finishWorkout = () => {
    if (!currentWorkout) return
    
    // Calculate workout statistics
    const totalSets = currentWorkout.exercises.reduce((total, exercise) => total + exercise.sets.length, 0)
    const completedSets = currentWorkout.exercises.reduce((total, exercise) => 
      total + exercise.sets.filter(set => set.isCompleted).length, 0
    )
    
    const completedWorkout: Workout = {
      ...currentWorkout,
      endTime: new Date(),
      isActive: false,
      totalDuration: workoutTimer,
      totalSets,
      completedSets
    }
    
    // Add to workout history
    setWorkoutHistory(prev => [completedWorkout, ...prev])
    
    // Reset current workout
    setCurrentWorkout(null)
    setWorkoutTimer(0)
    setIsTimerRunning(false)
    setRestTimer(0)
    setIsRestTimerRunning(false)
    setActiveTab('overview')
  }

  const addExerciseToProgram = (exercise: Exercise) => {
    const newExercise: WorkoutExercise = {
      id: Date.now().toString(),
      exercise,
      sets: [
        {
          id: '1',
          reps: 10,
          weight: 0,
          isCompleted: false,
          isWarmup: false,
          isFailure: false,
          isDropSet: false,
          restTime: 60
        }
      ],
      restBetweenSets: 60
    }
    setNewProgramExercises([...newProgramExercises, newExercise])
  }

  const createNewProgram = () => {
    if (newProgramName.trim() && newProgramExercises.length > 0) {
      const newProgram: SavedProgram = {
        id: Date.now().toString(),
        name: newProgramName,
        description: newProgramDescription,
        exercises: newProgramExercises,
        estimatedDuration: newProgramExercises.length * 5,
        difficulty: newProgramDifficulty,
        category: newProgramCategory
      }
      setSavedPrograms([...savedPrograms, newProgram])
      setNewProgramName("")
      setNewProgramDescription("")
      setNewProgramCategory("Strength")
      setNewProgramDifficulty('intermediate')
      setNewProgramExercises([])
      setShowCreateProgramDialog(false)
    }
  }

  const deleteProgram = (programId: string) => {
    setSavedPrograms(savedPrograms.filter(program => program.id !== programId))
  }

  const viewWorkoutHistory = (workout: Workout) => {
    setSelectedHistoryWorkout(workout)
    setShowHistoryDialog(true)
  }

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscleGroups.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Calculate statistics for charts
  const totalWorkouts = workoutHistory.length
  const totalDuration = workoutHistory.reduce((total, workout) => total + (workout.totalDuration || 0), 0)
  const averageDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts / 60) : 0
  const totalSets = workoutHistory.reduce((total, workout) => total + (workout.totalSets || 0), 0)
  const completedSets = workoutHistory.reduce((total, workout) => total + (workout.completedSets || 0), 0)
  const completionRate = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0

  // Weekly workout frequency
  const last7Days = workoutHistory.filter(workout => {
    const workoutDate = workout.startTime
    if (!workoutDate) return false
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return workoutDate >= sevenDaysAgo
  }).length

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

      {/* Timer Display for Active Workout */}
      {currentWorkout && (
        <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm text-medium-gray dark:text-dark-muted">Workout Time</p>
                <p className="text-2xl font-bold text-deep-navy dark:text-dark-text">{formatTime(workoutTimer)}</p>
              </div>
              {restTimer > 0 && (
                <div className="text-center">
                  <p className="text-sm text-medium-gray dark:text-dark-muted">Rest</p>
                  <p className="text-xl font-bold text-orange-500">{formatTime(restTimer)}</p>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              {isTimerRunning ? (
                <Button variant="outline" onClick={() => setIsTimerRunning(false)}>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setIsTimerRunning(true)}>
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              )}
              <Button variant="destructive" onClick={finishWorkout}>
                <X className="h-4 w-4 mr-2" />
                Finish
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workout">Workout</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Start */}
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-deep-navy dark:text-dark-text">Quick Start</h2>
            <div className="grid grid-cols-2 gap-3">
              <Card 
                className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-md transition-shadow cursor-pointer"
                onClick={startNewWorkout}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Plus className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-deep-navy dark:text-dark-text">New Workout</h3>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">Start fresh</p>
                </div>
              </Card>
              <Card 
                className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setShowProgramDialog(true)}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-deep-navy dark:text-dark-text">Load Program</h3>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">Use saved</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-deep-navy dark:text-dark-text">Your Progress</h2>
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-deep-navy dark:text-dark-text">{totalWorkouts}</p>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">Total Workouts</p>
                </div>
              </Card>
              <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-deep-navy dark:text-dark-text">{last7Days}</p>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">This Week</p>
                </div>
              </Card>
              <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="h-6 w-6 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold text-deep-navy dark:text-dark-text">{averageDuration}</p>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">Avg Minutes</p>
                </div>
              </Card>
              <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="h-6 w-6 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-deep-navy dark:text-dark-text">{completionRate}%</p>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">Completion</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Recent Workouts */}
          {workoutHistory.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-medium text-deep-navy dark:text-dark-text">Recent Workouts</h2>
              <div className="space-y-2">
                {workoutHistory.slice(0, 3).map((workout) => (
                  <Card 
                    key={workout.id} 
                    className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => viewWorkoutHistory(workout)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-deep-navy dark:text-dark-text">{workout.name}</h3>
                        <p className="text-sm text-medium-gray dark:text-dark-muted">
                          {workout.startTime && formatDate(workout.startTime)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-deep-navy dark:text-dark-text">
                          {workout.totalDuration ? formatTime(workout.totalDuration) : 'N/A'}
                        </p>
                        <p className="text-xs text-medium-gray dark:text-dark-muted">
                          {workout.completedSets}/{workout.totalSets} sets
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Workout Tab */}
        <TabsContent value="workout" className="space-y-4">
          {!currentWorkout ? (
            <div className="space-y-4">
              <Card className="p-6 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card text-center">
                <h3 className="text-lg font-medium text-deep-navy dark:text-dark-text mb-2">No Active Workout</h3>
                <p className="text-sm text-medium-gray dark:text-dark-muted mb-4">Start a new workout or load a saved program</p>
                <div className="flex space-x-2 justify-center">
                  <Button onClick={startNewWorkout} className="bg-primary-gradient hover:opacity-90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    New Workout
                  </Button>
                  <Button variant="outline" onClick={() => setShowProgramDialog(true)}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Load Program
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Workout Name */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-deep-navy dark:text-dark-text">{currentWorkout.name}</h2>
                <Button variant="outline" size="sm" onClick={() => setShowExerciseDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Exercise
                </Button>
              </div>

              {/* Exercises */}
              {currentWorkout.exercises.map((exercise) => (
                <Card key={exercise.id} className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-deep-navy dark:text-dark-text">{exercise.exercise.name}</h3>
                      <p className="text-xs text-medium-gray dark:text-dark-muted">
                        {exercise.exercise.muscleGroups.join(', ')}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sets */}
                  <div className="space-y-2">
                    {exercise.sets.map((set, index) => (
                      <div key={set.id} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <span className="text-sm font-medium text-deep-navy dark:text-dark-text w-8">
                          {index + 1}
                        </span>
                        
                        <Input
                          type="number"
                          placeholder="Reps"
                          value={set.reps}
                          onChange={(e) => updateSet(exercise.id, set.id, { reps: parseInt(e.target.value) || 0 })}
                          className="w-16 h-8 text-sm"
                        />
                        
                        <Input
                          type="number"
                          placeholder="Weight"
                          value={set.weight}
                          onChange={(e) => updateSet(exercise.id, set.id, { weight: parseInt(e.target.value) || 0 })}
                          className="w-16 h-8 text-sm"
                        />
                        
                        <span className="text-xs text-medium-gray dark:text-dark-muted">lbs</span>
                        
                        <div className="flex space-x-1">
                          <Button
                            variant={set.isWarmup ? "default" : "outline"}
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => updateSet(exercise.id, set.id, { isWarmup: !set.isWarmup })}
                          >
                            W
                          </Button>
                          <Button
                            variant={set.isFailure ? "destructive" : "outline"}
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => updateSet(exercise.id, set.id, { isFailure: !set.isFailure })}
                          >
                            F
                          </Button>
                          <Button
                            variant={set.isDropSet ? "default" : "outline"}
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => updateSet(exercise.id, set.id, { isDropSet: !set.isDropSet })}
                          >
                            D
                          </Button>
                        </div>
                        
                        <Button
                          variant={set.isCompleted ? "default" : "outline"}
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => completeSet(exercise.id, set.id)}
                        >
                          {set.isCompleted ? <CheckCircle className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        </Button>

                        {exercise.sets.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500"
                            onClick={() => removeSetFromExercise(exercise.id, set.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addSetToExercise(exercise.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Set
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-deep-navy dark:text-dark-text">Saved Programs</h2>
            <Button variant="outline" size="sm" onClick={() => setShowCreateProgramDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </div>

          <div className="space-y-3">
            {savedPrograms.map((program) => (
              <Card key={program.id} className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-deep-navy dark:text-dark-text">{program.name}</h3>
                    <p className="text-sm text-medium-gray dark:text-dark-muted mb-2">{program.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-medium-gray dark:text-dark-muted">
                      <span>{program.exercises.length} exercises</span>
                      <span>{program.estimatedDuration} min</span>
                      <Badge variant="outline" className="text-xs capitalize">{program.difficulty}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button onClick={() => loadProgram(program)} className="bg-primary-gradient hover:opacity-90 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteProgram(program.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <h2 className="text-lg font-medium text-deep-navy dark:text-dark-text">Workout History</h2>
          {workoutHistory.length === 0 ? (
            <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card text-center">
              <p className="text-medium-gray dark:text-dark-muted">No workout history yet</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {workoutHistory.map((workout) => (
                <Card 
                  key={workout.id} 
                  className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => viewWorkoutHistory(workout)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-deep-navy dark:text-dark-text">{workout.name}</h3>
                      <p className="text-sm text-medium-gray dark:text-dark-muted">
                        {workout.startTime && formatDate(workout.startTime)}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-medium-gray dark:text-dark-muted">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {workout.totalDuration ? formatTime(workout.totalDuration) : 'N/A'}
                        </span>
                        <span className="flex items-center">
                          <Target className="h-3 w-3 mr-1" />
                          {workout.completedSets}/{workout.totalSets} sets
                        </span>
                        <span className="flex items-center">
                          <Flame className="h-3 w-3 mr-1" />
                          {workout.exercises.length} exercises
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Exercise Selection Dialog */}
      <Dialog open={showExerciseDialog} onOpenChange={setShowExerciseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Exercise</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="p-3 border border-border-gray dark:border-dark-border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => addExerciseToWorkout(exercise)}
                >
                  <h4 className="font-medium text-deep-navy dark:text-dark-text">{exercise.name}</h4>
                  <p className="text-sm text-medium-gray dark:text-dark-muted">{exercise.muscleGroups.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Program Selection Dialog */}
      <Dialog open={showProgramDialog} onOpenChange={setShowProgramDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Load Program</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {savedPrograms.map((program) => (
              <div
                key={program.id}
                className="p-3 border border-border-gray dark:border-dark-border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => loadProgram(program)}
              >
                <h4 className="font-medium text-deep-navy dark:text-dark-text">{program.name}</h4>
                <p className="text-sm text-medium-gray dark:text-dark-muted">{program.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs capitalize">{program.difficulty}</Badge>
                  <span className="text-xs text-medium-gray dark:text-dark-muted">{program.estimatedDuration} min</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Program Dialog */}
      <Dialog open={showCreateProgramDialog} onOpenChange={setShowCreateProgramDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Program</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Program Details */}
            <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="text-sm font-medium text-deep-navy dark:text-dark-text">Description</label>
              <Input
                value={newProgramDescription}
                onChange={(e) => setNewProgramDescription(e.target.value)}
                placeholder="Enter program description"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-deep-navy dark:text-dark-text">Difficulty</label>
              <select
                value={newProgramDifficulty}
                onChange={(e) => setNewProgramDifficulty(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Selected Exercises */}
            {newProgramExercises.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-deep-navy dark:text-dark-text">Selected Exercises</h3>
                <div className="space-y-2">
                  {newProgramExercises.map((exercise, index) => (
                    <Card key={exercise.id} className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-deep-navy dark:text-dark-text">{exercise.exercise.name}</h4>
                          <p className="text-sm text-medium-gray dark:text-dark-muted">
                            {exercise.sets.length} sets × {exercise.sets[0]?.reps || 0} reps
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
              <h3 className="text-lg font-medium text-deep-navy dark:text-dark-text">Add Exercises</h3>
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
              />
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredExercises.map((exercise) => (
                  <Card 
                    key={exercise.id}
                    className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => addExerciseToProgram(exercise)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-deep-navy dark:text-dark-text">{exercise.name}</h4>
                        <p className="text-sm text-medium-gray dark:text-dark-muted">{exercise.muscleGroups.join(', ')}</p>
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

            {/* Create Button */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowCreateProgramDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={createNewProgram}
                disabled={!newProgramName.trim() || newProgramExercises.length === 0}
                className="bg-primary-gradient hover:opacity-90 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Program
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Workout History Detail Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Workout Details</DialogTitle>
          </DialogHeader>
          {selectedHistoryWorkout && (
            <div className="space-y-4">
              {/* Workout Summary */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-center">
                  <p className="text-sm text-medium-gray dark:text-dark-muted">Duration</p>
                  <p className="text-lg font-bold text-deep-navy dark:text-dark-text">
                    {selectedHistoryWorkout.totalDuration ? formatTime(selectedHistoryWorkout.totalDuration) : 'N/A'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-medium-gray dark:text-dark-muted">Sets Completed</p>
                  <p className="text-lg font-bold text-deep-navy dark:text-dark-text">
                    {selectedHistoryWorkout.completedSets}/{selectedHistoryWorkout.totalSets}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-medium-gray dark:text-dark-muted">Exercises</p>
                  <p className="text-lg font-bold text-deep-navy dark:text-dark-text">
                    {selectedHistoryWorkout.exercises.length}
                  </p>
                </div>
              </div>

              {/* Workout Date */}
              <div className="text-sm text-medium-gray dark:text-dark-muted">
                {selectedHistoryWorkout.startTime && formatDate(selectedHistoryWorkout.startTime)}
              </div>

              {/* Exercises */}
              <div className="space-y-3">
                {selectedHistoryWorkout.exercises.map((exercise) => (
                  <Card key={exercise.id} className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
                    <h4 className="font-medium text-deep-navy dark:text-dark-text mb-2">{exercise.exercise.name}</h4>
                    <p className="text-xs text-medium-gray dark:text-dark-muted mb-3">
                      {exercise.exercise.muscleGroups.join(', ')}
                    </p>
                    
                    {/* Sets */}
                    <div className="space-y-2">
                      {exercise.sets.map((set, index) => (
                        <div key={set.id} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-sm font-medium text-deep-navy dark:text-dark-text w-8">
                            {index + 1}
                          </span>
                          
                          <span className="text-sm text-deep-navy dark:text-dark-text w-12">
                            {set.reps} reps
                          </span>
                          
                          <span className="text-sm text-deep-navy dark:text-dark-text w-16">
                            {set.weight} lbs
                          </span>
                          
                          <div className="flex space-x-1">
                            {set.isWarmup && <Badge variant="secondary" className="text-xs">W</Badge>}
                            {set.isFailure && <Badge variant="destructive" className="text-xs">F</Badge>}
                            {set.isDropSet && <Badge variant="outline" className="text-xs">D</Badge>}
                          </div>
                          
                          <div className="ml-auto">
                            {set.isCompleted ? (
                              <Badge variant="default" className="text-xs">✓</Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">×</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}