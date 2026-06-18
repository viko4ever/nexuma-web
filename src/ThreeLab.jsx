import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles, useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import './ThreeLab.css'

/*
  Cache bust para forzar que Chrome cargue el GLB actualizado.
*/
const MODEL_PATH = '/models/hero/nexuma-core.glb?v=nexuma-spin-v4'

function NexumaNOverlay() {
  const silver = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#E7F3FF',
    metalness: 1,
    roughness: 0.08,
    emissive: '#48BFFF',
    emissiveIntensity: 1.05,
    depthTest: false
  }), [])

  const blue = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0066FF',
    metalness: 0.9,
    roughness: 0.06,
    emissive: '#00A8FF',
    emissiveIntensity: 2.25,
    depthTest: false
  }), [])

  return (
    <group position={[0, 0.2, 1.02]} scale={0.72} renderOrder={999}>
      <mesh position={[-0.36, 0, 0]} renderOrder={999}>
        <boxGeometry args={[0.15, 1.1, 0.16]} />
        <primitive object={silver} attach="material" />
      </mesh>

      <mesh position={[0.36, 0, 0]} renderOrder={999}>
        <boxGeometry args={[0.15, 1.1, 0.16]} />
        <primitive object={silver} attach="material" />
      </mesh>

      {/* Diagonal corregida: antes estaba al revés y se leía como N volteada */}
      <mesh rotation={[0, 0, 0.58]} renderOrder={1000}>
        <boxGeometry args={[0.16, 1.28, 0.18]} />
        <primitive object={blue} attach="material" />
      </mesh>
    </group>
  )
}

function NexumaCoreModel() {
  const container = useRef()
  const sceneGroup = useRef()
  const { scene } = useGLTF(MODEL_PATH)

  const materials = useMemo(() => {
    return {
      dark: new THREE.MeshStandardMaterial({
        color: '#061226',
        metalness: 0.95,
        roughness: 0.16,
        emissive: '#001b55',
        emissiveIntensity: 0.2
      }),
      blue: new THREE.MeshStandardMaterial({
        color: '#0066FF',
        metalness: 0.75,
        roughness: 0.08,
        emissive: '#007CFF',
        emissiveIntensity: 1.45
      }),
      cyan: new THREE.MeshStandardMaterial({
        color: '#65F4FF',
        metalness: 0.35,
        roughness: 0.08,
        emissive: '#00D5FF',
        emissiveIntensity: 2.2
      }),
      glass: new THREE.MeshStandardMaterial({
        color: '#00A8FF',
        metalness: 0.05,
        roughness: 0.08,
        emissive: '#0066FF',
        emissiveIntensity: 0.28,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        side: THREE.DoubleSide
      }),
      platform: new THREE.MeshStandardMaterial({
        color: '#004CFF',
        metalness: 0.35,
        roughness: 0.16,
        emissive: '#003DFF',
        emissiveIntensity: 0.32,
        transparent: true,
        opacity: 0.24,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    }
  }, [])

  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.isMesh) return

      const name = obj.name.toLowerCase()
      obj.castShadow = true
      obj.receiveShadow = true
      obj.frustumCulled = false

      if (name.includes('platform_disc')) {
        obj.material = materials.platform
        obj.renderOrder = 5
      } else if (name.includes('platform')) {
        obj.material = materials.cyan
        obj.renderOrder = 6
      } else if (name.includes('wire_sphere') || name.includes('hologram')) {
        obj.material = materials.glass
        obj.renderOrder = 3
      } else if (name.includes('orbit') || name.includes('energy_node')) {
        obj.material = materials.cyan
        obj.renderOrder = 20
      } else if (name.includes('hex_base')) {
        obj.material = materials.dark
        obj.renderOrder = 9
      } else {
        obj.material = materials.blue
      }

      obj.material.needsUpdate = true
    })
  }, [scene, materials])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (container.current) {
      container.current.position.y = -0.08 + Math.sin(t * 1.05) * 0.04
      container.current.rotation.x = 0.04 + Math.sin(t * 0.45) * 0.03
    }

    if (sceneGroup.current) {
      // El mundo/anillos sí giran; la N overlay se queda de frente.
      sceneGroup.current.rotation.y = t * 0.38
      sceneGroup.current.rotation.z = Math.sin(t * 0.35) * 0.035
    }
  })

  return (
    <Float speed={1.05} rotationIntensity={0.08} floatIntensity={0.25}>
      <group ref={container} scale={0.74} position={[0, -0.04, 0]}>
        <group ref={sceneGroup}>
          <primitive object={scene} />
        </group>
        <NexumaNOverlay />
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
          <Canvas
            camera={{ position: [0, 0.42, 7.1], fov: 37 }}
            dpr={[1, 1.7]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              toneMapping: THREE.NoToneMapping,
              outputColorSpace: THREE.SRGBColorSpace
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0)
            }}
          >
            <ambientLight intensity={0.75} />
            <hemisphereLight skyColor="#65F4FF" groundColor="#050B14" intensity={0.9} />
            <pointLight position={[3.8, 3.5, 4.5]} intensity={9} color="#00D5FF" />
            <pointLight position={[-4, -2, 3]} intensity={6} color="#0066FF" />
            <pointLight position={[0, 0, 4]} intensity={4} color="#FFFFFF" />
            <spotLight position={[0, 5, 6]} angle={0.48} penumbra={0.8} intensity={7} color="#FFFFFF" />

            <NexumaCoreModel />

            <Sparkles
              count={110}
              scale={[5.8, 3.5, 3.5]}
              size={2.1}
              speed={0.32}
              color="#65f4ff"
              opacity={0.58}
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
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

useGLTF.preload(MODEL_PATH)
