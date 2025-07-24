"use client"

import { Navigation } from "@/components/navigation"
import { MainContent } from "@/components/main-content"
import { Footer } from "@/components/footer"
import { BackgroundParticles } from "@/components/background-particles"
import { useEffect, useState } from "react"
import { TypedText } from "@/components/typed-text"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set isLoaded to true after preloader has finished
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <BackgroundParticles />
      <div
        className={`min-h-screen flex flex-col p-6 md:p-12 transition-opacity duration-500 relative z-10 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ background: "transparent" }}
      >
        <div className="flex flex-col space-y-6 md:flex-row md:justify-between md:items-start md:space-y-0 mb-8 md:mb-16">
          <TypedText />
          <Navigation />
        </div>
        <MainContent />
        <Footer />
      </div>
    </>
  )
}
