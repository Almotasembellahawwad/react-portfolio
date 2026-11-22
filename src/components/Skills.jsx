import { useT } from '../i18n'
import Reveal from './Reveal'
export default function Skills() {
  const { t } = useT()
  return (
    <section className="sec about" id="skills">
      <div className="lab">{t.toolkit}</div>
      <div>
        {t.tk.map(([k, v], i) => (
          <Reveal key={k} delay={i * 70} className="tk"><span>{k}</span><span dir="ltr">{v}</span></Reveal>
        ))}
      </div>
    </section>
  )
}
