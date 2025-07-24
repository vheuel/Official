import type React from "react"
import { Preloader } from "@/components/preloader"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
