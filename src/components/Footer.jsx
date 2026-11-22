import { useT } from '../i18n'
import { links } from '../data'
export default function Footer() {
  const { t } = useT()
  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} {t.first} {t.last}</span>
      <span>{t.f3[0]}</span>
      <span className="fl">
        <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={links.instagram} target="_blank" rel="noreferrer">Instagram</a>
      </span>
    </footer>
  )
}
