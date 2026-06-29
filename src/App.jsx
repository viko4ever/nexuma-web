import { useState } from 'react'
import './App.css'
import ThreeLabV4 from './components/ThreeLabV4'
import HomeSelector from './components/v6/HomeSelector'
import PymesLanding from './components/v6/PymesLanding'

const logoCandidates = [
  '/assets/nexuma/nexuma-isotype-transparent.png',
  '/assets/nexuma/nexuma-isotype-transparent.svg',
  '/assets/nexuma/nexuma-logo-transparent.png',
  '/assets/nexuma/nexuma-logo.png',
  '/assets/nexuma/logo.png',
]

function NexumaLogo() {
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (index < logoCandidates.length - 1) {
      setIndex((current) => current + 1)
      return
    }
    setFailed(true)
  }

  return (
    <a className="v6-logo-lockup" href="/" aria-label="Nexuma Consulting Group">
      {!failed && (
        <span className="v6-logo-mark-shell">
          <img
            src={logoCandidates[index]}
            alt="Nexuma"
            className="v6-logo-mark"
            onError={handleError}
          />
        </span>
      )}
      <span className="v6-logo-type">
        <strong>NEXUMA</strong>
        <small>CONSULTING GROUP</small>
      </span>
    </a>
  )
}

function V6Shell({ children }) {
  return (
    <div className="nexuma-v6">
      <div className="v6-bg-grid" aria-hidden="true" />
      <header className="v6-site-header">
        <NexumaLogo />
      </header>
      {children}
    </div>
  )
}

function App() {
  const path = window.location.pathname

  if (path === '/empresas') return <ThreeLabV4 />

  return (
    <V6Shell>
      {path === '/pymes' ? <PymesLanding /> : <HomeSelector />}
    </V6Shell>
  )
}

export default App
