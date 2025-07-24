"use client"

import * as THREE from "three"
import { useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"

// Create a lightning effect component
const LightningEffect = ({
  startPoint,
  endPoint,
  opacity = 1,
  color = "#ffffff",
  segments = 5,
}: {
  startPoint: [number, number, number]
  endPoint: [number, number, number]
  opacity?: number
  color?: string
  segments?: number
}) => {
  const points = useMemo(() => {
    // Create a path from start to end with random zigzags
    const path = []
    path.push(new THREE.Vector3(startPoint[0], startPoint[1], startPoint[2]))

    // Add zigzag points in between
    for (let i = 1; i < segments; i++) {
      const t = i / segments
      const x = startPoint[0] + (endPoint[0] - startPoint[0]) * t
      const y = startPoint[1] + (endPoint[1] - startPoint[1]) * t
      const z = startPoint[2] + (endPoint[2] - startPoint[2]) * t

      // Add some random deviation for the lightning effect
      const randomOffset = 0.2
      path.push(
        new THREE.Vector3(
          x + (Math.random() - 0.5) * randomOffset,
          y + (Math.random() - 0.5) * randomOffset,
          z + (Math.random() - 0.5) * randomOffset,
        ),
      )
    }

    path.push(new THREE.Vector3(endPoint[0], endPoint[1], endPoint[2]))

    return path
  }, [startPoint, endPoint, segments])

  // Ref for line material to animate color
  const lineMaterialRef = useRef<THREE.LineBasicMaterial | null>(null)

  useFrame(({ clock }) => {
    if (lineMaterialRef.current) {
      const time = clock.getElapsedTime()
      // Calculate a dynamic rainbow color
      const r = Math.sin(time * 0.5) * 0.5 + 0.5
      const g = Math.sin(time * 0.5 + 2) * 0.5 + 0.5
      const b = Math.sin(time * 0.5 + 4) * 0.5 + 0.5
      lineMaterialRef.current.color.setRGB(r, g, b)
    }
  })

  return (
    <line>
      <bufferGeometry>
        <float32BufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial ref={lineMaterialRef} opacity={opacity} transparent={true} />
    </line>
  )
}

// Create a diamond shape component
const Diamond = () => {
  // Lightning effect states
  const [lightningPoints, setLightningPoints] = useState<
    { start: [number, number, number]; end: [number, number, number]; id: number }[]
  >([])
  const lightningTime = useRef(0)
  const lightningCount = useRef(0)

  // Create a diamond-style shape with proper diamond geometry
  const vertices = useMemo(() => {
    const verticesArray = []
    const size = 2.0 // Size of the diamond

    // Diamond geometry - classic cut diamond shape
    // Top point (crown)
    verticesArray.push(0, size, 0) // 0

    // Upper girdle (8 points around upper section)
    const upperRadius = size * 0.6
    const upperHeight = size * 0.3
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      verticesArray.push(Math.cos(angle) * upperRadius, upperHeight, Math.sin(angle) * upperRadius) // 1-8
    }

    // Main girdle (8 points around middle - widest part)
    const mainRadius = size * 0.8
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      verticesArray.push(Math.cos(angle) * mainRadius, 0, Math.sin(angle) * mainRadius) // 9-16
    }

    // Lower girdle (8 points around lower section)
    const lowerRadius = size * 0.4
    const lowerHeight = -size * 0.5
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      verticesArray.push(Math.cos(angle) * lowerRadius, lowerHeight, Math.sin(angle) * lowerRadius) // 17-24
    }

    // Bottom point (pavilion)
    verticesArray.push(0, -size, 0) // 25

    return verticesArray
  }, [])

  // Vertex positions for lightning effect
  const vertexPositions = useMemo(() => {
    const positions = []
    const numVertices = vertices.length / 3

    for (let i = 0; i < numVertices; i++) {
      positions.push([vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]] as [number, number, number])
    }

    return positions
  }, [vertices])

  // Create diamond faces
  const indices = useMemo(() => {
    const indicesArray: number[] = []

    // Crown facets (top to upper girdle)
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8
      indicesArray.push(0, i + 1, next + 1)
    }

    // Upper crown facets (upper girdle to main girdle)
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8
      // Two triangles per facet
      indicesArray.push(i + 1, i + 9, next + 1)
      indicesArray.push(next + 1, i + 9, next + 9)
    }

    // Pavilion facets (main girdle to lower girdle)
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8
      // Two triangles per facet
      indicesArray.push(i + 9, i + 17, next + 9)
      indicesArray.push(next + 9, i + 17, next + 17)
    }

    // Bottom facets (lower girdle to bottom point)
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8
      indicesArray.push(i + 17, 25, next + 17)
    }

    return indicesArray
  }, [])

  // Create edges for wireframe rendering
  const edges = useMemo(() => {
    const edgeIndices: number[] = []

    // Crown edges (top to upper girdle)
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8
      edgeIndices.push(0, i + 1)
      edgeIndices.push(i + 1, next + 1)
    }

    // Upper to main girdle edges
    for (let i = 0; i < 8; i++) {
      edgeIndices.push(i + 1, i + 9)
    }

    // Main girdle edges
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8
      edgeIndices.push(i + 9, next + 9)
    }

    // Main to lower girdle edges
    for (let i = 0; i < 8; i++) {
      edgeIndices.push(i + 9, i + 17)
    }

    // Lower girdle edges
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8
      edgeIndices.push(i + 17, next + 17)
    }

    // Lower girdle to bottom point
    for (let i = 0; i < 8; i++) {
      edgeIndices.push(i + 17, 25)
    }

    return new Uint16Array(edgeIndices)
  }, [])

  // List of edge connections for lightning
  const edgeConnections = useMemo(() => {
    const connections: [number, number][] = []

    // Crown connections
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8
      connections.push([0, i + 1])
      connections.push([i + 1, next + 1])
      connections.push([i + 1, i + 9])
    }

    // Main girdle connections
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8
      connections.push([i + 9, next + 9])
      connections.push([i + 9, i + 17])
    }

    // Lower connections
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8
      connections.push([i + 17, next + 17])
      connections.push([i + 17, 25])
    }

    return connections
  }, [])

  // Color animation refs
  const time = useRef(0)
  const lineMaterialRef = useRef<THREE.LineBasicMaterial | null>(null)

  useFrame((state, delta) => {
    // Rainbow color animation for wireframe
    time.current += delta

    if (lineMaterialRef.current) {
      // Calculate rainbow color
      const r = Math.sin(time.current * 2) * 0.5 + 0.5
      const g = Math.sin(time.current * 2 + 2) * 0.5 + 0.5
      const b = Math.sin(time.current * 2 + 4) * 0.5 + 0.5

      lineMaterialRef.current.color.setRGB(r, g, b)
    }

    // Lightning effect management
    lightningTime.current += delta

    // Create new lightning bolts
    if (lightningTime.current > 0.15 && Math.random() > 0.8) {
      lightningTime.current = 0

      // Get random edge for lightning effect
      const randomEdge = edgeConnections[Math.floor(Math.random() * edgeConnections.length)]
      const startVertexIndex = randomEdge[0]
      const endVertexIndex = randomEdge[1]

      // Create lightning between the vertices of this edge
      const newLightning = {
        start: vertexPositions[startVertexIndex],
        end: vertexPositions[endVertexIndex],
        id: lightningCount.current++,
      }

      // Add the new lightning
      setLightningPoints((prev) => [...prev, newLightning])

      // Remove the lightning after a short time
      setTimeout(() => {
        setLightningPoints((prev) => prev.filter((l) => l.id !== newLightning.id))
      }, 150)
    }
  })

  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <group>
      {/* Solid Diamond structure with facets */}
      <mesh ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={vertices.length / 3}
            array={new Float32Array(vertices)}
            itemSize={3}
          />
          <bufferAttribute attach="index" count={indices.length} array={new Uint16Array(indices)} itemSize={1} />
        </bufferGeometry>
        <meshStandardMaterial color="#e6f3ff" metalness={0.1} roughness={0} transparent={true} opacity={0.3} />
      </mesh>

      {/* Wireframe with rainbow color animation */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={vertices.length / 3}
            array={new Float32Array(vertices)}
            itemSize={3}
          />
          <bufferAttribute attach="index" count={edges.length} array={edges} itemSize={1} />
        </bufferGeometry>
        <lineBasicMaterial ref={lineMaterialRef} color="#ffffff" linewidth={3} />
      </lineSegments>

      {/* Lightning effects */}
      {lightningPoints.map((lightning) => (
        <LightningEffect
          key={lightning.id}
          startPoint={lightning.start}
          endPoint={lightning.end}
          opacity={0.9}
          color="#ffffff"
          segments={6}
        />
      ))}
    </group>
  )
}

export default Diamond
