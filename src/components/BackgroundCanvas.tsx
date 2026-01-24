import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { RobotBee } from './RobotBee'

/* ===================== PARTICLES ===================== */

interface ParticleSystemProps {
  count?: number
}

function Particles({ count = 500 }: ParticleSystemProps) {
  const mesh = useRef<THREE.Points>(null)
  const baseY = useRef<Float32Array>(new Float32Array(count))

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const goldColor = new THREE.Color('#c9a227')
    const greenColor = new THREE.Color('#2d5a27')
    const neonGreen = new THREE.Color('#22c55e')

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 8
      const height = Math.random() * 12 - 4

      const i3 = i * 3
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = height
      positions[i3 + 2] = Math.sin(angle) * radius - 5

      baseY.current[i] = height // ✅ exact mapping

      const colorMix = Math.random()
      const color =
        colorMix < 0.3 ? goldColor : colorMix < 0.6 ? neonGreen : greenColor

      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 3 + 1
    }

    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return

    const positions =
      mesh.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime * 0.1

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      let y =
        baseY.current[i] +
        Math.sin(time + i * 0.1) * 0.2

      // ✅ correct wrap that stays stable
      if (y > 8) {
        y = -4
        baseY.current[i] = -4
      }

      positions[i3 + 1] = y
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = time * 0.05
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particles.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ===================== CIRCUIT LINES ===================== */

function CircuitLines() {
  const linesRef = useRef<THREE.Group>(null)

  const lines = useMemo(() => {
    const data: { points: THREE.Vector3[]; color: string }[] = []

    for (let i = 0; i < 12; i++) {
      const startAngle = (i / 12) * Math.PI * 2
      const points: THREE.Vector3[] = []

      let x = Math.cos(startAngle) * 3
      let y = -5
      let z = Math.sin(startAngle) * 3 - 5

      for (let j = 0; j < 20; j++) {
        points.push(new THREE.Vector3(x, y, z))

        x *= 0.95
        z = (z + 5) * 0.95 - 5
        y += 0.5

        x += (Math.random() - 0.5) * 0.2
        z += (Math.random() - 0.5) * 0.2
      }

      data.push({
        points,
        color: i % 3 === 0 ? '#c9a227' : '#22c55e'
      })
    }

    return data
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(
                  line.points.flatMap((p) => [p.x, p.y, p.z])
                ),
                3
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={line.color}
            transparent
            opacity={0.4}
          />
        </line>
      ))}
    </group>
  )
}

/* ===================== GLOWING ORBS ===================== */

function GlowingOrbs() {
  const orbsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!orbsRef.current) return
    orbsRef.current.children.forEach((orb, i) => {
      orb.position.y +=
        Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002
    })
  })

  return (
    <group ref={orbsRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 2 + Math.random() * 2

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.random() * 4 - 1,
              Math.sin(angle) * radius - 5
            ]}
          >
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? '#c9a227' : '#22c55e'}
              transparent
              opacity={0.9}
            />
          </mesh>
        )
      })}
    </group>
  )
}

/* ===================== BACKGROUND CANVAS ===================== */

export default function BackgroundCanvas() {
  // const [scrollPos, setScrollPos] = useState(0)

  // useEffect(() => {
  //   const onScroll = () => setScrollPos(window.scrollY)
  //   window.addEventListener('scroll', onScroll)
  //   return () => window.removeEventListener('scroll', onScroll)
  // }, [])

  const scrollPos = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      scrollPos.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed inset-0 -z-0 pointer-events-none">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center top, transparent 0%, hsl(120 25% 8%) 70%),
            radial-gradient(ellipse at center bottom, hsl(120 30% 6%) 0%, transparent 50%)
          `
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        eventSource={document.body}
        eventPrefix="client"
        style={{
          background:
            'linear-gradient(to bottom, hsl(120, 25%, 8%), hsl(120, 30%, 4%))'
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#c9a227" />
        <pointLight position={[0, -5, 0]} intensity={0.3} color="#22c55e" />

        <Particles count={400} />
        <CircuitLines />
        <GlowingOrbs />

        {/* 🐝 Robot Bee integrated into the SAME scene */}
        <RobotBee
          modelPath="/robot_bee.glb"
        />
      </Canvas>
    </div>
  )
}
