"use client"
import { useState, useEffect } from "react"

export const TypedText = () => {
  const strings = [
    "Artificial Intelligence",
    "Cryptocurrency",
    "Metaverse",
    "Blockchain",
    "Federated Universe",
    "Decentralized Network",
  ]

  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const typeSpeed = 110
    const deleteSpeed = 50
    const pauseTime = 1000

    const timeout = setTimeout(
      () => {
        const currentString = strings[currentStringIndex]

        if (!isDeleting) {
          // Typing
          if (currentText.length < currentString.length) {
            setCurrentText(currentString.substring(0, currentText.length + 1))
          } else {
            // Finished typing, start deleting after pause
            setTimeout(() => setIsDeleting(true), pauseTime)
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentString.substring(0, currentText.length - 1))
          } else {
            // Finished deleting, move to next string
            setIsDeleting(false)
            setCurrentStringIndex((prev) => (prev + 1) % strings.length)
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentStringIndex, strings])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="max-w-md py-4">
      <style jsx global>{`
        .typed-cursor {
          animation: blink 1s steps(1, end) infinite;
        }
        
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center justify-center md:justify-start">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-700 drop-shadow-sm transition-all duration-300 hover:drop-shadow-md">
          {currentText}
          <span className={`typed-cursor ${showCursor ? "opacity-100" : "opacity-0"}`}>_</span>
        </span>
      </h2>
    </div>
  )
}
