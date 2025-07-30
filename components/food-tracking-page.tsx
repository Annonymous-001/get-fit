import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Plus, 
  Camera, 
  Barcode, 
  Clock, 
  Flame, 
  Apple, 
  Coffee, 
  Sandwich,
  Utensils,
  ChevronLeft,
  Filter,
  Mic,
  Bookmark,
  MoreHorizontal
} from "lucide-react"

interface FoodTrackingPageProps {
  onNavigateToPage?: (page: string) => void
  onNavigateToTab?: (tab: string) => void
}

export default function FoodTrackingPage({ onNavigateToPage, onNavigateToTab }: FoodTrackingPageProps) {
  const todayMeals = [
    {
      id: 1,
      type: "Breakfast",
      time: "8:30 AM",
      items: [
        { name: "Greek Yogurt Bowl", calories: 280, protein: "22g", carbs: "25g", fat: "8g" },
        { name: "Coffee", calories: 5, protein: "0g", carbs: "1g", fat: "0g" }
      ],
      totalCalories: 285
    },
    {
      id: 2,
      type: "Lunch",
      time: "12:30 PM",
      items: [
        { name: "Grilled Chicken Salad", calories: 320, protein: "35g", carbs: "15g", fat: "12g" },
        { name: "Apple", calories: 95, protein: "0g", carbs: "25g", fat: "0g" }
      ],
      totalCalories: 415
    }
  ]

  const quickAddItems = [
    { name: "Apple", calories: 95, icon: Apple, category: "Fruit" },
    { name: "Coffee", calories: 5, icon: Coffee, category: "Drink" },
    { name: "Sandwich", calories: 350, icon: Sandwich, category: "Meal" },
    { name: "Greek Yogurt", calories: 130, icon: Utensils, category: "Dairy" },
  ]

  const recentItems = [
    { name: "Grilled Chicken", calories: 165, lastUsed: "2 hours ago" },
    { name: "Brown Rice", calories: 110, lastUsed: "1 day ago" },
    { name: "Broccoli", calories: 55, lastUsed: "2 days ago" },
    { name: "Salmon", calories: 206, lastUsed: "3 days ago" },
  ]

  const nutritionSummary = {
    calories: { current: 700, target: 2000, remaining: 1300 },
    protein: { current: 57, target: 120, remaining: 63 },
    carbs: { current: 66, target: 250, remaining: 184 },
    fat: { current: 20, target: 65, remaining: 45 }
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
        <h1 className="text-xl font-light text-deep-navy dark:text-dark-text">Food Tracking</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-medium-gray" />
        <Input
          placeholder="Search foods, meals, or scan barcode..."
          className="pl-10 pr-20 bg-light-gray dark:bg-dark-bg border-border-gray dark:border-dark-border"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Camera className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Barcode className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Add */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Quick Add</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {quickAddItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className="p-3 border border-border-gray dark:border-dark-border min-w-[120px] flex-shrink-0 cursor-pointer hover:bg-light-gray dark:hover:bg-dark-bg transition-colors bg-white dark:bg-dark-card"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{item.name}</p>
                    <p className="text-xs text-medium-gray dark:text-dark-muted">{item.category}</p>
                    <p className="text-xs text-bright-blue">{item.calories} cal</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Nutrition Summary */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <h3 className="font-medium text-deep-navy dark:text-dark-text mb-3">Today's Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Calories */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-medium-gray dark:text-dark-muted">Calories</span>
              <span className="text-sm font-medium text-deep-navy dark:text-dark-text">
                {nutritionSummary.calories.current} / {nutritionSummary.calories.target}
              </span>
            </div>
            <div className="w-full bg-light-gray dark:bg-dark-bg rounded-full h-2">
              <div
                className="bg-bright-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${(nutritionSummary.calories.current / nutritionSummary.calories.target) * 100}%` }}
              />
            </div>
            <p className="text-xs text-medium-gray dark:text-dark-muted">
              {nutritionSummary.calories.remaining} remaining
            </p>
          </div>
          
          {/* Protein */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-medium-gray dark:text-dark-muted">Protein</span>
              <span className="text-sm font-medium text-deep-navy dark:text-dark-text">
                {nutritionSummary.protein.current}g / {nutritionSummary.protein.target}g
              </span>
            </div>
            <div className="w-full bg-light-gray dark:bg-dark-bg rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(nutritionSummary.protein.current / nutritionSummary.protein.target) * 100}%` }}
              />
            </div>
            <p className="text-xs text-medium-gray dark:text-dark-muted">
              {nutritionSummary.protein.remaining}g remaining
            </p>
          </div>

          {/* Carbs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-medium-gray dark:text-dark-muted">Carbs</span>
              <span className="text-sm font-medium text-deep-navy dark:text-dark-text">
                {nutritionSummary.carbs.current}g / {nutritionSummary.carbs.target}g
              </span>
            </div>
            <div className="w-full bg-light-gray dark:bg-dark-bg rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(nutritionSummary.carbs.current / nutritionSummary.carbs.target) * 100}%` }}
              />
            </div>
            <p className="text-xs text-medium-gray dark:text-dark-muted">
              {nutritionSummary.carbs.remaining}g remaining
            </p>
          </div>

          {/* Fats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-medium-gray dark:text-dark-muted">Fats</span>
              <span className="text-sm font-medium text-deep-navy dark:text-dark-text">
                {nutritionSummary.fat.current}g / {nutritionSummary.fat.target}g
              </span>
            </div>
            <div className="w-full bg-light-gray dark:bg-dark-bg rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(nutritionSummary.fat.current / nutritionSummary.fat.target) * 100}%` }}
              />
            </div>
            <p className="text-xs text-medium-gray dark:text-dark-muted">
              {nutritionSummary.fat.remaining}g remaining
            </p>
          </div>
        </div>
      </Card>

      {/* Today's Meals */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Today's Meals</h2>
          <Button variant="ghost" size="sm" className="text-bright-blue">
            <Plus className="h-4 w-4 mr-1" />
            Add Meal
          </Button>
        </div>
        
        <div className="space-y-3">
          {todayMeals.map((meal) => (
            <Card key={meal.id} className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-deep-navy dark:text-dark-text">{meal.type}</h3>
                  <Badge variant="outline" className="text-xs">
                    {meal.time}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-deep-navy dark:text-dark-text">
                    {meal.totalCalories} cal
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                {meal.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border-gray dark:border-dark-border last:border-b-0">
                    <div>
                      <p className="text-sm text-deep-navy dark:text-dark-text">{item.name}</p>
                      <p className="text-xs text-medium-gray dark:text-dark-muted">
                        P: {item.protein} • C: {item.carbs} • F: {item.fat}
                      </p>
                    </div>
                    <span className="text-sm text-bright-blue">{item.calories} cal</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Items */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Recent Items</h2>
        <div className="space-y-2">
          {recentItems.map((item, index) => (
            <Card key={index} className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center">
                    <Utensils className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{item.name}</p>
                    <p className="text-xs text-medium-gray dark:text-dark-muted">{item.lastUsed}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-bright-blue">{item.calories} cal</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 