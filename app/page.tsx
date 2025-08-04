"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export default function LoadingPage() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing CMPLAI...")

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: "Loading AI modules..." },
      { progress: 40, text: "Connecting to database..." },
      { progress: 60, text: "Preparing workspace..." },
      { progress: 80, text: "Finalizing setup..." },
      { progress: 100, text: "Welcome to CMPLAI!" },
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setProgress(loadingSteps[currentStep].progress)
        setLoadingText(loadingSteps[currentStep].text)
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          window.location.href = "/login"
        }, 500)
      }
    }, 600)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)] opacity-70"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)] opacity-70"></div>

      <div className="text-center space-y-8 z-10">
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="CMPLAI Logo"
            width={250}
            height={100}
            className="object-contain mx-auto animate-pulse"
          />
        </div>

        <div className="space-y-6">
          <div className="w-80 mx-auto">
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>

          <div className="space-y-2">
            <p className="text-white text-lg font-medium animate-pulse">{loadingText}</p>
            <p className="text-white/70 text-sm">LN Infosphere TechTransformers Pvt Ltd</p>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
