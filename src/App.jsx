import { useState, useCallback, useEffect } from 'react'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [characterAllowed, setCharacterAllowed] = useState(true)
  const [copied, setCopied] = useState(false)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (characterAllowed) str += '!@#$%^&*()_+[]{}|;:,.<>'
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length)
      pass += str[randomIndex]
    }
    setPassword(pass)
    setCopied(false)
  }, [length, numberAllowed, characterAllowed])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password || '')
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = password || ''
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    }
  }

  useEffect(() => {
    passwordGenerator()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, numberAllowed, characterAllowed])

  return (
    <main className="app-root fade-in">
      <section className="card card-grid">
        <div className="main">
          <div className="header">
            <div>
              <h1 className="title">Password Generator</h1>
              <div className="subtitle">Strong, random passwords — tailored to your needs</div>
            </div>
            <div className="glow float" style={{ marginLeft: 'auto' }}>
              <div className="subtitle">Length: <strong>{length}</strong></div>
            </div>
          </div>

          <div className="result shimmer" aria-live="polite" style={{ marginTop: '1rem' }}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '1.05rem' }}>{password}</div>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              <button className={`btn ${copied ? 'pulse' : ''}`} onClick={copyToClipboard} disabled={!password}>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        <aside className="sidebar">
          <div className="controls">
            <div style={{ width: '100%' }}>
              <label className="subtitle" style={{ display: 'block', marginBottom: '.4rem' }}>Length</label>
              <input className="input range" type="range" min={6} max={64} value={length} onChange={e => setLength(Number(e.target.value))} />
              <div className="subtitle" style={{ marginTop: '.45rem' }}>Selected: <strong>{length}</strong></div>
            </div>

            <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center', marginTop: '.6rem' }}>
              <label style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
                <input className="checkbox" type="checkbox" checked={numberAllowed} onChange={() => setNumberAllowed(v => !v)} />
                <span className="subtitle">Numbers</span>
              </label>
              <label style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
                <input className="checkbox" type="checkbox" checked={characterAllowed} onChange={() => setCharacterAllowed(v => !v)} />
                <span className="subtitle">Special</span>
              </label>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button className="btn" onClick={passwordGenerator}>Generate</button>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
