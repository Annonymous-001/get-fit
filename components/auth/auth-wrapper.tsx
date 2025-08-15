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
    return <>{children}</>
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
