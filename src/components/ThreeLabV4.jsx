
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sparkles, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import './ThreeLabV4.css'

const MODEL_PATH = '/models/hero/nexuma-core.glb?v=nexuma-v4-launch'

const layers = [
  ['01 / CRM CORE', 'Salesforce como núcleo operativo', 'Clientes, casos, ventas, servicio, gobierno y datos en una arquitectura CRM lista para escalar.'],
  ['02 / AI AGENTS', 'Agentes IA conectados a la operación', 'Atención, análisis, seguimiento y decisiones repetitivas automatizadas dentro del flujo real del negocio.'],
  ['03 / AUTOMATION', 'Procesos que se ejecutan sin fricción', 'Aprobaciones, alertas, tareas y rutas operativas convertidas en flujos medibles y controlados.'],
  ['04 / API MESH', 'Sistemas conectados como una sola capa', 'APIs, datos, plataformas y aplicaciones integradas para eliminar silos operativos.'],
  ['05 / WEB EXPERIENCE', 'Experiencias digitales con percepción premium', 'Sitios, apps, portales y dashboards que elevan marca y habilitan operación real.'],
  ['06 / TECH TALENT', 'Squads técnicos para ejecutar roadmap', 'Talento especializado para construir, operar y evolucionar tu plataforma tecnológica.']
]

const modules = [
  ['CRM', 'Salesforce 360', 'Implementación, evolución, automatización y gobierno CRM.'],
  ['AI', 'AI Agents Pack', 'Agentes para soporte, ventas, análisis y operación.'],
  ['AUTO', 'Automation Pack', 'Flujos, aprobaciones, alertas y procesos controlados.'],
  ['API', 'Integration Pack', 'APIs, conectores, rutas de datos y sincronización.'],
  ['WEB', 'Web & Apps Pack', 'Sitios premium, apps, portales y dashboards.'],
  ['TEAM', 'Tech Talent Pack', 'Squads técnicos para acelerar ejecución.']
]

function useProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = Math.max(1, rect.height - window.innerHeight)
      setProgress(Math.min(1, Math.max(0, -rect.top / total)))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])

  return progress
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ScreenField() {
  return (
    <div className="screen-field" aria-hidden="true">
      <span className="diagonal one" />
      <span className="diagonal two" />
      <span className="diagonal three" />
      <span className="sweep" />
    </div>
  )
}

function Rig({ progress = 0, variant = 'hero' }) {
  const { camera } = useThree()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const z = variant === 'hero' ? 7.1 : 7.7 - progress * 1
    const x = variant === 'hero' ? 0.55 : Math.sin(progress * Math.PI) * 0.35
    const y = variant === 'hero' ? 0.16 : 0.18 + progress * 0.2
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x + Math.sin(t * .25) * .02, .045)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, .045)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, z, .045)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function NMark() {
  const white = '#EAF6FF'
  return (
    <group position={[0, .05, 1.02]} scale={.62}>
      <mesh position={[-.36, 0, 0]}>
        <boxGeometry args={[.15, 1.1, .16]} />
        <meshStandardMaterial color={white} metalness={1} roughness={.08} emissive="#65F4FF" emissiveIntensity={.55} depthTest={false} />
      </mesh>
      <mesh position={[.36, 0, 0]}>
        <boxGeometry args={[.15, 1.1, .16]} />
        <meshStandardMaterial color={white} metalness={1} roughness={.08} emissive="#65F4FF" emissiveIntensity={.55} depthTest={false} />
      </mesh>
      <mesh rotation={[0, 0, .58]}>
        <boxGeometry args={[.16, 1.28, .18]} />
        <meshStandardMaterial color="#0066FF" metalness={.9} roughness={.06} emissive="#00A8FF" emissiveIntensity={1.45} depthTest={false} />
      </mesh>
    </group>
  )
}

function Satellite({ index, progress }) {
  const ref = useRef()
  const color = index % 2 ? '#0066FF' : '#65F4FF'
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const a = index * 1.047 + t * .11 + progress * 2.2
    const r = 1.15 + progress * .85
    if (ref.current) {
      ref.current.position.set(Math.cos(a) * r, Math.sin(a) * r * .52, Math.sin(a * 1.25) * .35)
      ref.current.rotation.y = t * .8
    }
  })
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[.046 + progress * .018, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.35} metalness={.55} roughness={.18} />
    </mesh>
  )
}

function Core({ progress = 0, variant = 'hero' }) {
  const root = useRef()
  const model = useRef()
  const { scene } = useGLTF(MODEL_PATH)

  const mat = useMemo(() => ({
    dark: new THREE.MeshStandardMaterial({ color: '#020508', metalness: .92, roughness: .2, emissive: '#00172c', emissiveIntensity: .12 }),
    blue: new THREE.MeshStandardMaterial({ color: '#0066FF', metalness: .8, roughness: .08, emissive: '#0066FF', emissiveIntensity: .85 }),
    cyan: new THREE.MeshStandardMaterial({ color: '#65F4FF', metalness: .35, roughness: .08, emissive: '#65F4FF', emissiveIntensity: 1.1 }),
    glass: new THREE.MeshStandardMaterial({ color: '#65F4FF', transparent: true, opacity: .052, depthWrite: false, side: THREE.DoubleSide, emissive: '#0066FF', emissiveIntensity: .12 })
  }), [])

  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.isMesh) return
      const name = obj.name.toLowerCase()
      obj.frustumCulled = false
      if (name.includes('wire_sphere') || name.includes('hologram')) obj.material = mat.glass
      else if (name.includes('orbit') || name.includes('platform') || name.includes('energy_node')) obj.material = mat.cyan
      else if (name.includes('hex_base')) obj.material = mat.dark
      else obj.material = mat.blue
      obj.material.needsUpdate = true
    })
  }, [scene, mat])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const base = variant === 'hero' ? .86 : .66
    if (root.current) {
      root.current.scale.setScalar(base + progress * .1)
      root.current.position.y = Math.sin(t * .72) * .035
      root.current.rotation.x = .035 + progress * .09
    }
    if (model.current) {
      model.current.rotation.y = t * .23 + progress * 1.5
      model.current.rotation.z = Math.sin(t * .28) * .024
    }
  })

  return (
    <group ref={root}>
      <group ref={model}><primitive object={scene} /></group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.85 + progress * .42, .0045, 8, 220]} />
        <meshStandardMaterial color="#65F4FF" emissive="#65F4FF" emissiveIntensity={.45} transparent opacity={.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2.15, .34, .5]}>
        <torusGeometry args={[1.32 + progress * .58, .0035, 8, 180]} />
        <meshStandardMaterial color="#0066FF" emissive="#0066FF" emissiveIntensity={.52} transparent opacity={.22} />
      </mesh>
      {[0,1,2,3,4,5].map(i => <Satellite key={i} index={i} progress={progress} />)}
      <NMark />
    </group>
  )
}

function CoreCanvas({ progress = 0, variant = 'hero' }) {
  return (
    <Canvas
      camera={{ position: [variant === 'hero' ? .55 : 0, .18, variant === 'hero' ? 7.1 : 7.7], fov: variant === 'hero' ? 32 : 33 }}
      dpr={[1, 1.65]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.NoToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Rig progress={progress} variant={variant} />
      <ambientLight intensity={.32} />
      <hemisphereLight skyColor="#65F4FF" groundColor="#020508" intensity={.5} />
      <pointLight position={[3.8,3.2,4]} intensity={4.3} color="#65F4FF" />
      <pointLight position={[-3.2,-2,3]} intensity={2.8} color="#0066FF" />
      <Core progress={progress} variant={variant} />
      <Sparkles count={variant === 'hero' ? 54 : 42} scale={[5.8,3.4,3.2]} size={.72} speed={.13} color="#65F4FF" opacity={.22} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  )
}

function Nav() {
  return (
    <header className="v4-nav">
      <div className="v4-brand">
        <div className="brand-mark">N</div>
        <div><strong>NEXUMA</strong><span>OPERATING SYSTEM</span></div>
      </div>
      <nav><a href="#system">Sistema</a><a href="#modules">Módulos</a><a href="#method">Método</a><a href="#contact">Contacto</a></nav>
      <button>Diagnóstico</button>
    </header>
  )
}

function Hero() {
  return (
    <section className="v4-hero">
      <div className="hero-copy">
        <p className="kicker">SALESFORCE / AI / AUTOMATION / API MESH</p>
        <h1>NEXUMA Operating System</h1>
        <p>Construimos la capa operativa digital para empresas que escalan: CRM, IA, automatización, integraciones, experiencia web y talento tecnológico en un solo sistema.</p>
        <div className="hero-actions"><button>Solicitar diagnóstico <span>→</span></button><button className="secondary">Explorar el sistema <span>→</span></button></div>
      </div>
      <div className="hero-system-card"><span>CORE STATUS</span><strong>ONLINE</strong><small>CRM + AI + API + OPS</small></div>
      <div className="hero-visual"><CoreCanvas variant="hero" /></div>
    </section>
  )
}

function SystemStory() {
  const ref = useRef(null)
  const progress = useProgress(ref)
  const active = Math.min(layers.length - 1, Math.floor(progress * layers.length))

  return (
    <section className="system-story" id="system" ref={ref}>
      <div className="story-sticky">
        <div className="story-left">
          <p className="kicker">SCROLL / SYSTEM UNFOLD</p>
          <h2>Una arquitectura operativa, seis capas de ejecución.</h2>
          <div className="story-progress"><i style={{ transform: `scaleX(${Math.max(.04, progress)})` }} /></div>
        </div>
        <div className="story-center"><CoreCanvas variant="story" progress={progress} /></div>
        <div className="story-right">
          {layers.map((layer, index) => (
            <div key={layer[0]} className={`story-layer ${index === active ? 'active' : ''}`}>
              <span>{layer[0]}</span><h3>{layer[1]}</h3><p>{layer[2]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Modules() {
  return (
    <section className="v4-section" id="modules">
      <Reveal className="section-heading"><span>02 / MODULES</span><h2>Soluciones como módulos de infraestructura.</h2><p>El catálogo se presenta como capacidades configurables, no como servicios sueltos.</p></Reveal>
      <div className="module-grid">
        {modules.map(([code, title, text], index) => (
          <Reveal key={title} delay={index * .045} className="module-card">
            <div className="module-cover"><span>{code}</span><i /></div><h3>{title}</h3><p>{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Method() {
  return (
    <section className="v4-section" id="method">
      <Reveal className="section-heading"><span>03 / METHOD</span><h2>De diagnóstico a operación continua.</h2></Reveal>
      <div className="method-grid">
        {['Diagnóstico','Arquitectura','Construcción','Integración','Medición','Evolución'].map((item, index) => (
          <Reveal key={item} delay={index * .05} className="method-card"><span>{String(index + 1).padStart(2,'0')}</span><h3>{item}</h3><p>Control de alcance, diseño técnico, ejecución y mejora continua para evitar improvisación.</p></Reveal>
        ))}
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <Reveal><span>NEXUMA://READY_TO_DEPLOY</span><h2>Tu empresa no necesita más herramientas sueltas.</h2><p>Necesita una arquitectura operativa que conecte, automatice, mida y ejecute.</p><div className="hero-actions"><button>Agenda una sesión <span>→</span></button><button className="secondary">Hablemos por WhatsApp <span>→</span></button></div></Reveal>
    </section>
  )
}

export default function ThreeLabV4() {
  return <main className="nexuma-v4"><ScreenField /><Nav /><Hero /><SystemStory /><Modules /><Method /><FinalCTA /></main>
}

useGLTF.preload(MODEL_PATH)
