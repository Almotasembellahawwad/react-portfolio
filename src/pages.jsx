import { useParams } from 'react-router-dom'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Plate from './components/Plate'
import Reveal from './components/Reveal'
import TLink from './components/TLink'
import { projects } from './data'
import { useT } from './i18n'

function Page({ title, children }) {
  return (<main className="page"><h1 className="big pt">{title}</h1>{children}</main>)
}

function About() {
  const { t } = useT()
  const fact = a => a.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)
  return (
    <section className="sec about">
      <div className="lab">{t.about}</div>
      <div>
        <p className="stmt">{t.stmt}</p>
        <div className="facts"><span>{fact(t.f1)}</span><span>{fact(t.f2)}</span><span>{fact(t.f3)}</span></div>
        <ol className="how">
          {t.how.map((h, i) => <Reveal as="li" key={i} delay={i * 90}>{h}</Reveal>)}
        </ol>
      </div>
    </section>
  )
}

export const Home = () => (<main><Hero /><About /><Projects /><Skills /><Contact /></main>)
export function AboutPage() { const { t } = useT(); return <Page title={t.about}><About /><Skills /></Page> }
export function ProjectsPage() { const { t } = useT(); return <Page title={t.projects}><Projects /></Page> }
export function ContactPage() { const { t } = useT(); return <Page title={t.contact}><Contact /></Page> }

function Block({ label, children }) {
  return (<section className="sec about"><div className="lab">{label}</div><div>{children}</div></section>)
}

export function ProjectPage() {
  const { slug } = useParams()
  const { t, lang } = useT()
  const i = projects.findIndex(x => x.slug === slug)
  if (i < 0) return <NotFound />
  const p = projects[i], c = p[lang], next = projects[(i + 1) % projects.length], k = t.cs
  return (
    <main className="page">
      <header className="cs-top">
        <p className="tag">{c.tag}</p>
        <h1 className="big">{p.name}</h1>
        <p className="stmt">{c.line}</p>
      </header>
      <div className="plate-wrap"><Plate kind={p.plate} /></div>
      <dl className="meta">
        <div><dt>{k.status}</dt><dd>{t.st[p.status]}</dd></div>
        <div><dt>{k.role}</dt><dd>{k.roleV}</dd></div>
        <div><dt>{k.stack}</dt><dd className="chips">{p.stack.map(s => <span key={s}>{s}</span>)}</dd></div>
        <div><dt>{k.links}</dt><dd className="ll">
          {p.live && <a href={p.live} target="_blank" rel="noreferrer">{k.live}</a>}
          <a href={`https://github.com/Almotasembellahawwad/${p.repo}`} target="_blank" rel="noreferrer">{k.repo}</a>
        </dd></div>
      </dl>
      <Block label={k.problem}><Reveal as="p" className="stmt s2">{c.problem}</Reveal></Block>
      <Block label={k.built}><ul className="blist">{c.built.map((b, j) => <Reveal as="li" key={j} delay={j * 70}>{b}</Reveal>)}</ul></Block>
      <Block label={k.flow}><Reveal className="flow">{c.flow.map((f, j) => <span key={j}>{f}</span>)}</Reveal></Block>
      <Block label={k.decisions}><div className="dec">{c.decisions.map((d, j) => <Reveal as="p" key={j} delay={j * 80}>{d}</Reveal>)}</div></Block>
      <TLink className="next" to={`/projects/${next.slug}`}>
        <span className="lab">{k.next}</span>
        <b>{next.name}</b>
      </TLink>
    </main>
  )
}

export function NotFound() {
  const { t } = useT()
  return (<Page title={t.nf}><section className="sec"><p className="stmt">{t.nf2}</p><TLink className="lnk" to="/">{t.back}</TLink></section></Page>)
}
