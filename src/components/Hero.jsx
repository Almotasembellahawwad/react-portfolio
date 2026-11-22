import { useEffect, useState } from 'react'
import { useT } from '../i18n'

const fmt = () => new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit' })

function Clock() {
  const [t, setT] = useState(fmt) // string state: re-renders only when the minute changes
  useEffect(() => { const id = setInterval(() => setT(fmt()), 1000); return () => clearInterval(id) }, [])
  return <time>{t}</time>
}

const Line = ({ i, children }) => (<span className="ln"><span style={{ '--i': i }}>{children}</span></span>)

// Drawn up to three times: in ink on the page, inverted inside the disc, and (dark theme only)
// in the page colour where it crosses the portrait.
function Text() {
  const { t } = useT()
  return (
    <>
      <h1 className="big"><Line i={0}>{t.first}</Line><Line i={1}>{t.last}</Line></h1>
      <div className="bottom">
        <p className="cap fade">{t.cap}<br /><br />{t.clock} <Clock /></p>
        <h2 className="big r"><Line i={3}>{t.t1}</Line><Line i={4}>{t.t2}</Line></h2>
      </div>
    </>
  )
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="layer"><Text /></div>
      <div className="disc">
        <img className="me me-l" src="/me.png" alt="Portrait of Al-Moatasem Awwad" />
        <img className="me me-d" src="/me-dark.png" alt="" />
        <div className="layer" aria-hidden="true"><Text /></div>
        <div className="layer fx" aria-hidden="true"><Text /></div>
      </div>
    </section>
  )
}
