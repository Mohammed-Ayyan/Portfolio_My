import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Float, Sparkles } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

/**
 * Central morphing chrome sculpture.
 * - Cursor influences subtle rotation
 * - Scroll progress drives distortion + scale + color drift
 */
function ChromeOrb({ scrollProgress, mouse }) {
  const meshRef = useRef(null);
  const innerRef = useRef(null);
  const matRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.18;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.current.y * 0.3,
        0.05
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        mouse.current.x * 0.2,
        0.05
      );
      const p = scrollProgress.current;
      // morph scale and position with scroll
      const targetScale = 1 + p * 0.15;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.08)
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        -p * 0.6,
        0.06
      );
    }
    if (matRef.current) {
      const p = scrollProgress.current;
      matRef.current.distort = 0.32 + Math.sin(state.clock.elapsedTime * 0.4) * 0.04 + p * 0.18;
      matRef.current.speed = 1.2 + p * 0.6;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.25;
      innerRef.current.rotation.y -= delta * 0.18;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer chrome sphere */}
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.35, 64]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#1a1a1f"
          metalness={1}
          roughness={0.18}
          distort={0.35}
          speed={1.2}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* Inner wireframe core */}
      <mesh ref={innerRef} scale={0.65}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#D97736" wireframe transparent opacity={0.35} />
      </mesh>
      {/* Subtle outer halo ring */}
      <mesh rotation={[Math.PI / 2.4, 0.3, 0]} scale={1.85}>
        <torusGeometry args={[1, 0.0035, 16, 200]} />
        <meshBasicMaterial color="#E8E8E3" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  const scrollProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / Math.max(1, h)));
    };
    const onMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  if (!ready) return null;

  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      data-testid="scene-3d-canvas"
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#0B0B0D"]} />
        <fog attach="fog" args={["#0B0B0D", 6, 14]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 4, 5]} intensity={1.6} color="#F5A623" />
        <directionalLight position={[-5, -2, -3]} intensity={0.8} color="#5b6a8a" />
        <pointLight position={[0, 0, 5]} intensity={0.6} color="#D97736" />

        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <ChromeOrb scrollProgress={scrollProgress} mouse={mouse} />
        </Float>

        <Sparkles
          count={80}
          scale={[8, 8, 4]}
          size={1.2}
          speed={0.25}
          opacity={0.5}
          color="#E8E8E3"
        />

        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  );
}
