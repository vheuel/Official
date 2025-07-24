"use client"

import { useEffect, useRef } from "react"

export const BackgroundParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load particles.js script
    const script = document.createElement("script")
    script.src = "/particles.min.js"
    script.async = true

    script.onload = () => {
      // Create canvas element
      const canvas = document.createElement("canvas")
      canvas.className = "particles-js-canvas-el"
      canvas.style.width = "100%"
      canvas.style.height = "100%"
      canvas.style.position = "absolute"
      canvas.style.top = "0"
      canvas.style.left = "0"
      canvas.style.zIndex = "-1"
      canvas.style.pointerEvents = "none"

      if (containerRef.current) {
        // Clear any existing canvas
        const existingCanvas = containerRef.current.querySelector("canvas")
        if (existingCanvas) {
          existingCanvas.remove()
        }

        // Add the canvas to the container
        containerRef.current.appendChild(canvas)

        // Initialize particles with the new configuration
        if (typeof window !== "undefined" && (window as any).particlesJS) {
          ;(window as any).particlesJS("particles", {
            particles: {
              number: {
                value: 80,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: ["#00f6b6", "#8393ff", "#428dff", "#F7931A", "#cfb66c", "#f0e4b1"], // Warna partikel
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#00f6b9",
                },
                polygon: {
                  nb_sides: 5,
                },
              },
              size: {
                value: 4, // Ukuran partikel
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false,
                },
              },
              opacity: {
                value: 1,
                random: false,
                anim: {
                  enable: false,
                  speed: 3,
                  opacity_min: 0.5,
                  sync: false,
                },
              },
              line_linked: {
                enable: true, // Mengaktifkan garis yang menghubungkan partikel
                distance: 150, // Jarak maksimum antara dua partikel agar garis dapat terbentuk
                color: "#00f6b6", // Warna garis
                opacity: 0.8, // Transparansi garis
                width: 1, // Lebar garis
              },
              move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true, // Matikan interaksi sentuhan
                },
                onclick: {
                  enable: false, // Matikan interaksi klik
                },
                resize: true,
              },
            },
            retina_detect: true,
          })
        }
      }
    }

    document.body.appendChild(script)

    return () => {
      // Clean up
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return <div id="particles" ref={containerRef} className="fixed inset-0 z-0" />
}
