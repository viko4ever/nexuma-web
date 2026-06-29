import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sparkles, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import './ThreeLabV4.css'

const MODEL_PATH = '/models/hero/nexuma-core.glb?v=nexuma-v4-launch'

const layers = [
  {
    code: '01',
    label: 'CRM CORE',
    title: 'Salesforce como núcleo operativo',
    text: 'Clientes, casos, ventas, servicio, gobierno y datos en una arquitectura CRM lista para escalar.',
  },
  {
    code: '02',
    label: 'AI AGENTS',
    title: 'Agentes IA conectados a la operación',
    text: 'Atención, análisis, seguimiento y decisiones repetitivas automatizadas dentro del flujo real del negocio.',
  },
  {
    code: '03',
    label: 'AUTOMATION',
    title: 'Procesos que se ejecutan sin fricción',
    text: 'Aprobaciones, alertas, tareas y rutas operativas convertidas en flujos medibles y controlados.',
  },
  {
    code: '04',
    label: 'API MESH',
    title: 'Sistemas conectados como una sola capa',
    text: 'APIs, datos, plataformas y aplicaciones integradas para eliminar silos operativos.',
  },
  {
    code: '05',
    label: 'WEB EXPERIENCE',
    title: 'Experiencias digitales con percepción premium',
    text: 'Sitios, apps, portales y dashboards que elevan marca y habilitan operación real.',
  },
  {
    code: '06',
    label: 'TECH SQUADS',
    title: 'Squads técnicos para ejecutar roadmap',
    text: 'Talento especializado para construir, operar y evolucionar tu plataforma tecnológica.',
  },
]

const modules = [
  {
    type: 'crm',
    category: 'CRM CORE',
    title: 'Salesforce 360',
    description: 'Implementación, evolución, automatización y gobierno CRM para ventas, servicio y operación.',
    tags: ['Sales Cloud', 'Service Cloud', 'Flows', 'Reports', 'Governance'],
  },
  {
    type: 'ai',
    category: 'AI AGENTS',
    title: 'AI Agents Pack',
    description: 'Agentes para soporte, ventas, seguimiento, análisis y operación conectados al flujo real del negocio.',
    tags: ['Support Agent', 'Sales Assistant', 'Follow-up', 'Insights', 'Knowledge'],
  },
  {
    type: 'auto',
    category: 'AUTOMATION',
    title: 'Automation Pack',
    description: 'Flujos, aprobaciones, alertas y procesos controlados para reducir fricción operativa.',
    tags: ['Approvals', 'Alerts', 'Routing', 'SLAs', 'Tasks'],
  },
  {
    type: 'api',
    category: 'API MESH',
    title: 'Integration Pack',
    description: 'APIs, conectores, rutas de datos y sincronización entre plataformas empresariales.',
    tags: ['APIs', 'Connectors', 'Sync', 'Middleware', 'Data Routes'],
  },
  {
    type: 'web',
    category: 'WEB EXPERIENCE',
    title: 'Web & Apps Pack',
    description: 'Sitios premium, apps, portales y dashboards conectados a objetivos de negocio.',
    tags: ['Websites', 'Apps', 'Portals', 'Dashboards', 'UX/UI'],
  },
  {
    type: 'team',
    category: 'TECH SQUADS',
    title: 'Tech Talent Pack',
    description: 'Squads técnicos para acelerar entregas con perfiles especializados y ejecución controlada.',
    tags: ['Salesforce Dev', 'Frontend', 'Backend', 'QA', 'PM / Architect'],
  },
]


const moduleCatalogs = {
  crm: {
    subtitle: 'Paquetes para CRM, Salesforce y operación comercial.',
    tiers: [
      {
        name: 'Nexuma Starter',
        items: ['Discovery funcional y blueprint CRM', 'Setup base de Sales / Service Cloud', 'Dashboards y flujo inicial de seguimiento'],
      },
      {
        name: 'Nexuma Premium',
        items: ['Automatizaciones, reportes y rutas operativas', 'Gobierno de datos y diseño de objetos', 'UAT, documentación y evolución inicial'],
      },
      {
        name: 'Nexuma Platinium',
        items: ['Arquitectura multiárea y gobierno CRM', 'Integraciones, IA y analítica avanzada', 'Roadmap evolutivo y soporte estratégico'],
      },
    ],
  },
  ai: {
    subtitle: 'Paquetes para agentes IA y operación asistida.',
    tiers: [
      {
        name: 'Nexuma Starter',
        items: ['1 agente enfocado a soporte o seguimiento', 'Base de conocimiento y prompts operativos', 'Métricas iniciales de uso y desempeño'],
      },
      {
        name: 'Nexuma Premium',
        items: ['Agentes por proceso con contexto CRM', 'Escalamiento humano y flujos de aprobación', 'Panel de insights y calidad de respuesta'],
      },
      {
        name: 'Nexuma Platinium',
        items: ['Orquestación multiagente por área', 'Gobierno, seguridad y trazabilidad', 'Integración profunda con operación y datos'],
      },
    ],
  },
  auto: {
    subtitle: 'Paquetes para automatización, SLAs y control operativo.',
    tiers: [
      {
        name: 'Nexuma Starter',
        items: ['Flujos críticos de aprobación y alertas', 'Automatización de tareas repetitivas', 'Matriz inicial de reglas y excepciones'],
      },
      {
        name: 'Nexuma Premium',
        items: ['Rutas operativas multiárea', 'SLAs, notificaciones y tableros de control', 'QA funcional y optimización continua'],
      },
      {
        name: 'Nexuma Platinium',
        items: ['Automatización enterprise de punta a punta', 'Gobierno, auditoría y trazabilidad avanzada', 'Integración con CRM, IA y ecosistema completo'],
      },
    ],
  },
  api: {
    subtitle: 'Paquetes para integración de sistemas y sincronización de datos.',
    tiers: [
      {
        name: 'Nexuma Starter',
        items: ['Mapa de integraciones prioritarias', 'Conectores base y sincronización inicial', 'Modelo de datos y validaciones básicas'],
      },
      {
        name: 'Nexuma Premium',
        items: ['API mesh, middleware y eventos', 'Monitoreo de errores y trazabilidad', 'Integración con dashboards y operación'],
      },
      {
        name: 'Nexuma Platinium',
        items: ['Arquitectura enterprise de integración', 'Alta disponibilidad, seguridad y gobierno', 'Estrategia evolutiva de ecosistema digital'],
      },
    ],
  },
  web: {
    subtitle: 'Paquetes para sitios, apps, portales y dashboards premium.',
    tiers: [
      {
        name: 'Nexuma Starter',
        items: ['Sitio o portal base orientado a negocio', 'UX/UI alineado al branding', 'Integración con formularios y analítica inicial'],
      },
      {
        name: 'Nexuma Premium',
        items: ['Experiencias premium con módulos funcionales', 'Dashboards, portal cliente o app operativa', 'Optimización responsive y rendimiento'],
      },
      {
        name: 'Nexuma Platinium',
        items: ['Experiencia digital de alto impacto', 'Integración con CRM, IA y operación real', 'Arquitectura escalable y gobierno evolutivo'],
      },
    ],
  },
  team: {
    subtitle: 'Paquetes para squads técnicos y capacidad de ejecución.',
    tiers: [
      {
        name: 'Nexuma Starter',
        items: ['Talento clave para proyectos específicos', 'Onboarding rápido y objetivos de sprint', 'Seguimiento operativo y comunicación base'],
      },
      {
        name: 'Nexuma Premium',
        items: ['Squad multidisciplinario dedicado', 'Cadencia de entrega, QA y liderazgo técnico', 'Planeación táctica y soporte evolutivo'],
      },
      {
        name: 'Nexuma Platinium',
        items: ['Escuadrón extendido con liderazgo estratégico', 'Cobertura end-to-end de delivery', 'Gobierno, métricas y escalamiento continuo'],
      },
    ],
  },
}

const methodSteps = [
  ['01', 'Diagnóstico', 'Mapeamos fricciones, sistemas, datos, automatizaciones existentes y oportunidades de impacto rápido.'],
  ['02', 'Arquitectura', 'Diseñamos las capas de CRM, IA, automatización, integraciones, experiencia digital y gobierno.'],
  ['03', 'Construcción', 'Ejecutamos con backlog, ciclos controlados, componentes reutilizables, QA y trazabilidad.'],
  ['04', 'Integración', 'Conectamos aplicaciones, APIs, datos y flujos para convertir sistemas aislados en operación continua.'],
  ['05', 'Medición', 'Publicamos indicadores, tableros, reglas de seguimiento y alertas para controlar resultados.'],
  ['06', 'Evolución', 'Iteramos mejoras, automatizaciones y nuevas capacidades conforme crece la madurez operativa.'],
]

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
    const z = variant === 'hero' ? 7.1 : 7.7 - progress
    const x = variant === 'hero' ? 0.55 : Math.sin(progress * Math.PI) * 0.35
    const y = variant === 'hero' ? 0.16 : 0.18 + progress * 0.2

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x + Math.sin(t * 0.25) * 0.02, 0.045)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.045)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, z, 0.045)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function NMark() {
  const white = '#EAF6FF'

  return (
    <group position={[0, 0.05, 1.02]} scale={0.62}>
      <mesh position={[-0.36, 0, 0]}>
        <boxGeometry args={[0.15, 1.1, 0.16]} />
        <meshStandardMaterial color={white} metalness={1} roughness={0.08} emissive="#65F4FF" emissiveIntensity={0.55} depthTest={false} />
      </mesh>
      <mesh position={[0.36, 0, 0]}>
        <boxGeometry args={[0.15, 1.1, 0.16]} />
        <meshStandardMaterial color={white} metalness={1} roughness={0.08} emissive="#65F4FF" emissiveIntensity={0.55} depthTest={false} />
      </mesh>
      <mesh rotation={[0, 0, 0.58]}>
        <boxGeometry args={[0.16, 1.28, 0.18]} />
        <meshStandardMaterial color="#0066FF" metalness={0.9} roughness={0.06} emissive="#00A8FF" emissiveIntensity={1.45} depthTest={false} />
      </mesh>
    </group>
  )
}

function Satellite({ index, progress }) {
  const ref = useRef()
  const color = index % 2 ? '#0066FF' : '#65F4FF'

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const a = index * 1.047 + t * 0.11 + progress * 2.2
    const r = 1.15 + progress * 0.85

    if (ref.current) {
      ref.current.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.52, Math.sin(a * 1.25) * 0.35)
      ref.current.rotation.y = t * 0.8
    }
  })

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.046 + progress * 0.018, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.35} metalness={0.55} roughness={0.18} />
    </mesh>
  )
}

function Core({ progress = 0, variant = 'hero' }) {
  const root = useRef()
  const model = useRef()
  const { scene } = useGLTF(MODEL_PATH)

  const mat = useMemo(() => ({
    dark: new THREE.MeshStandardMaterial({ color: '#020508', metalness: 0.92, roughness: 0.2, emissive: '#00172c', emissiveIntensity: 0.12 }),
    blue: new THREE.MeshStandardMaterial({ color: '#0066FF', metalness: 0.8, roughness: 0.08, emissive: '#0066FF', emissiveIntensity: 0.85 }),
    cyan: new THREE.MeshStandardMaterial({ color: '#65F4FF', metalness: 0.35, roughness: 0.08, emissive: '#65F4FF', emissiveIntensity: 1.1 }),
    glass: new THREE.MeshStandardMaterial({ color: '#65F4FF', transparent: true, opacity: 0.052, depthWrite: false, side: THREE.DoubleSide, emissive: '#0066FF', emissiveIntensity: 0.12 }),
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
    const base = variant === 'hero' ? 0.86 : 0.66

    if (root.current) {
      root.current.scale.setScalar(base + progress * 0.1)
      root.current.position.y = Math.sin(t * 0.72) * 0.035
      root.current.rotation.x = 0.035 + progress * 0.09
    }

    if (model.current) {
      model.current.rotation.y = t * 0.23 + progress * 1.5
      model.current.rotation.z = Math.sin(t * 0.28) * 0.024
    }
  })

  return (
    <group ref={root}>
      <group ref={model}><primitive object={scene} /></group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.85 + progress * 0.42, 0.0045, 8, 220]} />
        <meshStandardMaterial color="#65F4FF" emissive="#65F4FF" emissiveIntensity={0.45} transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2.15, 0.34, 0.5]}>
        <torusGeometry args={[1.32 + progress * 0.58, 0.0035, 8, 180]} />
        <meshStandardMaterial color="#0066FF" emissive="#0066FF" emissiveIntensity={0.52} transparent opacity={0.22} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => <Satellite key={i} index={i} progress={progress} />)}
      <NMark />
    </group>
  )
}

function CoreCanvas({ progress = 0, variant = 'hero' }) {
  return (
    <Canvas
      camera={{ position: [variant === 'hero' ? 0.55 : 0, 0.18, variant === 'hero' ? 7.1 : 7.7], fov: variant === 'hero' ? 32 : 33 }}
      dpr={[1, 1.65]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.NoToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Rig progress={progress} variant={variant} />
      <ambientLight intensity={0.32} />
      <hemisphereLight skyColor="#65F4FF" groundColor="#020508" intensity={0.5} />
      <pointLight position={[3.8, 3.2, 4]} intensity={4.3} color="#65F4FF" />
      <pointLight position={[-3.2, -2, 3]} intensity={2.8} color="#0066FF" />
      <Core progress={progress} variant={variant} />
      <Sparkles count={variant === 'hero' ? 54 : 42} scale={[5.8, 3.4, 3.2]} size={0.72} speed={0.13} color="#65F4FF" opacity={0.22} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  )
}

function Nav() {
  return (
    <header className="v4-nav">
      <a className="v4-brand" href="/" aria-label="Volver al selector Nexuma">
        <span className="brand-mark brand-mark-isotype" aria-hidden="true"><img src="/assets/nexuma/nexuma-isotype-transparent.png" alt="" /></span>
        <div>
          <strong>NEXUMA</strong>
          <span>CONSULTING GROUP</span>
        </div>
      </a>
      <nav aria-label="Navegación principal">
        <a href="#system">Sistema</a>
        <a href="#modules">Módulos</a>
        <a href="#catalogs">Catálogos</a>
        <a href="#method">Método</a>
        <a href="#contact">Contacto</a>
      </nav>
      <a className="nav-cta" href="https://wa.me/525515288533?text=Hola%20Nexuma%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20para%20mi%20empresa." target="_blank" rel="noreferrer">Diagnóstico</a>
    </header>
  )
}

function Hero() {
  return (
    <section className="v4-hero" id="top">
      <div className="hero-copy">
        <p className="kicker">SALESFORCE / AI / AUTOMATION / API MESH</p>
        <h1>Arquitectura tecnológica para operar, automatizar y escalar.</h1>
        <p>En Nexuma Consulting Group construimos la capa operativa digital para empresas que escalan: CRM, IA, automatización, integraciones, experiencia web y talento tecnológico en un solo sistema.</p>
        <div className="hero-actions">
          <a href="https://wa.me/525515288533?text=Hola%20Nexuma%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20para%20mi%20empresa." target="_blank" rel="noreferrer">Solicitar diagnóstico <span>→</span></a>
          <a className="secondary" href="#system">Explorar el sistema <span>→</span></a>
        </div>

        <div className="hero-proof-grid" aria-label="Capacidades principales de Nexuma">
          <article>
            <span>CRM</span>
            <strong>Salesforce Core</strong>
          </article>
          <article>
            <span>AI</span>
            <strong>Agentes operativos</strong>
          </article>
          <article>
            <span>OPS</span>
            <strong>Automatización medible</strong>
          </article>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-visual-shell" aria-hidden="true" />
        <div className="hero-core-wrap">
          <CoreCanvas variant="hero" />
        </div>

        <div className="hero-orchestration-card hero-orchestration-card-one" aria-hidden="true">
          <small>CRM READINESS</small>
          <strong>92%</strong>
          <i><b style={{ '--w': '92%' }} /></i>
        </div>

        <div className="hero-orchestration-card hero-orchestration-card-two" aria-hidden="true">
          <small>AI AGENTS</small>
          <strong>06</strong>
          <span>Support · Sales · Ops</span>
        </div>

        <div className="hero-system-card" aria-hidden="true">
          <span>CORE STATUS</span>
          <strong>ONLINE</strong>
          <small>CRM + AI + API + OPS</small>
        </div>

        <div className="hero-data-rail" aria-hidden="true">
          <span>API MESH</span>
          <i />
          <span>AUTOMATION</span>
          <i />
          <span>GOVERNANCE</span>
        </div>
      </div>
    </section>
  )
}

function SystemStory() {
  return (
    <section className="system-story" id="system">
      <div className="story-container">
        <Reveal className="section-heading system-heading">
          <span>01 / SYSTEM ARCHITECTURE</span>
          <h2>Una arquitectura operativa, seis capas de ejecución.</h2>
          <p>Cada capa conecta estrategia, datos, automatización y experiencia digital para que la operación avance con control, trazabilidad y velocidad.</p>
        </Reveal>

        <div className="system-layout">
          <Reveal className="system-map">
            <div className="system-gridline" />
            <div className="system-core">
              <small>NEXUMA</small>
              <strong>OS</strong>
              <span>Execution Core</span>
            </div>
            {layers.map((layer, index) => (
              <div className={`system-node system-node-${index + 1}`} key={layer.code} style={{ '--delay': `${index * 0.18}s` }}>
                <b>{layer.code}</b>
                <span>{layer.label}</span>
              </div>
            ))}
            <div className="system-orbit system-orbit-one" />
            <div className="system-orbit system-orbit-two" />
          </Reveal>

          <div className="layers-grid">
            {layers.map((layer, index) => (
              <Reveal key={layer.code} delay={index * 0.045} className="layer-card">
                <span className="n">{layer.code} / {layer.label}</span>
                <h3>{layer.title}</h3>
                <p>{layer.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ModuleVisual({ type }) {
  return (
    <div className={`module-visual module-visual-${type}`} aria-hidden="true">
      <div className="module-visual-grid" />

      {type === 'crm' && (
        <div className="visual-crm visual-panel">
          <div className="visual-badge">CRM CORE</div>
          <div className="crm-header">
            <span>Account</span>
            <strong>Pipeline health</strong>
          </div>
          <div className="crm-pipeline">
            {['Lead', 'Opp', 'Proposal', 'Closed'].map((stage, index) => (
              <div className="crm-stage" key={stage}>
                <i style={{ '--h': `${44 + index * 12}px` }} />
                <span>{stage}</span>
              </div>
            ))}
            <b className="crm-runner" />
          </div>
          <div className="crm-metrics"><i /><i /><i /></div>
        </div>
      )}

      {type === 'ai' && (
        <div className="visual-ai visual-panel">
          <div className="visual-badge">AI AGENT</div>
          <svg className="ai-lines" viewBox="0 0 360 180" preserveAspectRatio="none">
            <path d="M78 56 C128 48 145 82 180 90" />
            <path d="M282 56 C232 48 215 82 180 90" />
            <path d="M180 144 C180 118 180 106 180 90" />
          </svg>
          <div className="ai-core"><strong>AI</strong><span /></div>
          <div className="ai-node ai-node-intent">Intent</div>
          <div className="ai-node ai-node-knowledge">Knowledge</div>
          <div className="ai-node ai-node-action">Action</div>
        </div>
      )}

      {type === 'auto' && (
        <div className="visual-auto visual-panel">
          <div className="visual-badge">FLOW</div>
          <div className="flow-track">
            {['Trigger', 'Approval', 'SLA', 'Notify'].map((step, index) => (
              <div className="flow-step" key={step}>
                <b>{index === 0 ? '01' : '✓'}</b>
                <span>{step}</span>
              </div>
            ))}
            <i className="flow-line" />
            <i className="flow-pulse" />
          </div>
          <div className="flow-footer"><span>Execution</span><strong>Controlled</strong></div>
        </div>
      )}

      {type === 'api' && (
        <div className="visual-api visual-panel">
          <div className="visual-badge">API MESH</div>
          <svg className="api-lines" viewBox="0 0 360 180" preserveAspectRatio="none">
            <path d="M72 92 L180 42 L292 92 L180 142 Z" />
            <path d="M72 92 L292 92" />
            <path d="M180 42 L180 142" />
          </svg>
          {[
            ['CRM', 'left'],
            ['ERP', 'top'],
            ['APP', 'right'],
            ['DATA', 'bottom'],
            ['API', 'center'],
          ].map(([label, position]) => (
            <div className={`api-node api-node-${position}`} key={label}>{label}</div>
          ))}
          <i className="api-packet api-packet-one" />
          <i className="api-packet api-packet-two" />
        </div>
      )}

      {type === 'web' && (
        <div className="visual-web visual-panel">
          <div className="visual-badge">WEB EXPERIENCE</div>
          <div className="web-browser">
            <div className="web-dots"><i /><i /><i /></div>
            <div className="web-layout">
              <aside><i /><i /><i /></aside>
              <main>
                <b />
                <div className="web-cards"><i /><i /><i /></div>
                <div className="web-chart"><span /><span /><span /><span /></div>
              </main>
            </div>
          </div>
          <div className="web-mobile"><i /><b /><span /></div>
        </div>
      )}

      {type === 'team' && (
        <div className="visual-team visual-panel">
          <div className="visual-badge">TECH SQUAD</div>
          <div className="team-status"><span>Sprint</span><strong>Velocity 92%</strong></div>
          <div className="team-board">
            {['Dev', 'QA', 'PM'].map((role, index) => (
              <div className="team-column" key={role}>
                <span>{role}</span>
                <div className="team-avatars"><i /><i />{index !== 1 && <i />}</div>
                <div className="team-capacity"><b style={{ '--w': `${72 + index * 9}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Modules() {
  return (
    <section className="v4-section" id="modules">
      <Reveal className="section-heading">
        <span>02 / MODULES</span>
        <h2>Módulos diseñados para ejecutar.</h2>
        <p>Capacidades configurables que se conectan entre sí para cubrir CRM, IA, automatización, integración, experiencia digital y talento técnico.</p>
      </Reveal>
      <div className="module-grid">
        {modules.map((module, index) => (
          <Reveal key={module.title} delay={index * 0.045} className="module-card">
            <ModuleVisual type={module.type} />
            <div className="module-content">
              <span className="module-category">{module.category}</span>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div className="module-tags">
                {module.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}


function Catalogs() {
  const [selectedCatalog, setSelectedCatalog] = useState(modules[0].type)
  const [selectedTier, setSelectedTier] = useState('Nexuma Starter')
  const activeModule = modules.find((module) => module.type === selectedCatalog) || modules[0]
  const activeCatalog = moduleCatalogs[selectedCatalog]

  const selectCatalog = (type) => {
    setSelectedCatalog(type)
    setSelectedTier('Nexuma Starter')
  }

  return (
    <section className="v4-section catalog-section" id="catalogs">
      <Reveal className="section-heading">
        <span>02B / CATALOGS</span>
        <h2>Contamos con paquetes a tu medida.</h2>
        <p>Selecciona una capacidad Nexuma y conoce el nivel de ejecución ideal para tu empresa: Starter, Premium o Platinium. Sin precios visibles; cada alcance se calibra después del diagnóstico.</p>
      </Reveal>

      <div className="catalog-selector-wrap">
        <div className="catalog-selector" role="tablist" aria-label="Seleccionar catálogo por módulo">
          {modules.map((module) => (
            <button
              key={module.type}
              type="button"
              className={selectedCatalog === module.type ? 'catalog-chip is-active' : 'catalog-chip'}
              onClick={() => selectCatalog(module.type)}
            >
              <span>{module.category}</span>
              <strong>{module.title}</strong>
            </button>
          ))}
        </div>

        <label className="catalog-select-mobile">
          <span>Selecciona un módulo</span>
          <select value={selectedCatalog} onChange={(event) => selectCatalog(event.target.value)}>
            {modules.map((module) => (
              <option key={module.type} value={module.type}>{module.title}</option>
            ))}
          </select>
        </label>
      </div>

      <Reveal className="catalog-display catalog-display-v5" delay={0.08}>
        <article className="catalog-module-preview">
          <ModuleVisual type={activeModule.type} />
          <div className="catalog-module-copy">
            <span>{activeModule.category}</span>
            <h3>{activeModule.title}</h3>
            <p>{activeModule.description}</p>
            <div className="module-tags">
              {activeModule.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </article>

        <article className="catalog-package-panel catalog-accordion-panel">
          <div className="catalog-package-head">
            <span>PAQUETES DISPONIBLES</span>
            <h3>{activeModule.title}</h3>
            <p>{activeCatalog.subtitle}</p>
          </div>

          <div className="package-accordion">
            {activeCatalog.tiers.map((tier, index) => {
              const isActive = selectedTier === tier.name
              return (
                <article className={isActive ? 'package-accordion-item is-open' : 'package-accordion-item'} key={tier.name}>
                  <button type="button" className="package-accordion-trigger" onClick={() => setSelectedTier(isActive ? '' : tier.name)}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{tier.name}</strong>
                    <i>{isActive ? '−' : '+'}</i>
                  </button>

                  <div className="package-accordion-body" aria-hidden={!isActive}>
                    <ul>
                      {tier.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="catalog-note">
            <span>DIAGNÓSTICO PRIMERO</span>
            <p>Los paquetes se activan por alcance, complejidad, integraciones, madurez operativa y velocidad requerida.</p>
          </div>
        </article>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="footer-brand-link" href="/">
            <span className="brand-mark brand-mark-isotype" aria-hidden="true"><img src="/assets/nexuma/nexuma-isotype-transparent.png" alt="" /></span>
            <div>
              <strong>NEXUMA</strong>
              <span>CONSULTING GROUP</span>
            </div>
          </a>
          <p>Construimos la capa operativa digital para empresas que necesitan CRM, IA, automatización, integraciones, experiencia digital y ejecución técnica bajo un mismo sistema.</p>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/company/nexuma-consulting-group/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:consultinggroupnexuma@gmail.com">Email</a>
            <a href="https://wa.me/525515288533?text=Hola%20Nexuma%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20para%20mi%20empresa." target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Enlaces</h4>
          <a href="/">Inicio</a>
          <a href="#system">Sistema</a>
          <a href="#modules">Módulos</a>
          <a href="#catalogs">Catálogos</a>
          <a href="#method">Método</a>
          <a href="#contact">Contacto</a>
        </div>

        <div className="footer-column">
          <h4>Contáctanos</h4>
          <span>Ciudad de México, México</span>
          <a href="mailto:consultinggroupnexuma@gmail.com">consultinggroupnexuma@gmail.com</a>
          <a href="tel:+525515288533">+52 55 1528 8533</a>
          <a href="https://nexumaconsulting.com" target="_blank" rel="noreferrer">nexumaconsulting.com</a>
        </div>

        <div className="footer-column">
          <h4>Síguenos</h4>
          <p>Conectemos para compartir casos, capacidades y la evolución de Nexuma Consulting Group.</p>
          <a className="footer-linkedin" href="https://www.linkedin.com/company/nexuma-consulting-group/" target="_blank" rel="noreferrer">Ir a LinkedIn →</a>
        </div>
      </div>
      <div className="footer-package-strip" aria-label="Paquetes Nexuma disponibles">
        <span>Nexuma Starter</span>
        <span>Nexuma Premium</span>
        <span>Nexuma Platinium</span>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Nexuma Consulting Group. Todos los derechos reservados.</span>
        <span>NEXUMA://CONSULTING_GROUP</span>
      </div>
    </footer>
  )
}

function Method() {
  return (
    <section className="v4-section" id="method">
      <Reveal className="section-heading">
        <span>03 / METHOD</span>
        <h2>De diagnóstico a operación continua.</h2>
        <p>Un método de ejecución para convertir requerimientos en arquitectura, backlog, construcción, integración, medición y evolución.</p>
      </Reveal>
      <div className="method-grid">
        {methodSteps.map(([number, title, text], index) => (
          <Reveal key={title} delay={index * 0.05} className="method-card">
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <Reveal>
        <span>NEXUMA://READY_TO_DIAGNOSE</span>
        <h2>Detectemos qué capa está frenando tu operación.</h2>
        <p>Agenda un diagnóstico para identificar oportunidades en CRM, automatización, IA, integraciones, experiencia digital y ejecución técnica.</p>
        <div className="hero-actions">
          <a href="https://wa.me/525515288533?text=Hola%20Nexuma%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20para%20mi%20empresa." target="_blank" rel="noreferrer">Agenda una sesión <span>→</span></a>
          <a className="secondary" href="https://wa.me/525515288533?text=Hola%20Nexuma%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20para%20mi%20empresa." target="_blank" rel="noreferrer">Hablar con Nexuma <span>→</span></a>
        </div>
      </Reveal>
    </section>
  )
}

function WhatsAppFloating() {
  const phone = '525515288533'
  const message = encodeURIComponent('Hola Nexuma, quiero solicitar un diagnóstico para mi empresa.')

  return (
    <a
      className="whatsapp-floating"
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar a Nexuma por WhatsApp"
    >
      <span className="whatsapp-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="img">
          <path d="M16.04 3.2C9.05 3.2 3.36 8.78 3.36 15.64c0 2.2.6 4.35 1.72 6.23L3.2 28.8l7.14-1.82a12.9 12.9 0 0 0 5.7 1.34c6.99 0 12.68-5.58 12.68-12.44C28.72 8.78 23.03 3.2 16.04 3.2Zm0 22.98a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.24 1.08 1.12-4.05-.26-.42a10.05 10.05 0 0 1-1.55-5.44c0-5.68 4.8-10.3 10.72-10.3 5.9 0 10.7 4.62 10.7 10.3 0 5.69-4.8 10.54-10.7 10.54Zm5.86-7.75c-.32-.16-1.9-.92-2.2-1.02-.29-.1-.5-.16-.72.16-.22.31-.83 1.01-1.02 1.22-.19.2-.38.23-.7.08-.32-.16-1.36-.49-2.59-1.56-.96-.84-1.6-1.88-1.8-2.2-.18-.31-.02-.48.14-.64.14-.14.32-.36.48-.54.16-.18.22-.31.32-.52.11-.21.06-.39-.03-.55-.08-.16-.72-1.7-.99-2.33-.26-.61-.52-.53-.72-.54h-.61c-.22 0-.55.08-.84.39-.29.31-1.1 1.05-1.1 2.56 0 1.5 1.12 2.96 1.28 3.17.16.2 2.2 3.29 5.34 4.6.75.32 1.33.51 1.78.65.75.23 1.44.2 1.98.12.6-.09 1.9-.76 2.17-1.49.27-.73.27-1.36.19-1.49-.08-.13-.29-.2-.62-.36Z" />
        </svg>
      </span>
      <span className="whatsapp-copy">
        <small>WhatsApp directo</small>
        <strong>Diagnóstico Nexuma</strong>
      </span>
    </a>
  )
}

export default function ThreeLabV4() {
  return (
    <main className="nexuma-v4">
      <ScreenField />
      <Nav />
      <a className="v4-back-selector" href="/">← Volver a elegir solución</a>
      <Hero />
      <SystemStory />
      <Modules />
      <Catalogs />
      <Method />
      <FinalCTA />
      <Footer />
      <WhatsAppFloating />
    </main>
  )
}

useGLTF.preload(MODEL_PATH)
