import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Home, AboutPage, ProjectsPage, ProjectPage, ContactPage, NotFound } from './pages'
import { Lang, dict, useT } from './i18n'
import { projects } from './data'

function Layout(props) {
  const { pathname } = useLocation()
  const { lang, t } = useT()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  // Synchronize document title and meta description dynamically based on route and language
  useEffect(() => {
    let pageTitle = ''
    let pageDesc = ''

    if (pathname === '/') {
      pageTitle = lang === 'ar'
        ? 'المعتصم عوّاد | مطوّر واجهات أمامية وهندسة الذكاء الاصطناعي'
        : 'Al-Moatasem Awwad | Creative Technologist & Product Engineer'
      pageDesc = lang === 'ar'
        ? 'معرض الأعمال الهندسية للمعتصم بالله عوّاد. تطوير منتجات برمجية، واجهات تفاعلية ثلاثية الأبعاد، وأنظمة ذكاء اصطناعي متقدمة.'
        : 'Crafting high-performance digital products, interactive 3D web experiences, and intelligent AI systems. Explore curated engineering case studies and technical experiments by Al-Moatasem Awwad.'
    } else if (pathname === '/about') {
      pageTitle = `${t.about} | ${lang === 'ar' ? 'المعتصم عوّاد' : 'Al-Moatasem Awwad'}`
      pageDesc = lang === 'ar' ? t.stmt : 'Background, technical discipline, and engineering philosophy of Al-Moatasem Awwad.'
    } else if (pathname === '/projects') {
      pageTitle = `${t.projects} | ${lang === 'ar' ? 'المعتصم عوّاد' : 'Al-Moatasem Awwad'}`
      pageDesc = lang === 'ar'
        ? 'سجل المشاريع البرمجية والأنظمة الرقمية التي بناها المعتصم عوّاد.'
        : 'Selected software projects, case studies, and engineering implementations by Al-Moatasem Awwad.'
    } else if (pathname.startsWith('/projects/')) {
      const slug = pathname.replace('/projects/', '')
      const p = projects.find(x => x.slug === slug)
      if (p) {
        pageTitle = `${p.name} | ${lang === 'ar' ? 'المعتصم عوّاد' : 'Al-Moatasem Awwad'}`
        pageDesc = p[lang]?.line || p[lang]?.problem || ''
      }
    } else if (pathname === '/contact') {
      pageTitle = `${t.contact} | ${lang === 'ar' ? 'المعتصم عوّاد' : 'Al-Moatasem Awwad'}`
      pageDesc = lang === 'ar'
        ? 'تواصل مع المعتصم عوّاد لمناقشة فرص العمل، المشاريع البرمجية، أو الاستشارات التقنية.'
        : 'Get in touch with Al-Moatasem Awwad for engineering roles, project inquiries, or technical collaborations.'
    }

    if (pageTitle) document.title = pageTitle
    if (pageDesc) {
      const descEl = document.querySelector('meta[name="description"]')
      if (descEl) descEl.setAttribute('content', pageDesc)
      const ogDescEl = document.querySelector('meta[property="og:description"]')
      if (ogDescEl) ogDescEl.setAttribute('content', pageDesc)
    }
  }, [pathname, lang, t])

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <Header {...props} />
      <Outlet />
      <Footer />
    </>
  )
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
