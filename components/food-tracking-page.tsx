"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Plus, 
  Camera, 
  Barcode, 
  Flame, 
  Apple, 
  Coffee, 
  Sandwich,
  Utensils,
  ChevronLeft,
  Mic,
  MoreHorizontal,
  Trash2,
  Salad
} from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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

const MEAL_TYPES: MealType[] = ["Breakfast", "Lunch", "Dinner", "Snack"]

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

function relativeTimeFromNow(iso: string) {
  const then = new Date(iso).getTime()
  const now = Date.now()
  const diff = Math.max(0, Math.floor((now - then) / 1000))
  const mins = Math.floor(diff / 60)
  const hrs = Math.floor(mins / 60)
  const days = Math.floor(hrs / 24)
  if (diff < 60) return "just now"
  if (mins < 60) return `${mins} min ago`
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`
  return `${days} day${days === 1 ? "" : "s"} ago`
}

export default function FoodTrackingPage({ onNavigateToPage, onNavigateToTab }: FoodTrackingPageProps) {
  const { toast } = useToast()

  const [meals, setMeals] = useState<Meal[]>([])
  const [activeMealId, setActiveMealId] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])
  const [userFoods, setUserFoods] = useState<FoodItem[]>([])

  const [customName, setCustomName] = useState<string>("")
  const [customCalories, setCustomCalories] = useState<string>("")
  const [customProtein, setCustomProtein] = useState<string>("")
  const [customCarbs, setCustomCarbs] = useState<string>("")
  const [customFat, setCustomFat] = useState<string>("")
  const [customMealId, setCustomMealId] = useState<string>("")
  const [customSaveToMyFoods, setCustomSaveToMyFoods] = useState<boolean>(true)

  const storageMealsKey = `foodTracking:meals:${todayKey()}`
  const storageActiveMealKey = `foodTracking:activeMeal:${todayKey()}`
  const storageRecentKey = `foodTracking:recentItems`
  const storageUserFoodsKey = `foodTracking:userFoods`

  useEffect(() => {
    try {
      const savedMeals = typeof window !== "undefined" ? localStorage.getItem(storageMealsKey) : null
      const savedActive = typeof window !== "undefined" ? localStorage.getItem(storageActiveMealKey) : null
      const savedRecent = typeof window !== "undefined" ? localStorage.getItem(storageRecentKey) : null
      const savedUserFoods = typeof window !== "undefined" ? localStorage.getItem(storageUserFoodsKey) : null
      if (savedMeals) {
        const parsed: Meal[] = JSON.parse(savedMeals)
        setMeals(parsed)
        if (parsed.length > 0 && !savedActive) setActiveMealId(parsed[0].id)
      } else {
        const seed: Meal[] = [
          { id: generateId(), type: "Breakfast", time: formatNowTime(), items: [] }
        ]
        setMeals(seed)
        setActiveMealId(seed[0].id)
      }
      if (savedActive) setActiveMealId(savedActive)
      if (savedRecent) setRecentItems(JSON.parse(savedRecent))
      if (savedUserFoods) setUserFoods(JSON.parse(savedUserFoods))
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem(storageMealsKey, JSON.stringify(meals))
  }, [meals])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (activeMealId) localStorage.setItem(storageActiveMealKey, activeMealId)
  }, [activeMealId])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem(storageRecentKey, JSON.stringify(recentItems))
  }, [recentItems])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem(storageUserFoodsKey, JSON.stringify(userFoods))
  }, [userFoods])

  const quickAddItems = [
    { name: "Apple", calories: 95, icon: Apple, category: "Fruit", protein: 0, carbs: 25, fat: 0 },
    { name: "Coffee", calories: 5, icon: Coffee, category: "Drink", protein: 0, carbs: 1, fat: 0 },
    { name: "Sandwich", calories: 350, icon: Sandwich, category: "Meal", protein: 15, carbs: 40, fat: 12 },
    { name: "Greek Yogurt", calories: 130, icon: Utensils, category: "Dairy", protein: 11, carbs: 9, fat: 5 },
    { name: "Salad", calories: 100, icon: Salad, category: "Vegetable", protein: 1, carbs: 10, fat: 0 },
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
    const targets = { calories: 2000, protein: 120, carbs: 250, fat: 65 }
    return {
      calories: { current: totals.calories, target: targets.calories, remaining: Math.max(0, targets.calories - totals.calories) },
      protein: { current: totals.protein, target: targets.protein, remaining: Math.max(0, targets.protein - totals.protein) },
      carbs: { current: totals.carbs, target: targets.carbs, remaining: Math.max(0, targets.carbs - totals.carbs) },
      fat: { current: totals.fat, target: targets.fat, remaining: Math.max(0, targets.fat - totals.fat) }
    }
  }, [meals])

  function ensureActiveMeal(defaultType: MealType = "Breakfast") {
    if (meals.length === 0) {
      const m: Meal = { id: generateId(), type: defaultType, time: formatNowTime(), items: [] }
      setMeals([m])
      setActiveMealId(m.id)
      return m.id
    }
    if (!activeMealId) {
      setActiveMealId(meals[0].id)
      return meals[0].id
    }
    return activeMealId
  }

  function addMeal(type: MealType | string) {
    const m: Meal = { id: generateId(), type, time: formatNowTime(), items: [] }
    setMeals((prev) => [...prev, m])
    setActiveMealId(m.id)
    toast({ description: `Added ${type} meal` })
  }

  function deleteMeal(id: string) {
    setMeals((prev) => prev.filter((m) => m.id !== id))
    if (activeMealId === id) {
      const remaining = meals.filter((m) => m.id !== id)
      setActiveMealId(remaining.length ? remaining[0].id : "")
    }
  }

  function addItemToMeal(mealId: string, item: FoodItem) {
    setMeals((prev) => prev.map((m) => (m.id === mealId ? { ...m, items: [...m.items, item] } : m)))
    setRecentItems((prev) => {
      const existingIdx = prev.findIndex((ri) => ri.name.toLowerCase() === item.name.toLowerCase())
      const newEntry: RecentItem = { ...item, lastUsed: new Date().toISOString() }
      if (existingIdx >= 0) {
        const copy = [...prev]
        copy.splice(existingIdx, 1)
        return [newEntry, ...copy].slice(0, 30)
      }
      return [newEntry, ...prev].slice(0, 30)
    })
  }

  function deleteItemFromMeal(mealId: string, index: number) {
    setMeals((prev) => prev.map((m) => (m.id === mealId ? { ...m, items: m.items.filter((_, i) => i !== index) } : m)))
  }

  function handleQuickAddClick(q: { name: string; calories: number; protein: number; carbs: number; fat: number }) {
    const targetMealId = ensureActiveMeal()
    addItemToMeal(targetMealId, {
      name: q.name,
      calories: q.calories,
      protein: q.protein,
      carbs: q.carbs,
      fat: q.fat
    })
    toast({ description: `Added ${q.name} to meal` })
  }

  function handleAddCustomItem() {
    const name = customName.trim()
    const mealId = customMealId || activeMealId || ensureActiveMeal()
    if (!name) {
      toast({ description: "Please enter a name" })
      return
    }
    const calories = Number(customCalories) || 0
    const protein = Number(customProtein) || 0
    const carbs = Number(customCarbs) || 0
    const fat = Number(customFat) || 0
    addItemToMeal(mealId, { name, calories, protein, carbs, fat })
    if (customSaveToMyFoods) addToUserFoodsIfMissing({ name, calories, protein, carbs, fat })
    setCustomName("")
    setCustomCalories("")
    setCustomProtein("")
    setCustomCarbs("")
    setCustomFat("")
    setCustomMealId("")
    toast({ description: `Added ${name}` })
  }

  // Save to My Foods util
  function addToUserFoodsIfMissing(item: FoodItem) {
    setUserFoods((prev) => {
      const exists = prev.some((f) => f.name.toLowerCase() === item.name.toLowerCase())
      if (exists) return prev
      return [item, ...prev].slice(0, 300)
    })
  }

  // Search results composition
  const searchResults: FoodItem[] = useMemo(() => {
    if (!search.trim()) return []
    const term = search.toLowerCase()
    const fromQuick = quickAddItems
      .filter((q) => q.name.toLowerCase().includes(term) || q.category.toLowerCase().includes(term))
      .map((q) => ({ name: q.name, calories: q.calories, protein: q.protein, carbs: q.carbs, fat: q.fat }))
    const fromRecent = recentItems
      .filter((r) => r.name.toLowerCase().includes(term))
      .map((r) => ({ name: r.name, calories: r.calories, protein: r.protein, carbs: r.carbs, fat: r.fat }))
    const fromUser = userFoods.filter((u) => u.name.toLowerCase().includes(term))
    const merged = [...fromUser, ...fromRecent, ...fromQuick]
    const seen = new Set<string>()
    const deduped: FoodItem[] = []
    for (const it of merged) {
      const key = it.name.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      deduped.push(it)
      if (deduped.length >= 20) break
    }
    return deduped
  }, [search, recentItems, userFoods])

  // Add Meal dialog state
  const [addMealOpen, setAddMealOpen] = useState(false)
  const [addMealType, setAddMealType] = useState<MealType | string>("Breakfast")
  const [addFoodName, setAddFoodName] = useState("")
  const [addFoodCalories, setAddFoodCalories] = useState("")
  const [addFoodProtein, setAddFoodProtein] = useState("")
  const [addFoodCarbs, setAddFoodCarbs] = useState("")
  const [addFoodFat, setAddFoodFat] = useState("")
  const [saveAddFoodToLibrary, setSaveAddFoodToLibrary] = useState<boolean>(true)

  function submitAddMeal() {
    const type = addMealType || "Custom"
    const m: Meal = { id: generateId(), type, time: formatNowTime(), items: [] }
    const initialFoodName = addFoodName.trim()
    if (initialFoodName) {
      const calories = Number(addFoodCalories) || 0
      const protein = Number(addFoodProtein) || 0
      const carbs = Number(addFoodCarbs) || 0
      const fat = Number(addFoodFat) || 0
      m.items.push({ name: initialFoodName, calories, protein, carbs, fat })
      if (saveAddFoodToLibrary) addToUserFoodsIfMissing({ name: initialFoodName, calories, protein, carbs, fat })
    }
    setMeals((prev) => [...prev, m])
    setActiveMealId(m.id)
    setAddMealOpen(false)
    setAddMealType("Breakfast")
    setAddFoodName("")
    setAddFoodCalories("")
    setAddFoodProtein("")
    setAddFoodCarbs("")
    setAddFoodFat("")
    toast({ description: `Added ${type} meal` })
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ description: "Camera scanning coming soon" })}>
            <Camera className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ description: "Barcode scanning coming soon" })}>
            <Barcode className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ description: "Voice logging coming soon" })}>
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="space-y-2">
            {searchResults.map((res, idx) => (
              <div key={`${res.name}-${idx}`} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm text-deep-navy dark:text-dark-text">{res.name}</p>
                  <p className="text-xs text-medium-gray dark:text-dark-muted">P {res.protein}g • C {res.carbs}g • F {res.fat}g</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-bright-blue">{res.calories} cal</span>
                  <Button size="sm" variant="ghost" onClick={() => { addItemToMeal(ensureActiveMeal(), res); addToUserFoodsIfMissing(res); }}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Active meal selector & Add Meal */}
      <Card className="p-3 border border-border-gray dark:border-dark-border bg-transparent dark:bg-transparent">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-medium-gray dark:text-dark-muted">Active meal</span>
            <Select value={activeMealId} onValueChange={(v) => setActiveMealId(v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select meal" />
              </SelectTrigger>
              <SelectContent>
                {meals.map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={addMealOpen} onOpenChange={setAddMealOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Meal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[520px]">
                <DialogHeader>
                  <DialogTitle>Add Meal</DialogTitle>
                </DialogHeader>
                <div className="grid gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Meal type</Label>
                    <Select value={addMealType} onValueChange={(v) => setAddMealType(v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose type" />
                      </SelectTrigger>
                      <SelectContent>
                        {MEAL_TYPES.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    <div className="space-y-1 md:col-span-2">
                      <Label className="text-xs">Food (optional)</Label>
                      <Input placeholder="e.g., Scrambled eggs" value={addFoodName} onChange={(e) => setAddFoodName(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Cal</Label>
                      <Input value={addFoodCalories} onChange={(e) => setAddFoodCalories(e.target.value)} inputMode="numeric" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">P</Label>
                      <Input value={addFoodProtein} onChange={(e) => setAddFoodProtein(e.target.value)} inputMode="numeric" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">C</Label>
                      <Input value={addFoodCarbs} onChange={(e) => setAddFoodCarbs(e.target.value)} inputMode="numeric" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">F</Label>
                      <Input value={addFoodFat} onChange={(e) => setAddFoodFat(e.target.value)} inputMode="numeric" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="saveAddLib" checked={saveAddFoodToLibrary} onCheckedChange={(v) => setSaveAddFoodToLibrary(Boolean(v))} />
                    <Label htmlFor="saveAddLib" className="text-xs">Save added food to My Foods</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={submitAddMeal}>Add Meal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" onClick={() => addMeal("Snack")}>Quick Snack</Button>
          </div>
        </div>
      </Card>

      {/* Quick Add */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Quick Add</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {quickAddItems
            .filter((q) => q.name.toLowerCase().includes(search.toLowerCase()) || q.category.toLowerCase().includes(search.toLowerCase()))
            .map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className="p-3 border border-border-gray dark:border-dark-border min-w-[120px] flex-shrink-0 cursor-pointer hover:bg-light-gray dark:hover:bg-dark-bg transition-colors bg-white dark:bg-dark-card"
                onClick={() => handleQuickAddClick(item)}
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

      {/* Add Custom Item */}
      <Card className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
        <h3 className="font-medium text-deep-navy dark:text-dark-text mb-3">Add Custom Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Name</Label>
            <Input placeholder="e.g., Oatmeal" value={customName} onChange={(e) => setCustomName(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Calories</Label>
            <Input placeholder="kcal" value={customCalories} onChange={(e) => setCustomCalories(e.target.value)} inputMode="numeric" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Protein (g)</Label>
            <Input placeholder="g" value={customProtein} onChange={(e) => setCustomProtein(e.target.value)} inputMode="numeric" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Carbs (g)</Label>
            <Input placeholder="g" value={customCarbs} onChange={(e) => setCustomCarbs(e.target.value)} inputMode="numeric" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Fat (g)</Label>
            <Input placeholder="g" value={customFat} onChange={(e) => setCustomFat(e.target.value)} inputMode="numeric" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Meal</Label>
            <Select value={customMealId || activeMealId} onValueChange={(v) => setCustomMealId(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose meal" />
              </SelectTrigger>
              <SelectContent>
                {meals.map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="saveMyFood" checked={customSaveToMyFoods} onCheckedChange={(v) => setCustomSaveToMyFoods(Boolean(v))} />
            <Label htmlFor="saveMyFood" className="text-xs">Save to My Foods</Label>
          </div>
          <Button size="sm" onClick={handleAddCustomItem}>
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>
      </Card>

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
          <Dialog open={addMealOpen} onOpenChange={setAddMealOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-bright-blue">
                <Plus className="h-4 w-4 mr-1" />
                Add Meal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
              <DialogHeader>
                <DialogTitle>Add Meal</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Meal type</Label>
                  <Select value={addMealType} onValueChange={(v) => setAddMealType(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose type" />
                    </SelectTrigger>
                    <SelectContent>
                      {MEAL_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  <div className="space-y-1 md:col-span-2">
                    <Label className="text-xs">Food (optional)</Label>
                    <Input placeholder="e.g., Scrambled eggs" value={addFoodName} onChange={(e) => setAddFoodName(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Cal</Label>
                    <Input value={addFoodCalories} onChange={(e) => setAddFoodCalories(e.target.value)} inputMode="numeric" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">P</Label>
                    <Input value={addFoodProtein} onChange={(e) => setAddFoodProtein(e.target.value)} inputMode="numeric" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">C</Label>
                    <Input value={addFoodCarbs} onChange={(e) => setAddFoodCarbs(e.target.value)} inputMode="numeric" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">F</Label>
                    <Input value={addFoodFat} onChange={(e) => setAddFoodFat(e.target.value)} inputMode="numeric" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="saveAddLib2" checked={saveAddFoodToLibrary} onCheckedChange={(v) => setSaveAddFoodToLibrary(Boolean(v))} />
                  <Label htmlFor="saveAddLib2" className="text-xs">Save added food to My Foods</Label>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={submitAddMeal}>Add Meal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-3">
          {meals.map((meal) => {
            const total = meal.items.reduce((acc, i) => acc + (i.calories || 0), 0)
            return (
              <Card key={meal.id} className="p-4 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-deep-navy dark:text-dark-text">{meal.type}</h3>
                    <Badge variant="outline" className="text-xs">
                      {meal.time}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-deep-navy dark:text-dark-text">
                        {total} cal
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteMeal(meal.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {meal.items.length === 0 && (
                    <div className="text-xs text-medium-gray dark:text-dark-muted">No items yet. Use Quick Add or Add Custom Item above.</div>
                  )}
                  {meal.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border-gray dark:border-dark-border last:border-b-0">
                      <div>
                        <p className="text-sm text-deep-navy dark:text-dark-text">{item.name}</p>
                        <p className="text-xs text-medium-gray dark:text-dark-muted">
                          P: {item.protein}g • C: {item.carbs}g • F: {item.fat}g
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-bright-blue">{item.calories} cal</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => deleteItemFromMeal(meal.id, index)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Items */}
      <div className="space-y-3">
        <h2 className="text-lg font-light text-deep-navy dark:text-dark-text">Recent Items</h2>
        <div className="space-y-2">
          {recentItems
            .filter((ri) => ri.name.toLowerCase().includes(search.toLowerCase()))
            .map((item, index) => (
            <Card key={index} className="p-3 border border-border-gray dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center">
                    <Utensils className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-navy dark:text-dark-text">{item.name}</p>
                    <p className="text-xs text-medium-gray dark:text-dark-muted">{relativeTimeFromNow(item.lastUsed)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-bright-blue">{item.calories} cal</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => handleQuickAddClick(item)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {recentItems.filter((ri) => ri.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
            <div className="text-xs text-medium-gray dark:text-dark-muted">No recent items yet. Add some food to see them here.</div>
          )}
        </div>
      </div>
    </div>
  )
} 