import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Home, AboutPage, ProjectsPage, ProjectPage, ContactPage, NotFound } from './pages'
import { Lang, dict } from './i18n'

function Layout(props) {
  const { pathname } = useLocation()
  useLayoutEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return (<><div className="progress" aria-hidden="true" /><Header {...props} /><Outlet /><Footer /></>)
}

export default function App() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  const [lang, setLang] = useState(() => document.documentElement.lang === 'ar' ? 'ar' : 'en')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* storage unavailable */ }
  }, [theme])
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try { localStorage.setItem('lang', lang) } catch { /* storage unavailable */ }
  }, [lang])

  // One motif for every change of state: a circle of the new view grows from where you pressed.
  const wipe = (update, e) => {
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return update()
    const x = e?.clientX ?? innerWidth / 2, y = e?.clientY ?? innerHeight / 2
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.startViewTransition(() => flushSync(update)).ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 800, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' }))
  }
  const toggle = e => {
    const next = theme === 'dark' ? 'light' : 'dark'
    wipe(() => { document.documentElement.dataset.theme = next; setTheme(next) }, e)
  }
  const toggleLang = () => setLang(l => (l === 'en' ? 'ar' : 'en'))
  const go = (to, e) => wipe(() => navigate(to), e)
  const ctx = useMemo(() => ({ t: dict[lang], lang, go }), [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Lang.Provider value={ctx}>
      <Routes>
        <Route element={<Layout theme={theme} toggle={toggle} toggleLang={toggleLang} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Lang.Provider>
  )
}
