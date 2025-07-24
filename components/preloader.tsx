"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export const Preloader = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time and then hide preloader
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      style={{ background: "linear-gradient(135deg, #428dff 5%, #8393ff 20%, #00f9b6 70%)" }}
    >
      <div className="relative flex flex-col items-center">
        <div className="w-32 h-32 md:w-48 md:h-48 relative animate-pulse">
          <Image src="/logo.png" alt="Block Logo" fill className="object-contain" />
        </div>
      </div>
    </div>
  )
}
