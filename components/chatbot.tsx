"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Send, Bot, User, Mic, MicOff, Volume2, Loader2, ChevronLeft, Camera, Lightbulb, BarChart3, Target } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  isVoice?: boolean
}

interface ChatbotProps {
  onClose: () => void
}

export default function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your GetFit AI assistant. How can I help you with your fitness journey today? You can type or hold the mic button to speak.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isVoiceSupported, setIsVoiceSupported] = useState(false)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const [quickActions] = useState([
    { text: "Log breakfast", icon: Lightbulb },
    { text: "Weekly progress", icon: BarChart3 },
    { text: "Set goals", icon: Target }
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check if speech recognition is supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsVoiceSupported(true)
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'en-US'
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInputValue(transcript)
          setIsListening(false)
        }
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }
        
        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [])

  const startVoiceRecognition = () => {
    if (recognitionRef.current && isVoiceSupported) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (error) {
        console.error('Error starting voice recognition:', error)
        setIsListening(false)
      }
    }
  }

  const stopVoiceRecognition = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleVoiceButtonMouseDown = () => {
    if (!isVoiceSupported) return
    
    setLongPressTimer(setTimeout(() => {
      startVoiceRecognition()
    }, 500))
  }

  const handleVoiceButtonMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
    
    if (isListening) {
      stopVoiceRecognition()
    }
  }

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("banana") || lowerMessage.includes("evening snack")) {
      return "✅ Logged banana for your evening snack!\n\n**Nutritional Info:**\n• Calories: 105\n• Carbs: 27g\n• Fiber: 3.1g\n• Potassium: 422mg\n• Vitamin B6: 20% DV\n\nGreat choice for sustained energy! 🍌💪"
    }

    if (lowerMessage.includes("summary") || lowerMessage.includes("meals") || lowerMessage.includes("7 days")) {
      return "📊 **7-Day Meal Summary**\n\n**Breakfast:** Average 320 calories\n**Lunch:** Average 450 calories\n**Dinner:** Average 380 calories\n**Snacks:** Average 150 calories\n\n**Total Weekly Average:** 1,300 calories/day\n\nYou're staying consistent with your nutrition goals! 🎯"
    }

    if (lowerMessage.includes("steps") || lowerMessage.includes("walking")) {
      return "Great question about steps! I can see you're at 5,400 steps today. To reach your 8,000 step goal, try taking a 20-minute walk - that's about 2,600 steps!"
    }

    if (lowerMessage.includes("water") || lowerMessage.includes("hydration")) {
      return "You're doing well with hydration! You've had 1,000ml today. Try setting reminders every 2 hours to reach your 3,000ml goal. 💧"
    }

    if (lowerMessage.includes("workout") || lowerMessage.includes("exercise")) {
      return "Based on your activity patterns, your peak energy is between 6-8 PM. Would you like me to suggest a quick 20-minute workout routine?"
    }

    if (lowerMessage.includes("sleep")) {
      return "Your sleep average is 7.4 hours - that's good! I notice better sleep correlates with improved mood in your data. Try maintaining a consistent bedtime routine."
    }

    if (lowerMessage.includes("goal") || lowerMessage.includes("target")) {
      return "You have 3 active goals right now. Your step goal is 67.5% complete! Would you like me to suggest a new challenge based on your progress?"
    }

    if (lowerMessage.includes("streak")) {
      return "Congratulations on your 12-day streak! 🔥 You're doing amazing. Keep it up to reach the 30-day milestone and unlock the Consistency King achievement!"
    }

    if (lowerMessage.includes("calories") || lowerMessage.includes("calorie")) {
      return "You've consumed 1,200 calories today with a target of 2,000. You're in a 200 calorie surplus, which is great for your goals! 🎯"
    }

    if (lowerMessage.includes("run") || lowerMessage.includes("running")) {
      return "I see you enjoy running! Your last run was 5.2km in 24:15. Would you like me to suggest a training plan to improve your pace?"
    }

    return "Hi! I'm your GetFit AI assistant. How can I help you with your fitness journey today? You can ask me about your progress, get workout suggestions, or tips for reaching your goals."
  }

    const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      isVoice: isListening,
    }

    const messageText = inputValue
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(messageText),
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
      <div className="fixed inset-0 z-50 bg-white dark:bg-dark-bg">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-dark-text">GetFit AI</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
            <div className="w-8"></div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border p-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-teal-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isListening && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border p-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Mic className="h-4 w-4 text-red-500 animate-pulse" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">Listening...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-dark-border">
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Camera className="h-5 w-5" />
              </Button>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message GetFit AI..."
                className="flex-1 bg-gray-100 dark:bg-dark-bg border-gray-200 dark:border-dark-border rounded-full"
                disabled={isTyping || isListening}
              />
              
              {/* Voice Button */}
              {isVoiceSupported && (
                <Button
                  onMouseDown={handleVoiceButtonMouseDown}
                  onMouseUp={handleVoiceButtonMouseUp}
                  onMouseLeave={() => {
                    if (longPressTimer) {
                      clearTimeout(longPressTimer)
                      setLongPressTimer(null)
                    }
                  }}
                  onTouchStart={handleVoiceButtonMouseDown}
                  onTouchEnd={handleVoiceButtonMouseUp}
                  disabled={isTyping}
                  variant="ghost"
                  size="icon"
                  className="text-gray-500"
                >
                  <Mic className="h-5 w-5" />
                </Button>
              )}
              
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping || isListening}
                variant="ghost"
                size="icon"
                className="text-gray-500"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex space-x-2 mt-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border rounded-full text-xs"
                  onClick={() => {
                    setInputValue(action.text)
                    handleSendMessage()
                  }}
                >
                  <action.icon className="h-3 w-3 mr-1" />
                  {action.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
