import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
}

function ParticleSystem({ count = 2000 }: ParticleSystemProps) {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y  
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
    }
    
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      
      // Animate individual particles
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i] * 0.01) * 0.002;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

interface ParticleBackgroundProps {
  className?: string;
}

export default function ParticleBackground({ className = '' }: ParticleBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ParticleSystem count={1500} />
        
        {/* Additional floating geometric shapes */}
        <mesh position={[-10, 5, -5]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial 
            color="#ff00ff" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
        
        <mesh position={[8, -3, -8]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <octahedronGeometry args={[0.8]} />
          <meshBasicMaterial 
            color="#00ff41" 
            transparent 
            opacity={0.2}
            wireframe
          />
        </mesh>
        
        <mesh position={[12, 8, -12]}>
          <torusGeometry args={[1, 0.3, 8, 16]} />
          <meshBasicMaterial 
            color="#ffff00" 
            transparent 
            opacity={0.25}
            wireframe
          />
        </mesh>
      </Canvas>
    </div>
  );
}