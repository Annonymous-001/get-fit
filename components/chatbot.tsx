"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatbotProps {
  onClose: () => void
}

export default function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your GetFit AI assistant. How can I help you with your fitness journey today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("steps") || lowerMessage.includes("walking")) {
      return "Great question about steps! I can see you're at 8,247 steps today. To reach your 10,000 step goal, try taking a 15-minute walk - that's about 1,500 steps!"
    }

    if (lowerMessage.includes("water") || lowerMessage.includes("hydration")) {
      return "You're doing well with hydration! You've had 6 cups today. Try setting reminders every 2 hours to reach your 8-cup goal. 💧"
    }

    if (lowerMessage.includes("workout") || lowerMessage.includes("exercise")) {
      return "Based on your activity patterns, your peak energy is between 6-8 PM. Would you like me to suggest a quick 20-minute workout routine?"
    }

    if (lowerMessage.includes("sleep")) {
      return "Your sleep average is 7.4 hours - that's good! I notice better sleep correlates with improved mood in your data. Try maintaining a consistent bedtime routine."
    }

    if (lowerMessage.includes("goal") || lowerMessage.includes("target")) {
      return "You have 3 active goals right now. Your step goal is 82% complete! Would you like me to suggest a new challenge based on your progress?"
    }

    if (lowerMessage.includes("streak")) {
      return "Congratulations on your 12-day streak! 🔥 You're doing amazing. Keep it up to reach the 30-day milestone and unlock the Consistency King achievement!"
    }

    return "I'm here to help with your fitness journey! You can ask me about your progress, get workout suggestions, or tips for reaching your goals. What would you like to know?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Interface */}
      <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
        <div className="w-full max-w-md h-[500px] flex flex-col">
          <Card className="flex-1 flex flex-col bg-white dark:bg-dark-card border border-border-gray dark:border-dark-border shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border-gray dark:border-dark-border bg-primary-gradient">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">GetFit AI</h3>
                  <p className="text-xs text-white/80">Your fitness assistant</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-primary-gradient text-white"
                        : "bg-light-gray dark:bg-dark-bg border border-border-gray dark:border-dark-border text-deep-navy dark:text-dark-text"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-bright-blue flex-shrink-0" />}
                      {message.sender === "user" && <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-light-gray dark:bg-dark-bg border border-border-gray dark:border-dark-border p-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-bright-blue" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-medium-gray rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-medium-gray rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-medium-gray rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border-gray dark:border-dark-border">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your fitness..."
                  className="flex-1 bg-light-gray dark:bg-dark-bg border-border-gray dark:border-dark-border"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-primary-gradient hover:opacity-90"
                  size="icon"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
