import { useEffect, useState } from 'react'
import { useT } from '../i18n'
import TLink from './TLink'

const items = [['/', 'home'], ['/about', 'about'], ['/projects', 'projects'], ['/contact', 'contact']]

export default function Header({ theme, toggle, toggleLang }) {
  const { t, lang } = useT()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onKey = e => { if (e.key === 'Escape') setOpen(false) }
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  const nav = items.map(([to, k]) => (
    <TLink nav key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{t[k]}</TLink>
  ))
  const sw = (
    <div className="sws">
      <button onClick={toggle} aria-label={t.themeLabel}>{theme === 'light' ? t.dark : t.light}</button>
      <button onClick={toggleLang} aria-label={t.langLabel} lang={lang === 'en' ? 'ar' : 'en'}>{lang === 'en' ? 'عربي' : 'EN'}</button>
    </div>
  )
  return (
    <>
      <header className={`hdr${solid ? ' solid' : ''}`}>
        <TLink to="/" className="mark">{t.first} {t.last}</TLink>
        <div className="hr">
          <nav aria-label="Main">{nav}</nav>
          {sw}
          <button className="menu" onClick={() => setOpen(true)} aria-expanded={open}>{t.menu}</button>
        </div>
      </header>
      {open && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label={t.menu}>
          <div className="sheet-bar">
            <TLink to="/" className="mark sheet-mark" onClick={() => setOpen(false)}>{t.first} {t.last}</TLink>
            <button className="menu" onClick={() => setOpen(false)} aria-label={t.close}>{t.close}</button>
          </div>
          <nav aria-label={t.menu}>{nav}</nav>
          {sw}
        </div>
      )}
    </>
  )
}
