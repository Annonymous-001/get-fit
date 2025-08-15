"use client"

import React from "react"
import { Bell, Lock, BarChart3, HelpCircle, Moon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SettingsPageProps {
  onNavigateToTab: (tab: string) => void
  onLogout: () => void
}

export default function SettingsPage({ onNavigateToTab, onLogout }: SettingsPageProps) {
  const settingsOptions = [
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      color: "text-yellow-500",
      action: () => console.log("Notifications clicked")
    },
    {
      id: "privacy",
      title: "Privacy",
      icon: Lock,
      color: "text-orange-500",
      action: () => console.log("Privacy clicked")
    },
    {
      id: "data-export",
      title: "Data Export",
      icon: BarChart3,
      color: "text-blue-500",
      action: () => console.log("Data Export clicked")
    },
    {
      id: "help-support",
      title: "Help & Support",
      icon: HelpCircle,
      color: "text-red-500",
      action: () => console.log("Help & Support clicked")
    },
    {
      id: "theme",
      title: "Theme",
      icon: Moon,
      color: "text-yellow-500",
      action: () => console.log("Theme clicked")
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-dark-card border-b border-border-gray dark:border-dark-border">
        <Button
          variant="ghost"
          onClick={() => onNavigateToTab("you")}
          className="text-deep-navy dark:text-dark-text hover:text-bright-blue dark:hover:text-bright-blue"
        >
          ← Back
        </Button>
        <h1 className="text-xl font-bold text-deep-navy dark:text-dark-text">Settings</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-4 space-y-4">
        {settingsOptions.map((option) => {
          const Icon = option.icon
          return (
            <button
              key={option.id}
              onClick={option.action}
              className="w-full flex items-center justify-between p-4 bg-white dark:bg-dark-card rounded-lg border border-border-gray dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-5 w-5 ${option.color}`} />
                <span className="text-deep-navy dark:text-dark-text font-medium">
                  {option.title}
                </span>
              </div>
              {option.id === "theme" ? (
                <Moon className="h-5 w-5 text-gray-400" />
              ) : (
                <span className="text-gray-400">›</span>
              )}
            </button>
          )
        })}

        {/* Logout Button */}
        <div className="pt-8">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full h-12 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
