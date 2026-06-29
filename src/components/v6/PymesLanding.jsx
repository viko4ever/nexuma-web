import { useEffect, useRef, useState } from 'react'
import NeonVisuals from './NeonVisuals'

const services = [
  {
    id: 'pos',
    title: 'Punto de Venta (POS)',
    badge: 'VENDER MÁS',
    icon: '▦',
    offers: ['Ventas en mostrador, por mesa o para llevar.', 'Múltiples métodos de pago.', 'Tickets, comandas y cortes de caja.', 'Control de empleados, turnos y permisos.', 'Reportes de ventas en tiempo real.'],
    purpose: 'Para cobrar más rápido, evitar errores manuales y tener control total de ventas, caja y operación desde un solo lugar.',
    helps: ['Cobras más rápido y con mejor control.', 'Reduces filas, errores y fugas de dinero.', 'Sabes qué vendes, cuándo vendes y quién vende.', 'Tomas decisiones con datos reales, no con suposiciones.'],
  },
  {
    id: 'terminals',
    title: 'Terminales de Pago',
    badge: 'COBRAR MEJOR',
    icon: '▤',
    offers: ['Cobros con tarjeta, chip y contactless.', 'Liga de pago para ventas remotas.', 'Registro de pagos por venta o servicio.', 'Conciliación operativa más sencilla.'],
    purpose: 'Para que tu negocio acepte más formas de pago sin complicar la operación diaria.',
    helps: ['Aumentas conversión al aceptar tarjeta.', 'Reduces pérdida de ventas por falta de efectivo.', 'Mejoras experiencia de compra.', 'Controlas mejor tus cobros.'],
  },
  {
    id: 'inventory',
    title: 'Inventario',
    badge: 'CONTROLAR MEJOR',
    icon: '⬡',
    offers: ['Alta de productos, categorías y precios.', 'Entradas, salidas y ajustes.', 'Alertas de bajo stock.', 'Costos, utilidad y productos más vendidos.'],
    purpose: 'Para dejar de perder dinero por faltantes, compras mal calculadas o mercancía que no rota.',
    helps: ['Compras con mejor información.', 'Evitas pérdidas y desabasto.', 'Detectas productos ganadores.', 'Controlas margen y utilidad.'],
  },
  {
    id: 'web',
    title: 'Página Web Profesional',
    badge: 'VENDER 24/7',
    icon: '◎',
    offers: ['Sitio web responsive.', 'Catálogo, formularios y WhatsApp.', 'SEO base y analítica.', 'Landing para campañas y promociones.'],
    purpose: 'Para que tus clientes te encuentren, conozcan tu negocio y te contacten aunque no estés abierto.',
    helps: ['Aumentas presencia digital.', 'Recibes prospectos por WhatsApp.', 'Das imagen profesional.', 'Vendes incluso fuera de horario.'],
  },
  {
    id: 'dashboards',
    title: 'Dashboards & Reportes',
    badge: 'DECIDIR MEJOR',
    icon: '▥',
    offers: ['Ventas por día, producto y empleado.', 'Ticket promedio y tendencias.', 'Indicadores de utilidad y operación.', 'Reportes ejecutivos simples.'],
    purpose: 'Para que entiendas el negocio sin revisar hojas sueltas, libretas o múltiples archivos.',
    helps: ['Ves qué funciona y qué no.', 'Detectas oportunidades rápido.', 'Tomas mejores decisiones.', 'Controlas crecimiento con números.'],
  },
  {
    id: 'ai',
    title: 'WhatsApp & IA',
    badge: 'ATENDER MEJOR',
    icon: '✺',
    offers: ['Respuestas automáticas.', 'Preguntas frecuentes.', 'Seguimiento de prospectos.', 'Flujos para cotizaciones y reservas.'],
    purpose: 'Para atender más rápido, contestar dudas repetitivas y no perder clientes por falta de respuesta.',
    helps: ['Atiendes incluso cuando estás ocupado.', 'Reduces mensajes repetitivos.', 'Mejoras seguimiento comercial.', 'No dejas prospectos abandonados.'],
  },
  {
    id: 'billing',
    title: 'Facturación Electrónica',
    badge: 'CUMPLIR FÁCIL',
    icon: '▧',
    offers: ['Flujo de facturación conectado.', 'Datos fiscales organizados.', 'Documentos PDF/XML.', 'Control de ventas facturadas.'],
    purpose: 'Para ordenar el cumplimiento fiscal y reducir errores administrativos.',
    helps: ['Evitas capturas repetidas.', 'Ordenas tus documentos.', 'Ahorras tiempo administrativo.', 'Mejoras control contable.'],
  },
  {
    id: 'automation',
    title: 'Automatización de Procesos',
    badge: 'AHORRAR TIEMPO',
    icon: '⚙',
    offers: ['Recordatorios automáticos.', 'Flujos de autorización.', 'Notificaciones internas.', 'Tareas conectadas entre sistemas.'],
    purpose: 'Para que las tareas repetitivas se ejecuten con menos errores y menos intervención manual.',
    helps: ['Ahorras horas operativas.', 'Reduces olvidos y errores.', 'Ordenas procesos.', 'Escalas sin contratar de más.'],
  },
]

const businessTypes = ['🍽️ Restaurantes', '☕ Cafeterías', '✂️ Barberías', '🌸 Estéticas', '🛍️ Boutiques', '🛒 Tiendas', '🏋️ Gimnasios', '🩺 Consultorios', '🐾 Veterinarias', '🔨 Ferreterías', '📚 Papelerías', '🔧 Talleres']

function RevealOnScroll({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`v6-scroll-reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function ServiceAccordion({ service, isOpen, onToggle }) {
  return (
    <article className={`v6-service ${isOpen ? 'is-open' : ''}`}>
      <button className="v6-service-head" type="button" onClick={onToggle}>
        <span className="v6-service-icon">{service.icon}</span>
        <strong>{service.title}</strong>
        <em>{service.badge}</em>
        <b>{isOpen ? '⌃' : '⌄'}</b>
      </button>
      {isOpen && (
        <div className="v6-service-body">
          <div className="v6-service-col">
            <h3>¿Qué ofrecemos?</h3>
            <ul>{service.offers.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="v6-service-col v6-service-visual-col">
            <h3>¿Para qué es?</h3>
            <p>{service.purpose}</p>
            <NeonVisuals type={service.id} />
          </div>
          <div className="v6-service-col">
            <h3>¿En qué ayudará a tu negocio?</h3>
            <ul>{service.helps.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      )}
    </article>
  )
}


function PymesFooter() {
  return (
    <footer className="v6-site-footer">
      <div className="v6-footer-grid">
        <div className="v6-footer-brand">
          <a className="v6-footer-brand-link" href="/">
            <span className="v6-footer-mark" aria-hidden="true">
              <img src="/assets/nexuma/nexuma-isotype-transparent.png" alt="" />
            </span>
            <div>
              <strong>NEXUMA</strong>
              <span>CONSULTING GROUP</span>
            </div>
          </a>
          <p>Digitalizamos pequeños negocios con Punto de Venta, pagos, inventario, páginas web, dashboards, automatización e inteligencia aplicada a la operación real.</p>
          <div className="v6-footer-socials">
            <a href="https://www.linkedin.com/company/nexuma-consulting-group/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:consultinggroupnexuma@gmail.com">Email</a>
            <a href="https://wa.me/525515288533?text=Hola%20Nexuma%2C%20quiero%20digitalizar%20mi%20PyME." target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>

        <div className="v6-footer-column">
          <h4>Enlaces</h4>
          <a href="/">Inicio</a>
          <a href="/empresas">Empresas</a>
          <a href="/pymes">PyMEs</a>
          <a href="#servicios-pyme">Soluciones</a>
          <a href="https://wa.me/525515288533?text=Hola%20Nexuma%2C%20quiero%20un%20diagn%C3%B3stico%20para%20mi%20negocio." target="_blank" rel="noreferrer">Diagnóstico</a>
        </div>

        <div className="v6-footer-column">
          <h4>Contáctanos</h4>
          <span>Ciudad de México, México</span>
          <a href="mailto:consultinggroupnexuma@gmail.com">consultinggroupnexuma@gmail.com</a>
          <a href="tel:+525515288533">+52 55 1528 8533</a>
          <a href="https://nexumaconsulting.com" target="_blank" rel="noreferrer">nexumaconsulting.com</a>
        </div>

        <div className="v6-footer-column">
          <h4>Síguenos</h4>
          <p>Conectemos para compartir casos, capacidades y la evolución de Nexuma Consulting Group.</p>
          <a className="v6-footer-linkedin" href="https://www.linkedin.com/company/nexuma-consulting-group/" target="_blank" rel="noreferrer">Ir a LinkedIn →</a>
        </div>
      </div>
      <div className="v6-footer-bottom">
        <span>© 2026 Nexuma Consulting Group. Todos los derechos reservados.</span>
        <span>PYMES / BUSINESS SUITE</span>
      </div>
    </footer>
  )
}

function PymesWhatsAppFloating() {
  const message = encodeURIComponent('Hola Nexuma, quiero digitalizar mi PyME y solicitar un diagnóstico.')

  return (
    <a
      className="v6-whatsapp-floating"
      href={`https://wa.me/525515288533?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar a Nexuma por WhatsApp"
    >
      <span className="v6-whatsapp-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="img">
          <path d="M16.04 3.2C9.05 3.2 3.36 8.78 3.36 15.64c0 2.2.6 4.35 1.72 6.23L3.2 28.8l7.14-1.82a12.9 12.9 0 0 0 5.7 1.34c6.99 0 12.68-5.58 12.68-12.44C28.72 8.78 23.03 3.2 16.04 3.2Zm0 22.98a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.24 1.08 1.12-4.05-.26-.42a10.05 10.05 0 0 1-1.55-5.44c0-5.68 4.8-10.3 10.72-10.3 5.9 0 10.7 4.62 10.7 10.3 0 5.69-4.8 10.54-10.7 10.54Zm5.86-7.75c-.32-.16-1.9-.92-2.2-1.02-.29-.1-.5-.16-.72.16-.22.31-.83 1.01-1.02 1.22-.19.2-.38.23-.7.08-.32-.16-1.36-.49-2.59-1.56-.96-.84-1.6-1.88-1.8-2.2-.18-.31-.02-.48.14-.64.14-.14.32-.36.48-.54.16-.18.22-.31.32-.52.11-.21.06-.39-.03-.55-.08-.16-.72-1.7-.99-2.33-.26-.61-.52-.53-.72-.54h-.61c-.22 0-.55.08-.84.39-.29.31-1.1 1.05-1.1 2.56 0 1.5 1.12 2.96 1.28 3.17.16.2 2.2 3.29 5.34 4.6.75.32 1.33.51 1.78.65.75.23 1.44.2 1.98.12.6-.09 1.9-.76 2.17-1.49.27-.73.27-1.36.19-1.49-.08-.13-.29-.2-.62-.36Z" />
        </svg>
      </span>
      <span className="v6-whatsapp-copy">
        <small>WhatsApp directo</small>
        <strong>Diagnóstico PyME</strong>
      </span>
    </a>
  )
}

export default function PymesLanding() {
  const [openId, setOpenId] = useState('pos')

  return (
    <main className="v6-pymes-page">
      <a className="v6-back-home" href="/">← Volver a elegir solución</a>
      <section className="v6-pymes-hero">
        <RevealOnScroll className="v6-pymes-copy" delay={0}>
          <span className="v6-section-kicker">Soluciones para operar y crecer</span>
          <h1>Todo lo que tu negocio necesita, <span>en un solo lugar.</span></h1>
          <p>Tecnología práctica, fácil de usar y diseñada para ayudarte a vender más, controlar mejor y tomar decisiones inteligentes.</p>
        </RevealOnScroll>
        <RevealOnScroll className="v6-pymes-hero-visual" delay={120}><NeonVisuals type="pyme" hero /></RevealOnScroll>
      </section>

      <RevealOnScroll className="v6-business-module" delay={40}>
        <span className="v6-section-kicker">Negocios que impulsamos</span>
        <h2>Soluciones listas para <span>negocios reales.</span></h2>
        <div className="v6-business-grid">
          {businessTypes.map((item) => <span key={item}>{item}</span>)}
        </div>
      </RevealOnScroll>

      <section className="v6-services-list" id="servicios-pyme">
        {services.map((service, index) => (
          <RevealOnScroll key={service.id} delay={Math.min(index * 70, 420)}>
            <ServiceAccordion
              service={service}
              isOpen={openId === service.id}
              onToggle={() => setOpenId(openId === service.id ? null : service.id)}
            />
          </RevealOnScroll>
        ))}
      </section>

      <RevealOnScroll delay={80}><PymesFooter /></RevealOnScroll>
      <PymesWhatsAppFloating />
    </main>
  )
}
