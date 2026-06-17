import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import './ThreeLab.css'

function Core() {
  const group = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!group.current) return
    group.current.rotation.y = t * 0.35
    group.current.rotation.x = Math.sin(t * 0.6) * 0.12
  })

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.55}>
      <group ref={group}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.025, 32, 160]} />
          <meshStandardMaterial color="#00d5ff" emissive="#0066ff" emissiveIntensity={1.5} metalness={0.9} roughness={0.18} />
        </mesh>

        <mesh rotation={[1.2, 0.4, -0.8]}>
          <torusGeometry args={[1.55, 0.018, 32, 140]} />
          <meshStandardMaterial color="#65f4ff" emissive="#00a8ff" emissiveIntensity={1.2} metalness={0.9} roughness={0.18} />
        </mesh>

        <mesh>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial color="#0066ff" emissive="#00d5ff" emissiveIntensity={0.4} metalness={0.7} roughness={0.08} wireframe />
        </mesh>

        <mesh position={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.85, 0.85, 0.18, 6]} />
          <meshStandardMaterial color="#0A1A2F" emissive="#0066ff" emissiveIntensity={0.45} metalness={1} roughness={0.14} />
        </mesh>

        <group position={[0, 0, 0.28]}>
          <mesh position={[-0.26, 0, 0]}>
            <boxGeometry args={[0.15, 1, 0.12]} />
            <meshStandardMaterial color="#C0C6CF" emissive="#65f4ff" emissiveIntensity={0.35} metalness={1} roughness={0.12} />
          </mesh>

          <mesh position={[0.26, 0, 0]}>
            <boxGeometry args={[0.15, 1, 0.12]} />
            <meshStandardMaterial color="#C0C6CF" emissive="#65f4ff" emissiveIntensity={0.35} metalness={1} roughness={0.12} />
          </mesh>

          <mesh rotation={[0, 0, -0.55]}>
            <boxGeometry args={[0.16, 1.2, 0.12]} />
            <meshStandardMaterial color="#0066FF" emissive="#00d5ff" emissiveIntensity={0.9} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

export default function ThreeLab() {
  return (
   <main className="three-lab">
  <header className="lab-nav">
    <div className="lab-brand">
      <div className="lab-logo-mark">N</div>
      <div>
        <strong>NEXUMA</strong>
        <span>CONSULTING GROUP</span>
      </div>
    </div>

    <nav>
      <a>Servicios</a>
      <a>Método</a>
      <a>Soluciones</a>
      <a>Casos</a>
      <a>Contacto</a>
    </nav>

    <button className="nav-cta">Hablemos</button>
  </header>

<section className="lab-hero">
  <div className="lab-copy">
    <p className="eyebrow">NEXUMA 3D LAB</p>

    <h1>Construimos operación digital para negocios que escalan</h1>

    <p>
      CRM, IA, automatización, integraciones, web y tech talent en una experiencia digital premium.
    </p>

    <div className="lab-actions">
      <button>Solicitar diagnóstico</button>
      <button className="ghost">Explorar soluciones</button>
    </div>
  </div>

  <div className="lab-visual">
    <Canvas camera={{ position: [0, 0.4, 6], fov: 42 }} dpr={[1, 1.7]}>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={7} color="#00d5ff" />
      <pointLight position={[-4, -2, 3]} intensity={4} color="#0066ff" />
      <spotLight position={[0, 5, 5]} angle={0.45} penumbra={0.8} intensity={5} color="#ffffff" />

      <Core />

      <Sparkles count={100} scale={[5.8, 3.5, 3.5]} size={2.4} speed={0.4} color="#65f4ff" opacity={0.6} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>

    <div className="lab-platform"></div>

    <div className="lab-card card-left">
      <span>Agentes IA</span>
      <strong>24/7</strong>
      <small>Atención y análisis</small>
    </div>

    <div className="lab-card card-right">
      <span>Integraciones</span>
      <strong>API</strong>
      <small>Sistemas conectados</small>
    </div>
  </div>
</section>
    </main>
  )
}