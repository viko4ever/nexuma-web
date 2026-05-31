import { useState } from 'react'
import './App.css'
import logoBanner from './assets/logo-banner-negro.jpg'
import heroWorld from './assets/hero-world.png'

const content = {
  es: {
    langLabel: 'EN',
    heroKicker: 'Tecnología • Automatización • Transformación',
    heroTitle1: 'Conectamos Negocios',
    heroTitle2: 'A Través de Tecnología',
    heroText:
      'Transformamos empresas mediante Salesforce, inteligencia artificial, desarrollo de software, automatización e integración de plataformas para impulsar su crecimiento.',
    quote: 'Solicitar cotización',
    more: 'Conocer más',
    servicesKicker: 'Nuestros servicios',
    servicesTitle: 'Selecciona un servicio para conocer más',
    productsTitle: 'Productos y soluciones',
    strategyKicker: 'NEXUMA Consulting Group',
    strategyTitle: 'Tu socio estratégico en la era digital',
    strategyText:
      'Combinamos tecnología, experiencia y visión de negocio para ayudar a las empresas a adaptarse, innovar y liderar en un mundo digital en constante evolución.',
    metrics: [
      ['+5', 'Proyectos completados'],
      ['+5', 'Clientes satisfechos'],
      ['+10', 'Años de experiencia'],
      ['2', 'Países con presencia']
    ],
    footerLinks: 'Enlaces',
    home: 'Inicio',
    services: 'Servicios',
    contact: 'Contacto',
    contactUs: 'Contáctanos',
    follow: 'Síguenos',
    followText: 'Mantente al día con nuestras soluciones y novedades.',
    city: 'Ciudad de México, México'
  },
  en: {
    langLabel: 'ES',
    heroKicker: 'Technology • Automation • Transformation',
    heroTitle1: 'Connecting Business',
    heroTitle2: 'Through Technology',
    heroText:
      'We transform companies through Salesforce, artificial intelligence, software development, automation and platform integration to accelerate business growth.',
    quote: 'Request a quote',
    more: 'Learn more',
    servicesKicker: 'Our services',
    servicesTitle: 'Select a service to learn more',
    productsTitle: 'Products and solutions',
    strategyKicker: 'NEXUMA Consulting Group',
    strategyTitle: 'Your strategic partner in the digital era',
    strategyText:
      'We combine technology, experience and business vision to help companies adapt, innovate and lead in a constantly evolving digital world.',
    metrics: [
      ['+50', 'Completed projects'],
      ['+30', 'Satisfied clients'],
      ['+10', 'Years of experience'],
      ['5', 'Countries with presence']
    ],
    footerLinks: 'Links',
    home: 'Home',
    services: 'Services',
    contact: 'Contact',
    contactUs: 'Contact us',
    follow: 'Follow us',
    followText: 'Stay up to date with our solutions and latest updates.',
    city: 'Mexico City, Mexico'
  }
}

const services = {
  es: [
    {
      id: 'salesforce',
      icon: '☁️',
      title: 'Consultoría Salesforce',
      description:
        'Impulsamos la transformación de tu empresa con soluciones Salesforce personalizadas que optimizan procesos, mejoran la experiencia del cliente y aceleran el crecimiento.',
      products: [
        'Implementación de Salesforce',
        'Automatización con Flows',
        'Configuración de Sales Cloud',
        'Configuración de Service Cloud',
        'Integraciones con sistemas externos',
        'Soporte y evolución CRM'
      ]
    },
    {
      id: 'integration',
      icon: '🌐',
      title: 'Integración de Sistemas',
      description:
        'Conectamos herramientas, sistemas y plataformas para centralizar información, reducir errores y mejorar la eficiencia operativa.',
      products: [
        'Integraciones por API',
        'Conexión CRM / ERP',
        'Middleware empresarial',
        'Sincronización de bases de datos',
        'Integración con terminal bancaria',
        'Integración con WhatsApp Business'
      ]
    },
    {
      id: 'ai',
      icon: '🧠',
      title: 'Inteligencia Artificial',
      description:
        'Diseñamos soluciones de inteligencia artificial para automatizar tareas, mejorar atención y convertir datos en decisiones.',
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
      icon: '⚙️',
      title: 'Automatización Empresarial',
      description:
        'Automatizamos procesos operativos y comerciales para disminuir tiempos, reducir errores y aumentar productividad.',
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
      icon: '💻',
      title: 'Desarrollo de Software',
      description:
        'Construimos sistemas empresariales a la medida para resolver necesidades reales de operación, administración y crecimiento.',
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
      icon: '📱',
      title: 'Soluciones Web y Móviles',
      description:
        'Creamos experiencias digitales modernas, rápidas y seguras para conectar negocios con clientes y usuarios.',
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
      icon: '☁️',
      title: 'Salesforce Consulting',
      description:
        'We drive business transformation with custom Salesforce solutions that optimize processes, improve customer experience and accelerate growth.',
      products: [
        'Salesforce implementation',
        'Flow automation',
        'Sales Cloud configuration',
        'Service Cloud configuration',
        'External system integrations',
        'CRM support and evolution'
      ]
    },
    {
      id: 'integration',
      icon: '🌐',
      title: 'System Integration',
      description:
        'We connect tools, systems and platforms to centralize information, reduce errors and improve operational efficiency.',
      products: [
        'API integrations',
        'CRM / ERP connection',
        'Enterprise middleware',
        'Database synchronization',
        'Bank terminal integration',
        'WhatsApp Business integration'
      ]
    },
    {
      id: 'ai',
      icon: '🧠',
      title: 'Artificial Intelligence',
      description:
        'We design artificial intelligence solutions to automate tasks, improve service and turn data into decisions.',
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
      icon: '⚙️',
      title: 'Business Automation',
      description:
        'We automate operational and commercial processes to reduce time, minimize errors and increase productivity.',
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
      icon: '💻',
      title: 'Software Development',
      description:
        'We build custom enterprise systems to solve real operational, administrative and growth needs.',
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
      icon: '📱',
      title: 'Web & Mobile Solutions',
      description:
        'We create modern, fast and secure digital experiences to connect businesses with customers and users.',
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
// =========================================================
// NEXUMA WHATSAPP AGENT V1
// Agente flotante sin costo API.
// Captura interés, datos del lead y abre WhatsApp con mensaje armado.
// =========================================================

// 1) EN App.jsx AGREGA ESTE COMPONENTE ANTES DE function App()

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
      intro: 'Cuéntanos qué necesita tu empresa y te conectamos con un asesor.',
      serviceLabel: 'Servicio de interés',
      name: 'Nombre',
      company: 'Empresa',
      email: 'Correo',
      phone: 'Teléfono',
      message: '¿Qué necesitas resolver?',
      button: 'Enviar por WhatsApp',
      floating: '¿Necesitas ayuda?',
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
      intro: 'Tell us what your company needs and we will connect you with an advisor.',
      serviceLabel: 'Service of interest',
      name: 'Name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      message: 'What do you need to solve?',
      button: 'Send through WhatsApp',
      floating: 'Need help?',
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
    const text = `Hola NEXUMA Consulting Group.%0A%0A` +
      `Estoy interesado en: ${service || 'Servicios de NEXUMA'}.%0A` +
      `Nombre: ${form.name || 'No especificado'}.%0A` +
      `Empresa: ${form.company || 'No especificada'}.%0A` +
      `Correo: ${form.email || 'No especificado'}.%0A` +
      `Teléfono: ${form.phone || 'No especificado'}.%0A` +
      `Necesidad: ${form.message || t.defaultMessage}`

    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')
  }

  return (
    <>
      <button className="agent-floating" type="button" onClick={() => setOpen(true)}>
        <span>💬</span>
        <strong>{t.floating}</strong>
      </button>

      {open && (
        <div className="agent-overlay">
          <div className="agent-panel">
            <button className="agent-close" type="button" onClick={() => setOpen(false)}>×</button>

            <div className="agent-header">
              <div className="agent-avatar">N</div>
              <div>
                <h3>{t.title}</h3>
                <p>{t.intro}</p>
              </div>
            </div>

            <label>{t.serviceLabel}</label>
            <select value={service} onChange={(e) => setService(e.target.value)}>
              <option value="">Selecciona una opción</option>
              {t.services.map((item) => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>

            <div className="agent-grid">
              <input placeholder={t.name} value={form.name} onChange={(e) => updateField('name', e.target.value)} />
              <input placeholder={t.company} value={form.company} onChange={(e) => updateField('company', e.target.value)} />
            </div>

            <div className="agent-grid">
              <input placeholder={t.email} value={form.email} onChange={(e) => updateField('email', e.target.value)} />
              <input placeholder={t.phone} value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
            </div>

            <textarea
              placeholder={t.message}
              value={form.message}
              onChange={(e) => updateField('message', e.target.value)}
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
      <header className="top-header">
        <button className="language-toggle" onClick={toggleLanguage} type="button">
          {t.langLabel}
        </button>
        <img src={logoBanner} alt="NEXUMA Consulting Group" className="top-logo" />
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
        </div>

        <div className="hero-visual">
          <img src={heroWorld} alt="NEXUMA global connections" />
        </div>
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
              <span className="tab-icon">{service.icon}</span>
              <span>{service.title}</span>
            </button>
          ))}
        </div>

        <div className="service-detail">
          <div className="service-badge">
            <div className="service-orb">{selectedService.icon}</div>
          </div>

          <div className="service-description">
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
          <img src={logoBanner} alt="NEXUMA Consulting Group" className="footer-logo" />
        </div>

        <div>
          <h4>{t.footerLinks}</h4>
          <a href="#top">{t.home}</a>
          <a href="#services">{t.services}</a>
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
      <a
  className="whatsapp-float"
  href="https://wa.me/525515288533?text=Hola%20NEXUMA%20Consulting%20Group%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios."
  target="_blank"
  rel="noreferrer"
>
  💬
</a>
<a
  className="whatsapp-float"
  href="https://wa.me/525515288533?text=Hola%20NEXUMA%20Consulting%20Group%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios."
  target="_blank"
  rel="noreferrer"
  aria-label="Contactar por WhatsApp"
>
  <svg
    className="whatsapp-icon"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <path
      d="M16.02 3.2C9.1 3.2 3.48 8.82 3.48 15.74c0 2.3.62 4.46 1.72 6.32L3.2 28.8l6.92-1.92a12.46 12.46 0 0 0 5.9 1.5c6.92 0 12.54-5.62 12.54-12.54S22.94 3.2 16.02 3.2Zm0 22.98c-1.86 0-3.58-.5-5.08-1.38l-.36-.22-4.1 1.14 1.16-3.98-.24-.38a10.23 10.23 0 0 1-1.62-5.52c0-5.66 4.6-10.26 10.24-10.26 5.66 0 10.26 4.6 10.26 10.26 0 5.64-4.6 10.24-10.26 10.24Zm5.76-7.68c-.32-.16-1.88-.92-2.18-1.02-.3-.12-.52-.16-.74.16-.22.32-.84 1.02-1.04 1.24-.18.22-.38.24-.7.08-.32-.16-1.34-.5-2.56-1.58-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.18.22-.32.32-.54.1-.22.06-.4-.02-.56-.08-.16-.74-1.78-1.02-2.44-.26-.64-.54-.56-.74-.56h-.64c-.22 0-.56.08-.86.4-.3.32-1.14 1.12-1.14 2.72s1.16 3.14 1.32 3.36c.16.22 2.28 3.48 5.52 4.88.78.34 1.38.54 1.86.68.78.24 1.48.2 2.04.12.62-.1 1.88-.76 2.14-1.5.26-.74.26-1.38.18-1.5-.08-.14-.28-.22-.6-.38Z"
    />
  </svg>
</a>
    </main>
  )
}

export default App
