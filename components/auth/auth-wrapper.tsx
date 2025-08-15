"use client"

import React, { useState } from "react"
import LoginPage from "./login-page"
import RegisterPage from "./register-page"

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)

  const handleLoginSuccess = (userData: any) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleRegisterSuccess = (userData: any) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  // If user is authenticated, show the main app
  if (isAuthenticated) {
    return (
      <div>
        {/* Add logout button to the main app */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
        {children}
      </div>
    )
  }

  // If user is not authenticated, show auth pages
  return (
    <>
      {authMode === "login" ? (
        <LoginPage
          onNavigateToRegister={() => setAuthMode("register")}
          onNavigateBack={() => {
            // This could be used to go back to a landing page
            console.log("Navigate back")
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <RegisterPage
          onNavigateToLogin={() => setAuthMode("login")}
          onNavigateBack={() => setAuthMode("login")}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
    </>
  )
}
