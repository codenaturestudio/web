import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import cnsLogo from '@/assets/cns-logo.png';

interface CoinMeshProps {
  logoTexture: THREE.Texture;
  mouseRotationRef: React.MutableRefObject<number>;
}

function CoinMesh({ logoTexture, mouseRotationRef }: CoinMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [targetRotationX, setTargetRotationX] = useState(0);

  // Set initial three-quarter view rotation
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.PI * 0.25; // 45 degrees for three-quarter view
      groupRef.current.rotation.z = Math.PI * 0.1; // slight tilt for perspective
    }
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Smoothly interpolate to target flip rotation
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1;
      // Add mouse-controlled rotation
      groupRef.current.rotation.x += mouseRotationRef.current;
    }
  });

  const handleFlip = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setTargetRotationX(targetRotationX + Math.PI);
      setTimeout(() => setIsFlipping(false), 600);
    }
  };

  // Create cylinder geometry for coin
  const coinGeometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);

  // Material for the front face with logo
  const frontMaterial = new THREE.MeshStandardMaterial({
    map: logoTexture,
    metalness: 0.6,
    roughness: 0.3,
  });

  // Material for the back face (plain metallic)
  const backMaterial = new THREE.MeshStandardMaterial({
    color: '#d4af37',
    metalness: 0.8,
    roughness: 0.2,
  });

  return (
    <group ref={groupRef} onClick={handleFlip}>
      {/* Front face with logo */}
      <mesh position={[0, 0, 0.1]} geometry={coinGeometry} material={frontMaterial} />
      
      {/* Back face */}
      <mesh position={[0, 0, -0.1]} geometry={coinGeometry} material={backMaterial} />
      
      {/* Edge/rim */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.2, 32]} />
        <meshStandardMaterial
          color="#b8960f"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Rotation indicator text */}
      <Text position={[0, -2.5, 0]} fontSize={0.4} color="#d4af37" textAlign="center">
        Click to flip
      </Text>
    </group>
  );
}
export default function FlippableCoin() {
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseStartX, setMouseStartX] = useState(0);
  const mouseRotationRef = useRef(0);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(cnsLogo, (texture) => {
      setLogoTexture(texture);
      setLoading(false);
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsMouseDown(true);
      setMouseStartX(e.clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMouseDown) {
      const deltaX = e.clientX - mouseStartX;
      mouseRotationRef.current = deltaX * 0.005;
      setMouseStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    mouseRotationRef.current = 0;
  };

  if (loading || !logoTexture) {
    return (
      <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-primary/30 flex items-center justify-center">
        <div className="text-primary animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-primary/30 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} />
        <CoinMesh 
          logoTexture={logoTexture}
          mouseRotationRef={mouseRotationRef}
        />
      </Canvas>
    </div>
  );
}
