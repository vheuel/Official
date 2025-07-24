"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"
import Diamond from "./diamond"

export const MainContent = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]">
        <Canvas camera={{ position: [4, 4, 4], fov: 50 }} style={{ width: "100%", height: "100%" }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />

            <Diamond />

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              autoRotate={true}
              autoRotateSpeed={1.5}
              minDistance={3}
              maxDistance={8}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
