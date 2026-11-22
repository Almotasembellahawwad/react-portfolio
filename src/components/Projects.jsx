import { useState } from 'react'
import { projects as seed } from '../data'
import { useT } from '../i18n'
import useInView from '../useInView'
import TLink from './TLink'
import Plate from './Plate'

function Row({ p, i, open, onToggle }) {
  const { t, lang } = useT()
  const [ref, seen] = useInView()
  const c = p[lang]
  return (
    <div className={`row${seen ? ' in' : ''}`} ref={ref} style={{ '--d': `${i * 80}ms` }}>
      <button onClick={onToggle} aria-expanded={open}>
        <b className="nm"><span>{p.name}</span></b><i>{c.tag}</i>
      </button>
      <div className={`pw${open ? ' open' : ''}`}>
        <div className="pi">
          <div className="panel">
            <div>
              <p>{c.line}</p>
              <p className="st">{t.st[p.status]}</p>
              <TLink className="lnk" to={`/projects/${p.slug}`} tabIndex={open ? 0 : -1}>{t.viewp}</TLink>
            </div>
            <div className="pl"><Plate kind={p.plate} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useT()
  const [items] = useState(seed)
  const [open, setOpen] = useState(0)
  return (
    <section className="sec" id="projects">
      <div className="lab"><span>{t.sel}</span><span>{items.length}</span></div>
      {items.map((p, i) => (
        <Row key={p.slug} p={p} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
      ))}
    </section>
  )
}
