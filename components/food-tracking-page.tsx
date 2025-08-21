"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Plus, 
  Camera, 
  Coffee, 
  Utensils,
  ChevronLeft,
  ChevronDown,
  MoreHorizontal,
  Clock,
  Settings,
  X,
  ChevronRight,
  TrendingUp,
  Flame
} from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FoodTrackingPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack"

interface FoodItem {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  serving?: string
}

interface Meal {
  id: string
  type: MealType | string
  time: string
  items: FoodItem[]
}

interface RecentItem extends FoodItem {
  lastUsed: string // ISO timestamp
}

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function formatNowTime() {
  const d = new Date()
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}

function todayKey() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

export default function FoodTrackingPage({ onNavigateToPage, onNavigateToTab }: FoodTrackingPageProps) {
  const { toast } = useToast()

  const [currentView, setCurrentView] = useState<'main' | 'search' | 'food-detail'>('main')
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [selectedMealType, setSelectedMealType] = useState<string>('')
  const [meals, setMeals] = useState<Meal[]>([])
  const [search, setSearch] = useState<string>("")
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState<number>(1550)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeek(new Date()))
  const [datePopoverOpen, setDatePopoverOpen] = useState<boolean>(false)

  function dateKey(d: Date) {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  }

  function storageKeyForDate(d: Date) {
    return `foodTracking:meals:${dateKey(d)}`
  }

  function displayDateLabel(d: Date) {
    const today = new Date()
    const diffMs = new Date(today.toDateString()).getTime() - new Date(d.toDateString()).getTime()
    const dayMs = 24 * 60 * 60 * 1000
    const diffDays = Math.round(diffMs / dayMs)
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays === 2) return "Day before yesterday"
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
  }

  function startOfWeek(d: Date) {
    const tmp = new Date(d)
    const day = (tmp.getDay() + 6) % 7 // Monday = 0
    tmp.setDate(tmp.getDate() - day)
    tmp.setHours(0, 0, 0, 0)
    return tmp
  }

  function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  }

  // Load meals when selected date changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKeyForDate(selectedDate))
      if (raw) {
        setMeals(JSON.parse(raw))
      } else {
        setMeals([])
      }
    } catch {}
    setWeekStart(startOfWeek(selectedDate))
  }, [selectedDate])

  // Persist meals for selected date
  useEffect(() => {
    try {
      localStorage.setItem(storageKeyForDate(selectedDate), JSON.stringify(meals))
    } catch {}
  }, [meals, selectedDate])

  const frequentlyTrackedFoods = [
    { name: "Tea", calories: 73, protein: 0.1, carbs: 0.2, fat: 0, serving: "1.0 teacup" },
    { name: "Boiled Egg", calories: 155, protein: 13, carbs: 1, fat: 11, serving: "2.0 large" },
    { name: "Banana", calories: 55, protein: 1.3, carbs: 27.5, fat: 0.3, serving: "1.0 small(4.5\" long)" },
    { name: "Roti", calories: 85, protein: 3, carbs: 18, fat: 1, serving: "1.0 roti/chapati" },
    { name: "Almond", calories: 37, protein: 1.4, carbs: 1.4, fat: 3.2, serving: "5.0 almond" },
    { name: "Milk", calories: 168, protein: 8, carbs: 12, fat: 9, serving: "1.0 glass" },
    { name: "Idli", calories: 146, protein: 4, carbs: 28, fat: 2, serving: "2.0 idli(regular)" },
    { name: "Apple", calories: 88, protein: 0.4, carbs: 23, fat: 0.3, serving: "1.0 small (2-3/4\" dia)" },
    { name: "Walnut", calories: 28, protein: 0.7, carbs: 0.6, fat: 2.8, serving: "2.0 piece(half of one)" },
    { name: "Dosa", calories: 221, protein: 6, carbs: 35, fat: 6, serving: "1.5 medium" },
    { name: "Poha", calories: 69, protein: 2, carbs: 13, fat: 1, serving: "0.5 katori" }
  ]

  const nutritionSummary = useMemo(() => {
    const totals = meals.reduce(
      (acc, meal) => {
        for (const item of meal.items) {
          acc.calories += item.calories || 0
          acc.protein += item.protein || 0
          acc.carbs += item.carbs || 0
          acc.fat += item.fat || 0
        }
        return acc
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    )
    return totals
  }, [meals])

  function addItemToMeal(mealType: string, item: FoodItem) {
    const newMeal: Meal = {
      id: generateId(),
      type: mealType,
      time: formatNowTime(),
      items: [item]
    }
    setMeals((prev) => [...prev, newMeal])
  }

  function getCaloriesForMealType(type: string): number {
    return meals
      .filter((m) => m.type === type)
      .reduce((sum, m) => sum + m.items.reduce((s, it) => s + (it.calories || 0), 0), 0)
  }

  // Main view component
  const MainView = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigateToTab?.("add-activity")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <span className="text-lg font-medium">{displayDateLabel(selectedDate)}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="center" className="w-[360px]">
              <div className="flex items-center justify-between mb-3">
                <Button variant="ghost" size="icon" onClick={() => setWeekStart(new Date(weekStart.getTime() - 7*24*60*60*1000))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">
                  {weekStart.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  {" - "}
                  {new Date(weekStart.getTime() + 6*24*60*60*1000).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </div>
                <Button variant="ghost" size="icon" onClick={() => setWeekStart(new Date(weekStart.getTime() + 7*24*60*60*1000))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-stretch justify-between">
                {Array.from({ length: 7 }).map((_, i) => {
                  const d = new Date(weekStart.getTime() + i*24*60*60*1000)
                  const isSelected = isSameDay(d, selectedDate)
                  const isFuture = d > new Date(new Date().toDateString())
                  const dayName = d.toLocaleDateString(undefined, { weekday: "short" }).slice(0,1)
                  return (
                    <button
                      key={i}
                      disabled={false}
                      onClick={() => { setSelectedDate(d); setDatePopoverOpen(false) }}
                      className={`flex flex-col items-center justify-center w-12 py-2 rounded-md ${isSelected ? 'bg-gray-200 dark:bg-dark-bg' : ''} ${isFuture ? 'opacity-50' : ''}`}
                    >
                      <div className="text-base font-semibold">{d.getDate()}</div>
                      <div className="text-xs mt-1">{dayName}</div>
                    </button>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Intermittent Fasting Card */}
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-dark-bg rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-dark-text">Set up Intermittent Fasting</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">Recommended Plan</span>
                  <span className="text-lg font-semibold">14 hrs</span>
                </div>
              </div>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6">
              Get Started
            </Button>
          </div>
        </Card>

        {/* Calorie Summary */}
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                <X className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-dark-text">Eat up to {dailyCalorieTarget} Cal</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-sky-600" />
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border p-4 text-center">
            <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Utensils className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-medium">Diet Plan</p>
          </Card>
          <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border p-4 text-center">
            <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-medium">Insights</p>
          </Card>
          <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border p-4 text-center">
            <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Coffee className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-medium">Recipes</p>
          </Card>
        </div>

        {/* Meal Sections */}
        {[ 
          { name: "Breakfast", calories: 388, description: "All you need is some breakfast ☀️🍳" },
          { name: "Morning Snack", calories: 194, description: "Get energized by grabbing a morning snack 🥜" },
          { name: "Lunch", calories: 388, description: "Hey, here are some Healthy Lunch Suggestions for you" },
          { name: "Evening Snack", calories: 194, description: "Refuel your body with a delicious evening snack 🍐" },
          { name: "Dinner", calories: 388, description: "An early dinner can help you sleep better | 😴" }
        ].map((meal) => {
          const consumed = getCaloriesForMealType(meal.name)
          return (
          <div key={meal.name}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">{meal.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{consumed} of {meal.calories} Cal</span>
                <Button 
                  size="icon" 
                  className="w-8 h-8 bg-blue-400 hover:bg-blue-500 text-white rounded-full"
                  onClick={() => {
                    setSelectedMealType(meal.name)
                    setCurrentView('search')
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark-card rounded-lg p-4 border border-gray-200 dark:border-dark-border mb-4">
              <p className="text-sm text-gray-600 dark:text-dark-muted text-center">{meal.description}</p>
            </div>
          </div>
        )})}

        {/* More Options */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">More</h3>
          {[
            { icon: X, title: "Calories and Nutrition Settings" },
            { icon: Coffee, title: "Add/Remove Meals & Time" },
            { icon: Flame, title: "Edit Meal Calories" },
            { icon: Camera, title: "Snap Gallery" },
            { icon: Clock, title: "Food Reminders" },
            { icon: Utensils, title: "Share Feedback" }
          ].map((item, index) => (
            <Card key={index} className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-dark-text">{item.title}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Snap Button */}
      {/* <div className="fixed bottom-6 right-6">
        <Button 
          className="w-16 h-16 bg-black hover:bg-gray-800 text-white rounded-full shadow-lg"
          onClick={() => toast({ description: "Camera feature coming soon!" })}
        >
          <Camera className="h-6 w-6" />
        </Button>
      </div> */}
    </div>
  )

  // Search view component
  const SearchView = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCurrentView('main')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium">Track {selectedMealType}</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Camera Section */}
        <Card className="bg-gray-600 text-white border-0 h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="h-8 w-8" />
            </div>
            <p className="text-lg font-medium">Click a Snap and Track</p>
          </div>
        </Card>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search and Track"
            className="pl-10 bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Frequently Tracked Foods */}
        <div>
          <h3 className="text-gray-500 text-sm mb-3">Frequently Tracked Foods</h3>
          <div className="space-y-2">
            {frequentlyTrackedFoods
              .filter(food => !search || food.name.toLowerCase().includes(search.toLowerCase()))
              .map((food, index) => (
                <Card key={index} className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
                  <div 
                    className="p-3 flex items-center justify-between cursor-pointer"
                    onClick={() => {
                      setSelectedFood(food)
                      setCurrentView('food-detail')
                    }}
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-dark-text">{food.name}</p>
                      <p className="text-sm text-gray-500">{food.serving}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{food.calories} Cal</span>
                      <Button 
                        size="icon" 
                        className="w-8 h-8 bg-blue-300 hover:bg-blue-500 text-white rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          addItemToMeal(selectedMealType, food)
                          toast({ description: `Added ${food.name} to ${selectedMealType}` })
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Can't find your food */}
        <div className="text-center pt-4">
          <Button 
            variant="ghost" 
            className="text-green-600 hover:text-green-700"
            onClick={() => toast({ description: "Custom food entry coming soon!" })}
          >
            Can't find your food? →
          </Button>
        </div>
      </div>
    </div>
  )

  // Food detail view component
  const FoodDetailView = () => {
    if (!selectedFood) return null

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
        {/* Header */}
        <div className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setCurrentView('search')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Utensils className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Food Image */}
          <Card className="bg-blue-400 h-32 rounded-2xl flex items-center justify-center">
            <h2 className="text-2xl font-bold text-white">{selectedFood.name}</h2>
          </Card>

          {/* Quantity and Measure */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Quantity</Label>
              <Select defaultValue="1">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="1.5">1.5</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Measure</Label>
              <Select defaultValue={selectedFood.serving || "small"}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">small (6" to 6-7/8" long)</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="large">large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Macronutrients Breakdown */}
          <div>
            <h3 className="text-lg font-medium mb-4">Macronutrients Breakdown</h3>
            
            <div className="bg-white dark:bg-dark-card rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{selectedFood.calories} Cal</p>
                  <p className="text-sm text-gray-500">Net wt: 101.0 g</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Proteins</span>
                  </div>
                  <span className="text-sm font-medium">{selectedFood.protein}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Fats</span>
                  </div>
                  <span className="text-sm font-medium">{selectedFood.fat}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Carbs</span>
                  </div>
                  <span className="text-sm font-medium">{selectedFood.carbs}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Fiber</span>
                  </div>
                  <span className="text-sm font-medium">2.0g</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Micronutrients Breakdown</h4>
              </div>
            </div>
          </div>

          {/* Add Button */}
          <Button 
            className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 text-lg font-medium"
            onClick={() => {
              addItemToMeal(selectedMealType, selectedFood)
              toast({ description: `Added ${selectedFood.name} to ${selectedMealType}` })
              setCurrentView('main')
            }}
          >
            ADD
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {currentView === 'main' && <MainView />}
      {currentView === 'search' && <SearchView />}
      {currentView === 'food-detail' && <FoodDetailView />}
    </>
  )
}
