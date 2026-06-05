import { useState } from 'react'
import './App.css'
import logoBrand from './assets/nexuma-brand-transparent.png'
import heroWorld from './assets/hero-world.png'

const content = {
  es: {
    langLabel: 'EN',
    heroKicker: 'Salesforce • IA • Automatización • Integraciones',
    heroTitle1: 'Construimos operación digital',
    heroTitle2: 'para negocios que escalan',
    heroText:
      'Diseñamos tecnología empresarial con visión de negocio: CRM, agentes IA, automatización, integraciones y plataformas web listas para operar.',
    quote: 'Solicitar diagnóstico',
    more: 'Explorar soluciones',
    trust: ['Arquitectura CRM', 'Agentes IA', 'APIs', 'Automatización'],
    servicesKicker: 'Nuestras capacidades',
    servicesTitle: 'Tecnología que se conecta con tu operación real',
    productsTitle: 'Productos y soluciones',
    processKicker: 'Método NEXUMA',
    processTitle: 'De una idea operativa a una solución funcionando',
    processText:
      'Trabajamos con un modelo claro: entendemos el negocio, diseñamos la arquitectura, construimos, conectamos, medimos y evolucionamos.',
    commandKicker: 'Digital Command Center',
    commandTitle: 'Una presencia más tecnológica, clara y vendible',
    commandText:
      'La página ahora comunica movimiento, precisión, automatización y capacidad técnica sin perder seriedad comercial.',
    strategyKicker: 'NEXUMA Consulting Group',
    strategyTitle: 'Tu socio estratégico en transformación digital',
    strategyText:
      'Unimos consultoría, desarrollo e inteligencia artificial para que las empresas reduzcan trabajo manual, centralicen información y tomen mejores decisiones.',
    metrics: [
      ['+5', 'Proyectos completados'],
      ['+5', 'Clientes satisfechos'],
      ['+10', 'Años de experiencia'],
      ['24/7', 'Visión automatizada']
    ],
    footerLinks: 'Enlaces',
    home: 'Inicio',
    services: 'Servicios',
    process: 'Método',
    contact: 'Contacto',
    contactUs: 'Contáctanos',
    follow: 'Síguenos',
    followText: 'Construyamos una solución tecnológica con impacto real en tu operación.',
    city: 'Ciudad de México, México'
  },
  en: {
    langLabel: 'ES',
    heroKicker: 'Salesforce • AI • Automation • Integrations',
    heroTitle1: 'We build digital operations',
    heroTitle2: 'for businesses that scale',
    heroText:
      'We design enterprise technology with business vision: CRM, AI agents, automation, integrations and web platforms ready to operate.',
    quote: 'Request diagnosis',
    more: 'Explore solutions',
    trust: ['CRM Architecture', 'AI Agents', 'APIs', 'Automation'],
    servicesKicker: 'Our capabilities',
    servicesTitle: 'Technology connected to your real operation',
    productsTitle: 'Products and solutions',
    processKicker: 'NEXUMA Method',
    processTitle: 'From an operational idea to a working solution',
    processText:
      'We use a clear model: understand the business, design the architecture, build, connect, measure and evolve.',
    commandKicker: 'Digital Command Center',
    commandTitle: 'A more technological, clear and sellable presence',
    commandText:
      'The site now communicates motion, precision, automation and technical capability while keeping a professional commercial tone.',
    strategyKicker: 'NEXUMA Consulting Group',
    strategyTitle: 'Your strategic partner in digital transformation',
    strategyText:
      'We combine consulting, software development and artificial intelligence so companies can reduce manual work, centralize information and make better decisions.',
    metrics: [
      ['+5', 'Completed projects'],
      ['+5', 'Satisfied clients'],
      ['+10', 'Years of experience'],
      ['24/7', 'Automated vision']
    ],
    footerLinks: 'Links',
    home: 'Home',
    services: 'Services',
    process: 'Method',
    contact: 'Contact',
    contactUs: 'Contact us',
    follow: 'Follow us',
    followText: 'Let us build a technology solution with real operational impact.',
    city: 'Mexico City, Mexico'
  }
}

const services = {
  es: [
    {
      id: 'salesforce',
      icon: 'SF',
      title: 'Consultoría Salesforce',
      description:
        'Arquitectura, configuración, automatización y evolución de Salesforce para ordenar procesos comerciales, servicio y operación.',
      products: [
        'Implementación de Salesforce',
        'Automatización con Flows',
        'Sales Cloud y Service Cloud',
        'Apex, triggers y validaciones',
        'Integraciones con sistemas externos',
        'Soporte CRM y mejora continua'
      ]
    },
    {
      id: 'integration',
      icon: 'API',
      title: 'Integración de Sistemas',
      description:
        'Conectamos plataformas para que la información fluya entre CRM, ERP, bases de datos, WhatsApp, terminales y sistemas internos.',
      products: [
        'Integraciones por API',
        'Middleware empresarial',
        'Sincronización de datos',
        'Conexión CRM / ERP',
        'Integración con WhatsApp Business',
        'Integración con terminal bancaria'
      ]
    },
    {
      id: 'ai',
      icon: 'AI',
      title: 'Inteligencia Artificial',
      description:
        'Creamos agentes y asistentes IA para atender, documentar, analizar información y acelerar tareas repetitivas del negocio.',
      products: [
        'Agentes IA para atención',
        'Chatbots inteligentes',
        'Automatización documental',
        'Análisis de datos',
        'Asistentes internos',
        'Generación de contenido empresarial'
      ]
    },
    {
      id: 'automation',
      icon: 'AUTO',
      title: 'Automatización Empresarial',
      description:
        'Reducimos trabajo manual con flujos, alertas, aprobaciones, reportes y reglas que mantienen la operación en movimiento.',
      products: [
        'Automatización de procesos',
        'Flujos de aprobación',
        'Reportes automáticos',
        'Alertas operativas',
        'Optimización de operación',
        'Reducción de tareas manuales'
      ]
    },
    {
      id: 'software',
      icon: 'DEV',
      title: 'Desarrollo de Software',
      description:
        'Construimos sistemas a la medida para administrar ventas, operación, inventarios, clientes, equipos y procesos internos.',
      products: [
        'Sistemas POS',
        'Dashboards administrativos',
        'Aplicaciones web',
        'CRM personalizado',
        'Portales empresariales',
        'Sistemas internos'
      ]
    },
    {
      id: 'webmobile',
      icon: 'WEB',
      title: 'Soluciones Web y Móviles',
      description:
        'Diseñamos experiencias digitales modernas, rápidas y responsivas para convertir presencia digital en oportunidades reales.',
      products: [
        'Sitios web corporativos',
        'Landing pages',
        'Aplicaciones móviles',
        'Menús digitales',
        'Portales de clientes',
        'E-commerce'
      ]
    }
  ],
  en: [
    {
      id: 'salesforce',
      icon: 'SF',
      title: 'Salesforce Consulting',
      description:
        'Architecture, configuration, automation and Salesforce evolution to organize sales, service and operational processes.',
      products: [
        'Salesforce implementation',
        'Flow automation',
        'Sales Cloud and Service Cloud',
        'Apex, triggers and validations',
        'External system integrations',
        'CRM support and continuous improvement'
      ]
    },
    {
      id: 'integration',
      icon: 'API',
      title: 'System Integration',
      description:
        'We connect platforms so information can flow between CRM, ERP, databases, WhatsApp, payment terminals and internal systems.',
      products: [
        'API integrations',
        'Enterprise middleware',
        'Data synchronization',
        'CRM / ERP connection',
        'WhatsApp Business integration',
        'Bank terminal integration'
      ]
    },
    {
      id: 'ai',
      icon: 'AI',
      title: 'Artificial Intelligence',
      description:
        'We create AI agents and assistants to support service, documentation, data analysis and repetitive business tasks.',
      products: [
        'AI service agents',
        'Intelligent chatbots',
        'Document automation',
        'Data analysis',
        'Internal assistants',
        'Business content generation'
      ]
    },
    {
      id: 'automation',
      icon: 'AUTO',
      title: 'Business Automation',
      description:
        'We reduce manual work with flows, alerts, approvals, reports and rules that keep operations moving.',
      products: [
        'Process automation',
        'Approval flows',
        'Automated reports',
        'Operational alerts',
        'Operation optimization',
        'Manual task reduction'
      ]
    },
    {
      id: 'software',
      icon: 'DEV',
      title: 'Software Development',
      description:
        'We build custom systems to manage sales, operations, inventory, customers, teams and internal processes.',
      products: [
        'POS systems',
        'Administrative dashboards',
        'Web applications',
        'Custom CRM',
        'Enterprise portals',
        'Internal systems'
      ]
    },
    {
      id: 'webmobile',
      icon: 'WEB',
      title: 'Web & Mobile Solutions',
      description:
        'We design modern, fast and responsive digital experiences to turn digital presence into real opportunities.',
      products: [
        'Corporate websites',
        'Landing pages',
        'Mobile applications',
        'Digital menus',
        'Customer portals',
        'E-commerce'
      ]
    }
  ]
}

const processSteps = {
  es: [
    ['01', 'Diagnóstico', 'Mapeamos operación, dolores, sistemas actuales y oportunidades de automatización.'],
    ['02', 'Arquitectura', 'Diseñamos objetos, flujos, integraciones, permisos y componentes técnicos.'],
    ['03', 'Construcción', 'Desarrollamos por módulos, validamos reglas de negocio y documentamos cambios.'],
    ['04', 'Salida y evolución', 'Acompañamos pruebas, despliegue, capacitación y mejora continua.']
  ],
  en: [
    ['01', 'Diagnosis', 'We map operations, pain points, current systems and automation opportunities.'],
    ['02', 'Architecture', 'We design objects, flows, integrations, permissions and technical components.'],
    ['03', 'Build', 'We develop by modules, validate business rules and document changes.'],
    ['04', 'Launch and evolve', 'We support testing, deployment, training and continuous improvement.']
  ]
}

const commandCards = {
  es: [
    ['CRM', 'Salesforce ordenado, medible y escalable'],
    ['AI', 'Agentes para atención, análisis y operación'],
    ['API', 'Sistemas conectados sin capturas dobles'],
    ['OPS', 'Procesos automatizados y trazables']
  ],
  en: [
    ['CRM', 'Organized, measurable and scalable Salesforce'],
    ['AI', 'Agents for service, analysis and operations'],
    ['API', 'Connected systems without duplicate capture'],
    ['OPS', 'Automated and traceable processes']
  ]
}

function TechBackground() {
  return (
    <div className="tech-background" aria-hidden="true">
      <div className="aurora aurora-one"></div>
      <div className="aurora aurora-two"></div>
      <div className="grid-layer"></div>
      <div className="scan-line"></div>
      <div className="particle-field">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} style={{ '--i': index }}></span>
        ))}
      </div>
    </div>
  )
}


function ServiceIcon({ id }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }

  if (id === 'salesforce') {
    return (
      <svg viewBox="0 0 64 64" className="service-svg" aria-hidden="true">
        <path {...common} d="M22.5 43H44a10 10 0 0 0 1.2-19.9 13.6 13.6 0 0 0-25.9-4.8A11.9 11.9 0 0 0 22.5 43Z" />
        <path {...common} d="M25 31h9.5a5 5 0 1 1 0 10H27" />
        <path {...common} d="M39.5 26.5h8" />
        <path {...common} d="M43.5 22.5v8" />
        <circle cx="43.5" cy="26.5" r="9.5" {...common} />
      </svg>
    )
  }

  if (id === 'integration') {
    return (
      <svg viewBox="0 0 64 64" className="service-svg" aria-hidden="true">
        <circle cx="16" cy="32" r="7" {...common} />
        <circle cx="48" cy="18" r="7" {...common} />
        <circle cx="48" cy="46" r="7" {...common} />
        <path {...common} d="M23 31l18-10M23 34l18 10" />
        <path {...common} d="M14 25v-5a4 4 0 0 1 4-4h7" />
        <path {...common} d="M14 39v5a4 4 0 0 0 4 4h7" />
      </svg>
    )
  }

  if (id === 'ai') {
    return (
      <svg viewBox="0 0 64 64" className="service-svg" aria-hidden="true">
        <rect x="18" y="18" width="28" height="28" rx="8" {...common} />
        <path {...common} d="M26 35c0-5 3-9 8-9 4 0 7 3 7 7 0 5-4 8-9 8-4 0-6-2-6-6Z" />
        <path {...common} d="M24 14v-6M32 14v-6M40 14v-6M24 56v-6M32 56v-6M40 56v-6M14 24H8M14 32H8M14 40H8M56 24h-6M56 32h-6M56 40h-6" />
        <path {...common} d="M30 30h8M28 36h12" />
      </svg>
    )
  }

  if (id === 'automation') {
    return (
      <svg viewBox="0 0 64 64" className="service-svg" aria-hidden="true">
        <circle cx="24" cy="24" r="8" {...common} />
        <circle cx="43" cy="42" r="7" {...common} />
        <path {...common} d="M24 10v6M24 32v6M10 24h6M32 24h6M14.1 14.1l4.2 4.2M29.7 29.7l4.2 4.2M33.9 14.1l-4.2 4.2M18.3 29.7l-4.2 4.2" />
        <path {...common} d="M43 31v-5a6 6 0 0 0-6-6h-3M43 49v5a6 6 0 0 1-6 6H21" />
        <path {...common} d="M18 56l-5-5 5-5" />
      </svg>
    )
  }

  if (id === 'software') {
    return (
      <svg viewBox="0 0 64 64" className="service-svg" aria-hidden="true">
        <rect x="10" y="14" width="44" height="36" rx="6" {...common} />
        <path {...common} d="M10 24h44M25 34l-6 6 6 6M39 34l6 6-6 6M35 32l-6 16" />
        <circle cx="17" cy="19" r="1.5" fill="currentColor" />
        <circle cx="23" cy="19" r="1.5" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" className="service-svg" aria-hidden="true">
      <rect x="8" y="16" width="34" height="25" rx="4" {...common} />
      <rect x="45" y="22" width="11" height="25" rx="3" {...common} />
      <path {...common} d="M18 50h17M26.5 41v9M14 23h22M48 41h5" />
      <path {...common} d="M16 29h10M16 35h18" />
    </svg>
  )
}

function HeroVisual({ lang }) {
  const labels = lang === 'es'
    ? ['Salesforce Core', 'AI Agents', 'API Sync', 'Automation']
    : ['Salesforce Core', 'AI Agents', 'API Sync', 'Automation']

  return (
    <div className="hero-visual" aria-label="NEXUMA technology network animation">
      <div className="holo-stage">
        <div className="orbit orbit-one"></div>
        <div className="orbit orbit-two"></div>
        <div className="orbit orbit-three"></div>
        <div className="world-shell">
          <img src={heroWorld} alt="NEXUMA global connections" className="hero-world" />
          <div className="world-scan"></div>
          <div className="world-glass"></div>
        </div>

        <div className="node node-a"><span></span></div>
        <div className="node node-b"><span></span></div>
        <div className="node node-c"><span></span></div>
        <div className="node node-d"><span></span></div>

        <div className="hud-card hud-card-one">
          <small>STATUS</small>
          <strong>ONLINE</strong>
          <span>Latency 08ms</span>
        </div>

        <div className="hud-card hud-card-two">
          <small>NEXUMA OS</small>
          <strong>Digital Stack</strong>
          <span>CRM + AI + API</span>
        </div>

        <div className="data-console">
          {labels.map((label) => (
            <div className="console-row" key={label}>
              <span>{label}</span>
              <i></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WhatsAppAgent({ lang }) {
  const [open, setOpen] = useState(false)
  const [service, setService] = useState('')
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  })

  const phoneNumber = '525515288533'

  const copy = {
    es: {
      title: 'Agente NEXUMA',
      intro: 'Cuéntanos qué necesita tu empresa y abrimos la conversación por WhatsApp.',
      serviceLabel: 'Servicio de interés',
      placeholder: 'Selecciona una opción',
      name: 'Nombre',
      company: 'Empresa',
      email: 'Correo',
      phone: 'Teléfono',
      message: '¿Qué necesitas resolver?',
      button: 'Enviar por WhatsApp',
      floating: 'Hablar con NEXUMA',
      defaultMessage: 'Hola, quiero información sobre los servicios de NEXUMA Consulting Group.',
      services: [
        'Salesforce Consulting',
        'Inteligencia Artificial',
        'Desarrollo Web',
        'Aplicaciones Móviles',
        'Integraciones',
        'Automatización Empresarial',
        'Sistema Punto de Venta',
        'Hablar con un asesor'
      ]
    },
    en: {
      title: 'NEXUMA Agent',
      intro: 'Tell us what your company needs and we will start the conversation on WhatsApp.',
      serviceLabel: 'Service of interest',
      placeholder: 'Select an option',
      name: 'Name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      message: 'What do you need to solve?',
      button: 'Send through WhatsApp',
      floating: 'Talk to NEXUMA',
      defaultMessage: 'Hello, I would like information about NEXUMA Consulting Group services.',
      services: [
        'Salesforce Consulting',
        'Artificial Intelligence',
        'Web Development',
        'Mobile Applications',
        'System Integrations',
        'Business Automation',
        'Point of Sale System',
        'Talk to an advisor'
      ]
    }
  }

  const t = copy[lang]

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const sendToWhatsApp = () => {
    const text = [
      'Hola NEXUMA Consulting Group.',
      '',
      `Estoy interesado en: ${service || 'Servicios de NEXUMA'}.`,
      `Nombre: ${form.name || 'No especificado'}.`,
      `Empresa: ${form.company || 'No especificada'}.`,
      `Correo: ${form.email || 'No especificado'}.`,
      `Teléfono: ${form.phone || 'No especificado'}.`,
      `Necesidad: ${form.message || t.defaultMessage}`
    ].join('\n')

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <>
      <button className="agent-floating" type="button" onClick={() => setOpen(true)}>
        <span className="agent-pulse">N</span>
        <strong>{t.floating}</strong>
      </button>

      {open && (
        <div className="agent-overlay">
          <div className="agent-panel">
            <button className="agent-close" type="button" onClick={() => setOpen(false)} aria-label="Cerrar">×</button>

            <div className="agent-header">
              <div className="agent-avatar">N</div>
              <div>
                <h3>{t.title}</h3>
                <p>{t.intro}</p>
              </div>
            </div>

            <label>{t.serviceLabel}</label>
            <select value={service} onChange={(event) => setService(event.target.value)}>
              <option value="">{t.placeholder}</option>
              {t.services.map((item) => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>

            <div className="agent-grid">
              <input placeholder={t.name} value={form.name} onChange={(event) => updateField('name', event.target.value)} />
              <input placeholder={t.company} value={form.company} onChange={(event) => updateField('company', event.target.value)} />
            </div>

            <div className="agent-grid">
              <input placeholder={t.email} value={form.email} onChange={(event) => updateField('email', event.target.value)} />
              <input placeholder={t.phone} value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
            </div>

            <textarea
              placeholder={t.message}
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
            />

            <button className="agent-submit" type="button" onClick={sendToWhatsApp}>
              {t.button} →
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function App() {
  const [lang, setLang] = useState('es')
  const [selectedId, setSelectedId] = useState('salesforce')

  const t = content[lang]
  const currentServices = services[lang]
  const selectedService = currentServices.find((service) => service.id === selectedId) || currentServices[0]

  const toggleLanguage = () => {
    setLang((currentLang) => (currentLang === 'es' ? 'en' : 'es'))
  }

  return (
    <main className="site" id="top">
      <TechBackground />

      <header className="top-header">
        <a href="#top" aria-label="NEXUMA Consulting Group inicio" className="brand-link">
          <img src={logoBrand} alt="NEXUMA Consulting Group" className="brand-logo" />
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#services">{t.services}</a>
          <a href="#method">{t.process}</a>
          <a href="#contact">{t.contact}</a>
        </nav>
        <button className="language-toggle" onClick={toggleLanguage} type="button">
          {t.langLabel}
        </button>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">{t.heroKicker}</p>
          <h1>
            {t.heroTitle1}
            <span>{t.heroTitle2}</span>
          </h1>
          <div className="blue-line"></div>
          <p className="hero-text">{t.heroText}</p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">{t.quote} <span>→</span></a>
            <a href="#services" className="btn btn-outline">{t.more} <span>→</span></a>
          </div>

          <div className="trust-strip" aria-label="NEXUMA capabilities">
            {t.trust.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <HeroVisual lang={lang} />
      </section>

      <section id="services" className="services-section">
        <p className="section-kicker">{t.servicesKicker}</p>
        <h2>{t.servicesTitle}</h2>
        <div className="section-line"></div>

        <div className="service-tabs">
          {currentServices.map((service) => (
            <button
              key={service.id}
              className={`service-tab ${selectedService.id === service.id ? 'active' : ''}`}
              onClick={() => setSelectedId(service.id)}
              type="button"
            >
              <span className="tab-icon"><ServiceIcon id={service.id} /></span>
              <span>{service.title}</span>
            </button>
          ))}
        </div>

        <div className="service-detail">
          <div className="service-badge">
            <div className="service-orb"><ServiceIcon id={selectedService.id} /></div>
          </div>

          <div className="service-description">
            <p className="mini-label">ACTIVE MODULE</p>
            <h3>{selectedService.title}</h3>
            <p>{selectedService.description}</p>
          </div>

          <div className="product-list">
            <p>{t.productsTitle}</p>
            <ul>
              {selectedService.products.map((product) => (
                <li key={product}>{product}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="command-section">
        <div className="command-copy">
          <p className="section-kicker">{t.commandKicker}</p>
          <h2>{t.commandTitle}</h2>
          <div className="blue-line"></div>
          <p>{t.commandText}</p>
        </div>

        <div className="command-grid">
          {commandCards[lang].map(([code, text]) => (
            <article key={code}>
              <span>{code}</span>
              <p>{text}</p>
              <i></i>
            </article>
          ))}
        </div>
      </section>

      <section id="method" className="process-section">
        <div className="process-intro">
          <p className="section-kicker">{t.processKicker}</p>
          <h2>{t.processTitle}</h2>
          <p>{t.processText}</p>
        </div>

        <div className="process-timeline">
          {processSteps[lang].map(([number, title, text]) => (
            <article key={number}>
              <strong>{number}</strong>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="strategy-section">
        <div>
          <p className="section-kicker">{t.strategyKicker}</p>
          <h2>{t.strategyTitle}</h2>
          <div className="blue-line"></div>
          <p>{t.strategyText}</p>
        </div>

        <div className="metrics">
          {t.metrics.map(([number, label]) => (
            <article key={label}>
              <strong>{number}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" className="footer">
        <div>
          <img src={logoBrand} alt="NEXUMA Consulting Group" className="footer-logo" />
        </div>

        <div>
          <h4>{t.footerLinks}</h4>
          <a href="#top">{t.home}</a>
          <a href="#services">{t.services}</a>
          <a href="#method">{t.process}</a>
          <a href="#contact">{t.contact}</a>
        </div>

        <div>
          <h4>{t.contactUs}</h4>
          <p>{t.city}</p>
          <p>nexumacg@outlook.com</p>
          <p>+52 55 1528 8533</p>
        </div>

        <div>
          <h4>{t.follow}</h4>
          <p>{t.followText}</p>
          <a href="mailto:nexumacg@outlook.com" className="footer-button">{t.contactUs} →</a>
        </div>
      </footer>

      <WhatsAppAgent lang={lang} />
    </main>
  )
}

export default App
