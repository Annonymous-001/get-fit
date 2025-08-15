"use client"
import React from "react"
import { useState, useRef, useEffect } from "react"
import { Home, Target, Plus, TrendingUp, User, MessageCircle, UserCircle, Moon, Sun, Bell, Users, BotMessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

import HomePage from "@/components/home-page"
import GoalsPage from "@/components/goals-page"
import TrackPage from "@/components/track-page"
import AnalyticsPage from "@/components/analytics-page"
import YouPage from "@/components/you-page"
import CommunityPage from "@/components/community-page"
import FoodTrackingPage from "@/components/food-tracking-page"
import WorkoutTrackingPage from "@/components/workout-tracking-page"

import WaterTrackingPage from "@/components/water-tracking-page"
import WeightTrackingPage from "@/components/weight-tracking-page"
import SleepTrackingPage from "@/components/sleep-tracking-page"
import StrengthTrainingPage from "@/components/strength-training-page"
import OutdoorActivityPage from "@/components/outdoor-activity-page"
import Chatbot from "@/components/chatbot"
import RadialMenu from "@/components/radial-menu"
import AuthWrapper from "@/components/auth/auth-wrapper"

const tabs = [
  { id: "home", label: "Home", icon: Home, component: HomePage },
  { id: "community", label: "Community", icon: Users, component: CommunityPage },
  { id: "add-activity", label: "Add Activity", icon: Plus, component: TrackPage },
  { id: "analytics", label: "Analytics", icon: TrendingUp, component: AnalyticsPage },
  { id: "you", label: "You", icon: User, component: YouPage },
]

// Additional pages for navigation
const additionalPages = {
  goals: GoalsPage,
  food: FoodTrackingPage,
  workout: WorkoutTrackingPage,
  
  water: WaterTrackingPage,
  weight: WeightTrackingPage,
  sleep: SleepTrackingPage,
  "strength-training": StrengthTrainingPage,
  "outdoor-activity": OutdoorActivityPage,
}

function GetFitAppContent() {
  const [activeTab, setActiveTab] = useState("home")
  const [currentPage, setCurrentPage] = useState<string | null>(null)
  const [showRadialMenu, setShowRadialMenu] = useState(false)
  const [radialMenuPosition, setRadialMenuPosition] = useState({ x: 0, y: 0 })
  const { theme, setTheme } = useTheme()
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [isLongPress, setIsLongPress] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const addActivityButtonRef = useRef<HTMLButtonElement>(null)

  const ActiveComponent = currentPage 
    ? additionalPages[currentPage as keyof typeof additionalPages] 
    : tabs.find((tab) => tab.id === activeTab)?.component || HomePage

  const handleAddActivityMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsLongPress(false)

    // Get button position for radial menu
    if (addActivityButtonRef.current) {
      const rect = addActivityButtonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const bottomY = window.innerHeight - rect.top
      setRadialMenuPosition({ x: centerX, y: bottomY + 20 })
    }

    longPressTimer.current = setTimeout(() => {
      setIsLongPress(true)
      setShowRadialMenu(true)
      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }
    }, 500) // 500ms for long press
  }

  const handleAddActivityMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
    if (!isLongPress && activeTab !== "add-activity") {
      setActiveTab("add-activity")
    }
  }

  const handleAddActivityMouseLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
  }

  const closeRadialMenu = () => {
    setShowRadialMenu(false)
    setIsLongPress(false)
  }

  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg flex flex-col max-w-md mx-auto relative transition-colors duration-300">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white dark:bg-dark-card border-b border-border-gray dark:border-dark-border transition-colors duration-300">
        {/* Profile Icon on Left */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setActiveTab("you")
            setCurrentPage(null)
          }}
          className="w-10 h-10 rounded-full bg-primary-gradient hover:opacity-90"
        >
          <UserCircle className="h-5 w-5 text-white" />
        </Button>

        {/* App Title */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GF</span>
          </div>
          <span className="text-deep-navy dark:text-dark-text font-semibold text-lg">GetFit</span>
        </div>

        {/* Messages and Notifications on Right */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-medium-gray dark:text-dark-muted hover:text-deep-navy dark:hover:text-dark-text"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-medium-gray dark:text-dark-muted hover:text-deep-navy dark:hover:text-dark-text"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {React.createElement(ActiveComponent as any, {
          onNavigateToPage: (page: string) => setCurrentPage(page),
          onNavigateToTab: (tab: string) => {
            setActiveTab(tab)
            setCurrentPage(null)
          }
        })}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white dark:bg-dark-card border-t border-border-gray dark:border-dark-border transition-colors duration-300">
        <div className="flex items-center justify-center px-4 py-2 relative">
          {/* Left side tabs */}
          <div className="flex flex-1 justify-around">
            {tabs.slice(0, 2).map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id && !currentPage
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setCurrentPage(null)
                  }}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px] ${
                    isActive
                      ? "text-bright-blue"
                      : "text-medium-gray dark:text-dark-muted hover:text-deep-navy dark:hover:text-dark-text"
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-1 ${isActive ? "text-bright-blue" : ""}`} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Central Add Activity Button */}
          <div className="flex justify-center px-4">
            <button
              ref={addActivityButtonRef}
              onMouseDown={handleAddActivityMouseDown}
              onMouseUp={handleAddActivityMouseUp}
              onMouseLeave={handleAddActivityMouseLeave}
              onTouchStart={handleAddActivityMouseDown}
              onTouchEnd={handleAddActivityMouseUp}
              className={`w-14 h-14 rounded-full bg-primary-gradient shadow-lg transition-all duration-200 flex items-center justify-center ${
                showRadialMenu ? "scale-110 shadow-xl" : "hover:opacity-90 active:scale-95"
              }`}
            >
              <Plus
                className={`h-6 w-6 text-white transition-transform duration-200 ${showRadialMenu ? "rotate-45" : ""}`}
              />
            </button>
          </div>

          {/* Right side tabs */}
          <div className="flex flex-1 justify-around">
            {tabs.slice(3, 5).map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id && !currentPage
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setCurrentPage(null)
                  }}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px] ${
                    isActive
                      ? "text-bright-blue"
                      : "text-medium-gray dark:text-dark-muted hover:text-deep-navy dark:hover:text-dark-text"
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-1 ${isActive ? "text-bright-blue" : ""}`} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Floating AI Chatbot Button */}
      <Button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-primary-gradient hover:opacity-90 shadow-lg transition-all duration-300"
        size="icon"
      >
        <BotMessageSquare className="h-6 w-6 text-white" />
      </Button>

      {/* Chatbot */}
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}

      {/* Radial Menu */}
      <RadialMenu 
        isVisible={showRadialMenu} 
        onClose={closeRadialMenu} 
        centerPosition={radialMenuPosition}
        onNavigateToPage={(page: string) => setCurrentPage(page)}
      />
    </div>
  )
}

export default function GetFitApp() {
  return (
    <AuthWrapper>
      <GetFitAppContent />
    </AuthWrapper>
  )
}
