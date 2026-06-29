import React from 'react'

const enterpriseWindows = Array.from({ length: 72 }, (_, i) => ({
  x: 126 + (i % 6) * 17,
  y: 108 + Math.floor(i / 6) * 18,
  o: 0.2 + ((i % 5) * 0.13),
}))

const sideWindows = Array.from({ length: 44 }, (_, i) => ({
  x: 46 + (i % 4) * 15,
  y: 158 + Math.floor(i / 4) * 17,
  o: 0.18 + ((i % 4) * 0.12),
}))

const rightTowerWindows = Array.from({ length: 48 }, (_, i) => ({
  x: 256 + (i % 4) * 15,
  y: 146 + Math.floor(i / 4) * 17,
  o: 0.2 + ((i % 5) * 0.12),
}))

const particles = [
  [64, 58, 1.1], [92, 82, 1.4], [332, 74, 1], [352, 126, 1.3], [308, 42, 1], [28, 210, 0.9],
  [366, 246, 1.1], [118, 34, 1], [198, 44, 1.4], [220, 78, 0.9], [78, 316, 1.2], [342, 332, 1],
  [174, 70, 0.8], [286, 92, 1.2], [40, 88, 0.9], [374, 180, 0.8], [104, 356, 1], [254, 52, 0.7],
]

function SvgFrame({ children, className = '', viewBox = '0 0 420 360' }) {
  return (
    <svg className={`v6-neon-svg ${className}`} viewBox={viewBox} role="img" aria-hidden="true">
      <defs>
        <filter id="v6-glow-blue" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 0 0 0 0.42  0 0 0 0 1  0 0 0 .72 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="v6-glow-cyan" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 0 0 0 .95  0 0 0 0 1  0 0 0 .7 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="v6-glow-green" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 .12  0 0 0 0 1  0 0 0 0 .48  0 0 0 .72 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="v6-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="v6-blue-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00d8ff" />
          <stop offset="0.52" stopColor="#0077ff" />
          <stop offset="1" stopColor="#63f7ff" />
        </linearGradient>
        <linearGradient id="v6-cyan-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#63fff0" />
          <stop offset="0.5" stopColor="#00e7ff" />
          <stop offset="1" stopColor="#00a78f" />
        </linearGradient>
        <linearGradient id="v6-panel-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b7cff" stopOpacity="0.26" />
          <stop offset="1" stopColor="#00e7ff" stopOpacity="0.04" />
        </linearGradient>
        <pattern id="v6-floor-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#00e7ff" strokeOpacity="0.16" strokeWidth="1" />
        </pattern>
      </defs>
      {children}
    </svg>
  )
}

function ParticleField({ color = '#63f7ff' }) {
  return (
    <g className="v6-svg-particles">
      {particles.map(([x, y, r], i) => (
        <circle key={`${x}-${y}-${i}`} cx={x} cy={y} r={r} fill={color} opacity={0.24 + (i % 3) * 0.17} />
      ))}
    </g>
  )
}

function GroundGrid({ color = '#00e7ff' }) {
  return (
    <g opacity="0.95">
      <path d="M38 318 L370 318 L336 342 L12 342 Z" fill="url(#v6-floor-grid)" opacity="0.5" />
      <path d="M38 318 L370 318 L336 342 L12 342 Z" fill="none" stroke={color} strokeOpacity="0.56" strokeWidth="1.4" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={`floor-x-${i}`} d={`M${34 + i * 28} 318 L${10 + i * 27} 342`} stroke={color} strokeOpacity="0.2" />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <path key={`floor-y-${i}`} d={`M${26 - i * 5} ${324 + i * 6} L${362 - i * 10} ${324 + i * 6}`} stroke={color} strokeOpacity="0.2" />
      ))}
    </g>
  )
}

export function EnterpriseBuildingVisual({ hero = false }) {
  return (
    <SvgFrame className={hero ? 'v6-enterprise-visual hero' : 'v6-enterprise-visual'}>
      <rect x="0" y="0" width="420" height="360" fill="transparent" />
      <ParticleField color="#63f7ff" />
      <GroundGrid color="#0077ff" />

      <g filter="url(#v6-glow-blue)">
        <path d="M108 318V96L182 66L244 96V318Z" fill="url(#v6-panel-fill)" stroke="url(#v6-blue-line)" strokeWidth="2.4" />
        <path d="M182 66V318" stroke="#63f7ff" strokeOpacity="0.62" />
        <path d="M108 96H244" stroke="#63f7ff" strokeOpacity="0.42" />
        <path d="M108 318L78 338H276L244 318" stroke="#0077ff" strokeWidth="2" />
        <path d="M182 66L182 28" stroke="#63f7ff" strokeWidth="1.4" />
        <circle cx="182" cy="28" r="2" fill="#63f7ff" />

        <path d="M34 318V164L108 138V318Z" fill="rgba(0, 119, 255, 0.12)" stroke="#0077ff" strokeWidth="1.8" />
        <path d="M244 318V136L336 168V318Z" fill="rgba(0, 231, 255, 0.09)" stroke="#00e7ff" strokeWidth="1.8" />
        <path d="M68 164V126L102 110L134 126V148" fill="none" stroke="#00e7ff" strokeWidth="1.5" />
        <path d="M288 166V116L314 102L340 116V176" fill="none" stroke="#63f7ff" strokeWidth="1.5" />

        {enterpriseWindows.map(({ x, y, o }, i) => (
          <rect key={`ew-${i}`} x={x} y={y} width="9" height="10" rx="1" fill="#63f7ff" opacity={o} />
        ))}
        {sideWindows.map(({ x, y, o }, i) => (
          <rect key={`sw-${i}`} x={x} y={y} width="8" height="9" rx="1" fill="#0b7cff" opacity={o} />
        ))}
        {rightTowerWindows.map(({ x, y, o }, i) => (
          <rect key={`rw-${i}`} x={x} y={y} width="8" height="9" rx="1" fill="#00e7ff" opacity={o} />
        ))}

        {Array.from({ length: 9 }, (_, i) => (
          <path key={`h-${i}`} d={`M108 ${114 + i * 22}H244`} stroke="#63f7ff" strokeOpacity="0.18" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <path key={`v-${i}`} d={`M${124 + i * 18} 92V318`} stroke="#63f7ff" strokeOpacity="0.14" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <path key={`r-v-${i}`} d={`M${258 + i * 13} 150V318`} stroke="#00e7ff" strokeOpacity="0.12" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <path key={`l-v-${i}`} d={`M${48 + i * 13} 160V318`} stroke="#0b7cff" strokeOpacity="0.16" />
        ))}

        <g className="v6-building-sign">
          <path d="M130 174H236L252 190H146Z" fill="rgba(0, 24, 55, .86)" stroke="#63f7ff" strokeWidth="1.6" />
          <text x="191" y="188" fill="#ffffff" textAnchor="middle" fontSize="18" fontWeight="900" letterSpacing="1.4">NEXUMA</text>
        </g>

        <path d="M50 318V285H92V318M278 318V276H326V318" stroke="#63f7ff" strokeOpacity="0.7" />
        <path d="M160 318V270H205V318" stroke="#63f7ff" strokeOpacity="0.7" />
        <path d="M116 76L182 34L238 76" stroke="#63f7ff" strokeOpacity="0.7" />
        <path d="M92 138L108 96M244 96L282 148" stroke="#63f7ff" strokeOpacity="0.34" />
      </g>

      <g opacity="0.7">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`beam-${i}`} x1={68 + i * 27} y1="348" x2={78 + i * 23} y2="104" stroke="#0077ff" strokeOpacity="0.07" />
        ))}
      </g>
    </SvgFrame>
  )
}

const shopWindows = Array.from({ length: 30 }, (_, i) => ({
  x: 118 + (i % 5) * 18,
  y: 206 + Math.floor(i / 5) * 14,
  o: 0.18 + (i % 4) * 0.13,
}))

const roofLines = Array.from({ length: 9 }, (_, i) => i)

export function PymeStoreVisual({ hero = false }) {
  return (
    <SvgFrame className={hero ? 'v6-pyme-visual hero' : 'v6-pyme-visual'}>
      <rect x="0" y="0" width="420" height="360" fill="transparent" />
      <ParticleField color="#63fff0" />
      <GroundGrid color="#00e7c8" />

      <g filter="url(#v6-glow-cyan)">
        <path d="M92 306V154H304V306Z" fill="rgba(0, 231, 200, 0.08)" stroke="url(#v6-cyan-line)" strokeWidth="2.2" />
        <path d="M72 154L192 70L330 154Z" fill="rgba(0, 231, 255, 0.08)" stroke="#63fff0" strokeWidth="2.2" />
        <path d="M192 70L232 146L330 154" fill="none" stroke="#63fff0" strokeOpacity="0.45" />
        <path d="M72 154L92 176H304L330 154" stroke="#63fff0" strokeOpacity="0.38" />
        {roofLines.map((i) => (
          <path key={`roof-${i}`} d={`M${90 + i * 19} ${150 - i * 7}L${245 + i * 10} ${150 - i * 2}`} stroke="#63fff0" strokeOpacity={0.16 + i * 0.04} />
        ))}

        <path d="M250 126V72H286V148" fill="rgba(0, 231, 255, 0.07)" stroke="#63fff0" strokeWidth="1.8" />
        <path d="M246 72L270 52L292 72Z" fill="rgba(0, 231, 255, 0.06)" stroke="#63fff0" strokeWidth="1.8" />
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`chim-${i}`} x1={258 + i * 5} y1="82" x2={258 + i * 5} y2="124" stroke="#63fff0" strokeOpacity="0.17" />
        ))}

        <path d="M108 185H288V224H108Z" fill="rgba(0, 24, 38, .82)" stroke="#63fff0" strokeWidth="1.6" />
        <text x="198" y="211" fill="#ffffff" textAnchor="middle" fontSize="24" fontWeight="900" letterSpacing="1.1">NEXUMA</text>
        <path d="M96 224H302L290 246H108Z" fill="rgba(0, 231, 255, 0.10)" stroke="#63fff0" strokeWidth="1.5" />
        {Array.from({ length: 10 }, (_, i) => (
          <path key={`awning-${i}`} d={`M${102 + i * 19} 224L${96 + i * 19} 246`} stroke="#63fff0" strokeOpacity="0.35" />
        ))}

        <rect x="142" y="247" width="46" height="59" fill="rgba(0,0,0,0.22)" stroke="#63fff0" />
        <rect x="204" y="247" width="56" height="42" fill="rgba(0, 231, 255, 0.07)" stroke="#63fff0" />
        <rect x="108" y="247" width="25" height="36" fill="rgba(0, 231, 255, 0.06)" stroke="#63fff0" />
        {shopWindows.map(({ x, y, o }, i) => (
          <rect key={`shopwin-${i}`} x={x} y={y} width="9" height="8" rx="1" fill="#63fff0" opacity={o} />
        ))}

        <path d="M92 306L62 326H334L304 306" stroke="#63fff0" strokeWidth="1.8" fill="rgba(0, 231, 255, 0.04)" />
        <path d="M110 306V284H130V306M266 306V284H286V306" stroke="#63fff0" strokeOpacity="0.42" />

        <g className="v6-tree" opacity="0.8">
          <path d="M52 302V254" stroke="#63fff0" />
          <circle cx="52" cy="244" r="18" fill="none" stroke="#63fff0" />
          <circle cx="38" cy="257" r="13" fill="none" stroke="#63fff0" opacity="0.7" />
          <circle cx="66" cy="258" r="13" fill="none" stroke="#63fff0" opacity="0.7" />
          <path d="M34 306H70" stroke="#63fff0" opacity="0.56" />
        </g>
        <g className="v6-tree" opacity="0.8">
          <path d="M348 302V250" stroke="#63fff0" />
          <circle cx="348" cy="240" r="20" fill="none" stroke="#63fff0" />
          <circle cx="332" cy="256" r="13" fill="none" stroke="#63fff0" opacity="0.7" />
          <circle cx="365" cy="257" r="13" fill="none" stroke="#63fff0" opacity="0.7" />
          <path d="M328 306H368" stroke="#63fff0" opacity="0.56" />
        </g>

        <circle cx="222" cy="110" r="18" fill="none" stroke="#63fff0" opacity="0.72" />
        <path d="M222 92V128M204 110H240" stroke="#63fff0" opacity="0.44" />
        <path d="M96 176H306M96 190H306M96 204H306" stroke="#63fff0" strokeOpacity="0.12" />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`facade-${i}`} x1={112 + i * 24} y1="176" x2={112 + i * 24} y2="306" stroke="#63fff0" strokeOpacity="0.1" />
        ))}
      </g>
    </SvgFrame>
  )
}

function MiniScreen({ label = 'NEXUMA' }) {
  return (
    <g>
      <rect x="126" y="52" width="112" height="72" rx="9" fill="rgba(0, 20, 42, .85)" stroke="#00e7ff" strokeWidth="2" />
      <rect x="140" y="65" width="84" height="38" fill="rgba(0, 119, 255, .12)" stroke="#0b7cff" />
      <text x="182" y="91" fill="#fff" fontSize="13" textAnchor="middle" fontWeight="900">{label}</text>
      <path d="M166 124H198L208 146H156Z" stroke="#00e7ff" fill="rgba(0, 119, 255, .08)" />
      <rect x="150" y="146" width="64" height="12" rx="3" stroke="#00e7ff" fill="rgba(0, 119, 255, .08)" />
    </g>
  )
}

function VisualShell({ children, accent = '#00e7ff' }) {
  return (
    <svg className="v6-service-svg" viewBox="0 0 360 210" aria-hidden="true">
      <defs>
        <filter id="svc-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <pattern id="svc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke={accent} strokeOpacity="0.12" />
        </pattern>
      </defs>
      <rect x="8" y="8" width="344" height="194" rx="20" fill="url(#svc-grid)" stroke={accent} strokeOpacity="0.38" />
      <g filter="url(#svc-glow)" stroke={accent} fill="none" strokeWidth="2">
        {children}
      </g>
    </svg>
  )
}

export function ServiceVisual({ type }) {
  if (type === 'pos') return <VisualShell accent="#0b7cff"><MiniScreen /><rect x="38" y="92" width="50" height="76" rx="7" /><rect x="272" y="92" width="50" height="76" rx="7" /><path d="M48 110H78M48 126H78M48 142H68M284 110H312M284 128H314M284 146H306" /><circle cx="62" cy="158" r="5" /><circle cx="296" cy="158" r="5" /></VisualShell>
  if (type === 'terminals') return <VisualShell accent="#22ff7a"><rect x="134" y="34" width="92" height="142" rx="18" /><rect x="150" y="55" width="60" height="38" rx="6" /><path d="M154 116H206M154 132H206M154 148H190" /><path d="M232 82C258 100 258 130 232 148M246 66C288 98 288 132 246 164" /><rect x="56" y="92" width="54" height="72" rx="8" /><path d="M64 112H100M64 128H96M64 144H88" /></VisualShell>
  if (type === 'inventory') return <VisualShell accent="#ffb020"><path d="M60 74L124 42L188 74L124 106Z" /><path d="M60 74V136L124 174V106M188 74V136L124 174" /><path d="M214 82H306V164H214Z" /><path d="M230 98H288M230 116H300M230 134H274" /><path d="M64 154H182M72 164H174" />{Array.from({ length: 9 }, (_, i) => <line key={i} x1={230 + i * 6} y1="146" x2={230 + i * 6} y2="158" />)}</VisualShell>
  if (type === 'web') return <VisualShell accent="#a855f7"><rect x="54" y="44" width="176" height="116" rx="12" /><path d="M54 72H230" /><circle cx="72" cy="58" r="4" /><circle cx="88" cy="58" r="4" /><circle cx="104" cy="58" r="4" /><rect x="74" y="88" width="55" height="52" rx="6" /><path d="M146 92H206M146 110H194M146 128H212" /><rect x="254" y="76" width="58" height="86" rx="12" /><path d="M266 98H300M266 116H294M266 134H304" /></VisualShell>
  if (type === 'dashboards') return <VisualShell accent="#00a8ff"><rect x="44" y="42" width="272" height="126" rx="14" /><path d="M64 142L104 112L142 126L188 78L236 98L286 60" /><rect x="70" y="70" width="38" height="58" rx="4" /><rect x="124" y="94" width="38" height="34" rx="4" /><rect x="178" y="82" width="38" height="46" rx="4" /><rect x="232" y="68" width="38" height="60" rx="4" /><circle cx="286" cy="60" r="5" /></VisualShell>
  if (type === 'ai') return <VisualShell accent="#22ff7a"><circle cx="180" cy="104" r="38" /><circle cx="180" cy="104" r="62" strokeDasharray="8 10" /><path d="M180 66V38M180 142V174M142 104H94M218 104H266" /><rect x="56" y="78" width="62" height="44" rx="14" /><rect x="242" y="78" width="62" height="44" rx="14" /><path d="M156 96H204M156 112H204M166 128H194" /></VisualShell>
  if (type === 'billing') return <VisualShell accent="#ffb020"><path d="M128 36H228L258 66V174H128Z" /><path d="M228 36V66H258" /><path d="M148 82H232M148 104H238M148 126H218" /><rect x="150" y="142" width="56" height="18" rx="4" /><circle cx="260" cy="140" r="24" /><path d="M248 140L258 150L274 128" /></VisualShell>
  return <VisualShell accent="#b06cff"><circle cx="86" cy="104" r="24" /><circle cx="180" cy="62" r="24" /><circle cx="274" cy="104" r="24" /><circle cx="180" cy="152" r="24" /><path d="M110 104L156 68M204 68L250 104M250 104L204 146M156 146L110 104M180 86V128" /><path d="M74 104H98M168 62H192M262 104H286M168 152H192" /></VisualShell>
}

export default function NeonVisuals({ type, hero = false }) {
  if (type === 'enterprise') return <EnterpriseBuildingVisual hero={hero} />
  if (type === 'pyme') return <PymeStoreVisual hero={hero} />
  return <ServiceVisual type={type} />
}
