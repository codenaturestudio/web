import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
}

function Particles({ count = 500 }: ParticleSystemProps) {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const goldColor = new THREE.Color('#c9a227');
    const greenColor = new THREE.Color('#2d5a27');
    const neonGreen = new THREE.Color('#22c55e');
    
    for (let i = 0; i < count; i++) {
      // Spread particles in a cylinder/cone shape from bottom
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8;
      const height = Math.random() * 12 - 4;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 5;
      
      // Mix of gold and green colors
      const colorMix = Math.random();
      let color;
      if (colorMix < 0.3) {
        color = goldColor;
      } else if (colorMix < 0.6) {
        color = neonGreen;
      } else {
        color = greenColor;
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 3 + 1;
    }
    
    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime * 0.1;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Slow upward drift with gentle wave motion
      positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.002;
      
      // Reset particles that go too high
      if (positions[i3 + 1] > 8) {
        positions[i3 + 1] = -4;
      }
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.05;
  });

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
  );
}

function CircuitLines() {
  const linesRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const lineData: { points: THREE.Vector3[]; color: string }[] = [];
    
    // Create organic circuit-like paths flowing upward
    for (let i = 0; i < 12; i++) {
      const startAngle = (i / 12) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      
      let x = Math.cos(startAngle) * 3;
      let y = -5;
      let z = Math.sin(startAngle) * 3 - 5;
      
      for (let j = 0; j < 20; j++) {
        points.push(new THREE.Vector3(x, y, z));
        
        // Organic movement toward center as it rises
        const toCenter = 0.95;
        x *= toCenter;
        z = (z + 5) * toCenter - 5;
        y += 0.5;
        
        // Add slight randomness
        x += (Math.random() - 0.5) * 0.2;
        z += (Math.random() - 0.5) * 0.2;
      }
      
      const isGold = i % 3 === 0;
      lineData.push({ 
        points, 
        color: isGold ? '#c9a227' : '#22c55e'
      });
    }
    
    return lineData;
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(line.points.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={line.color}
            transparent
            opacity={0.4}
            linewidth={1}
          />
        </line>
      ))}
    </group>
  );
}

function GlowingOrbs() {
  const orbsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!orbsRef.current) return;
    orbsRef.current.children.forEach((orb, i) => {
      orb.position.y += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
    });
  });

  return (
    <group ref={orbsRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2 + Math.random() * 2;
        const isGold = i % 2 === 0;
        
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
              color={isGold ? '#c9a227' : '#22c55e'}
              transparent
              opacity={0.9}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 -z-10">
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
        style={{ background: 'linear-gradient(to bottom, hsl(120, 25%, 8%), hsl(120, 30%, 4%))' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#c9a227" />
        <pointLight position={[0, -5, 0]} intensity={0.3} color="#22c55e" />
        
        <Particles count={400} />
        <CircuitLines />
        <GlowingOrbs />
      </Canvas>
    </div>
  );
}
