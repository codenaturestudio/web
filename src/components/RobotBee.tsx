import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface RobotBeeProps {
  modelPath: string
}

export function RobotBee({ modelPath }: RobotBeeProps) {
  const group = useRef<THREE.Group>(null!)
  const { scene, animations } = useGLTF(modelPath)
  const { viewport, camera } = useThree()

  const mixer = useRef<THREE.AnimationMixer>()
  const velocity = useRef(new THREE.Vector3())
  const target = useRef(new THREE.Vector3())
  const time = useRef(0)
  const panic = useRef(0)

  // ✅ FIX 2 — scroll lives OUTSIDE React
  const scroll = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      scroll.current = window.scrollY
    }

    window.addEventListener('scroll', onScroll)

    camera.layers.enable(1)

    mixer.current = new THREE.AnimationMixer(scene)
    if (animations[0]) {
      const action = mixer.current.clipAction(animations[0])
      action.timeScale = 1.6
      action.play()
    }

    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const mesh = o as THREE.Mesh
        mesh.castShadow = true
        mesh.layers.set(1)

        const mat = (mesh.material as THREE.MeshStandardMaterial).clone()
        mat.emissive = new THREE.Color(0x88aa66)
        mat.emissiveIntensity = 0.28
        mat.envMapIntensity = 1.2
        mesh.material = mat
      }
    })

    return () => window.removeEventListener('scroll', onScroll)
  }, [scene, animations, camera])

  useFrame((state, delta) => {
    time.current += delta
    mixer.current?.update(delta)
    panic.current = Math.max(0, panic.current - delta)

    const mouseX = state.pointer.x
    const mouseY = state.pointer.y

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight
    const s = maxScroll > 0 ? scroll.current / maxScroll : 0

    /* 🧭 BASE PATH */
    target.current.set(
      Math.sin(s * Math.PI * 2) * viewport.width * 0.45 +
        Math.sin(time.current * 0.8) * viewport.width * 0.08,
      (s - 0.5) * viewport.height * 0.6 +
        Math.cos(time.current * 0.7) * 0.4,
      -3.5 +
        Math.sin(time.current * 0.9 + s * Math.PI) * 2.2
    )

    const panicBoost = panic.current > 0 ? 3 : 1
    velocity.current.addScaledVector(
      target.current.clone().sub(group.current.position),
      5 * panicBoost * delta
    )

    /* 🐝 CURSOR AVOIDANCE */
    const cursorWorld = new THREE.Vector3(
      mouseX * viewport.width * 0.5,
      mouseY * viewport.height * 0.5,
      group.current.position.z
    )

    const flee = group.current.position.clone().sub(cursorWorld)
    flee.z = 0

    const dist = flee.length()
    const radius = viewport.width * 0.4

    if (dist < radius) {
      flee.normalize()
      velocity.current.addScaledVector(
        flee,
        ((1 - dist / radius) ** 2) * 24 * panicBoost * delta
      )
    }

    velocity.current.multiplyScalar(0.82)
    group.current.position.addScaledVector(velocity.current, delta)

    /* 🐝 BODY MOTION */
    group.current.rotation.x = Math.sin(time.current * 0.5) * 0.12
    group.current.rotation.z = Math.sin(time.current * 0.6) * 0.12

    /* 🧭 LOOK WHERE MOVING */
    if (velocity.current.length() > 0.001) {
      const dir = velocity.current.clone().normalize()
      const yaw = Math.atan2(dir.x, dir.z)
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        yaw,
        0.18
      )
    }
  })

  return (
    <>
      {/* 🐝 BEE-ONLY LIGHTS */}
      <directionalLight
        position={[-2, 2, 3]}
        intensity={5}
        layers={1}
      />
      <pointLight
        position={[0, -1.5, -2]}
        intensity={5}
        layers={1}
      />

      <group
        ref={group}
        scale={0.2}
        layers={1}
        onPointerDown={(e) => {
          e.stopPropagation()
          panic.current = 1.2
        }}
      >
        <primitive object={scene} />
      </group>
    </>
  )
}
