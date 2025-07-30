"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dumbbell, Utensils, Droplets, Moon, Activity, Scale } from "lucide-react"

interface RadialMenuProps {
  isVisible: boolean
  onClose: () => void
  centerPosition: { x: number; y: number }
}

export default function RadialMenu({ isVisible, onClose, centerPosition }: RadialMenuProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const quickActions = [
    {
      icon: Dumbbell,
      label: "Workout",
      color: "bg-gradient-to-r from-red-400 to-red-600",
      hoverColor: "hover:from-red-500 hover:to-red-700",
      action: () => console.log("Start workout tracking"),
    },
    {
      icon: Utensils,
      label: "Food",
      color: "bg-gradient-to-r from-green-400 to-green-600",
      hoverColor: "hover:from-green-500 hover:to-green-700",
      action: () => console.log("Log food"),
    },
    {
      icon: Scale,
      label: "Weight",
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      hoverColor: "hover:from-blue-500 hover:to-blue-700",
      action: () => console.log("Log weight"),
    },
    {
      icon: Droplets,
      label: "Water",
      color: "bg-gradient-to-r from-cyan-400 to-cyan-600",
      hoverColor: "hover:from-cyan-500 hover:to-cyan-700",
      action: () => console.log("Log water"),
    },
    {
      icon: Moon,
      label: "Sleep",
      color: "bg-gradient-to-r from-purple-400 to-purple-600",
      hoverColor: "hover:from-purple-500 hover:to-purple-700",
      action: () => console.log("Log sleep"),
    },
    {
      icon: Activity,
      label: "Other",
      color: "bg-gradient-to-r from-orange-400 to-orange-600",
      hoverColor: "hover:from-orange-500 hover:to-orange-700",
      action: () => console.log("Log other metrics"),
    },
  ]

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const getIconPosition = (index: number, total: number) => {
    // Semi-circular arc above the center point
    const radius = 90 // Increased radius for better spacing
    const startAngle = Math.PI + Math.PI / 6 // Start from 210 degrees
    const endAngle = -Math.PI / 6 // End at -30 degrees
    const angleStep = (startAngle - endAngle) / (total - 1)
    const angle = startAngle - angleStep * index

    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return { x, y }
  }

  if (!isAnimating && !isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isVisible ? "bg-black/30 backdrop-blur-sm" : "bg-transparent"
        }`}
        onClick={onClose}
      />

      {/* Radial Menu */}
      <div
        className="fixed z-50"
        style={{
          left: centerPosition.x,
          bottom: centerPosition.y,
          transform: "translate(-50%, 0)",
        }}
      >
        {quickActions.map((action, index) => {
          const Icon = action.icon
          const position = getIconPosition(index, quickActions.length)
          const delay = index * 60 // Slightly increased stagger

          return (
            <div
              key={index}
              className={`absolute transition-all duration-400 ease-out ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
              style={{
                left: position.x,
                bottom: position.y,
                transform: "translate(-50%, 50%)",
                transitionDelay: isVisible ? `${delay}ms` : "0ms",
              }}
            >
              <Button
                onClick={() => {
                  action.action()
                  onClose()
                }}
                className={`w-14 h-14 rounded-full ${action.color} ${action.hoverColor} shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 border-3 border-white/30`}
                size="icon"
              >
                <Icon className="h-6 w-6 text-white" />
              </Button>
              
              {/* Label */}
              {/* <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded-md whitespace-nowrap transition-all duration-200 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{ transitionDelay: isVisible ? `${delay + 100}ms` : "0ms" }}
              >
                {action.label}
              </div> */}
            </div>
          )
        })}

        {/* Center indicator dot */}
        <div
          className={`absolute left-0 bottom-0 transform -translate-x-1/2 translate-y-1/2 transition-all duration-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
        >
          <div className="w-3 h-3 bg-white rounded-full shadow-lg border-2 border-bright-blue/50" />
        </div>
      </div>
    </>
  )
}
