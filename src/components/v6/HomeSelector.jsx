import NeonVisuals from './NeonVisuals'

const enterprisePills = [
  ['☁', 'CRM & Salesforce'],
  ['✺', 'IA & Automatización'],
  ['⌘', 'Integraciones'],
  ['▥', 'Dashboards & Datos'],
  ['⬡', 'Arquitectura & Desarrollo'],
]

const pymePills = [
  ['▣', 'POS'],
  ['▤', 'Pagos'],
  ['▥', 'Inventario'],
  ['◎', 'Web'],
  ['▦', 'Dashboards'],
  ['⚙', 'Automatización'],
]

const pymeBusinesses = [
  ['🍽️', 'Restaurantes'],
  ['☕', 'Cafeterías'],
  ['✂️', 'Barberías'],
  ['🌸', 'Estéticas'],
  ['🛍️', 'Boutiques'],
  ['🛒', 'Tiendas'],
]

function RouteCard({ variant, badge, title, text, cta, href, visual, items, children }) {
  return (
    <article className={`v6-route-card v6-route-card-${variant}`} onClick={() => { window.location.href = href }}>
      <div className="v6-card-visual">{visual}</div>
      <div className="v6-card-content">
        <span className="v6-card-badge">{badge}</span>
        <h2>{title}</h2>
        <p>{text}</p>
        <a href={href} onClick={(event) => event.stopPropagation()}>{cta}</a>
      </div>
      {children}
      <div className="v6-card-tools">
        {items.map(([icon, label]) => (
          <span key={label}><b>{icon}</b><small>{label}</small></span>
        ))}
      </div>
    </article>
  )
}

export default function HomeSelector() {
  return (
    <main className="v6-home">
      <section className="v6-hero-copy">
        <h1>Elige el camino tecnológico <span>para tu negocio.</span></h1>
        <p>Una sola firma tecnológica. Dos experiencias diseñadas para resolver necesidades distintas: crecimiento empresarial o digitalización para PyMEs.</p>
      </section>

      <section className="v6-routes-grid" aria-label="Rutas comerciales Nexuma">
        <RouteCard
          variant="enterprise"
          badge="Empresas"
          title="Transformación digital para organizaciones que escalan."
          text="Salesforce, IA, automatización, integraciones, desarrollo a medida, dashboards y arquitectura tecnológica."
          cta="Explorar soluciones empresariales →"
          href="/empresas"
          visual={<NeonVisuals type="enterprise" />}
          items={enterprisePills}
        />

        <RouteCard
          variant="pymes"
          badge="PyMEs"
          title="Herramientas para vender más y controlar mejor."
          text="Punto de Venta, pagos, inventario, página web, dashboards, facturación y automatización."
          cta="Impulsar mi negocio →"
          href="/pymes"
          visual={<NeonVisuals type="pyme" />}
          items={pymePills}
        >
          <div className="v6-mini-business-grid">
            <strong>Negocios que impulsamos</strong>
            <div>
              {pymeBusinesses.map(([icon, label]) => (
                <span key={label}>{icon} {label}</span>
              ))}
            </div>
          </div>
        </RouteCard>
      </section>

      <section className="v6-proof-strip">
        {[
          ['⚡', 'Implementación rápida', 'Puesta en marcha ágil y sin complicaciones.'],
          ['☎', 'Soporte humano real', 'Acompañamiento cercano cuando lo necesitas.'],
          ['↗', 'Escalable a tu ritmo', 'Crece tu sistema a medida que tu negocio crece.'],
          ['◎', 'Todo conectado', 'Tus herramientas trabajando juntas, sin fricción.'],
        ].map(([icon, title, body]) => (
          <article key={title}><b>{icon}</b><div><strong>{title}</strong><p>{body}</p></div></article>
        ))}
      </section>
    </main>
  )
}
