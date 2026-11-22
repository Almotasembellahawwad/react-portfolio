import { useState } from 'react'
import { useT } from '../i18n'
import { links } from '../data'

const rules = {
  name: v => v.trim().length < 2 && 'e_name',
  email: v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && 'e_email',
  message: v => v.trim().length < 10 && 'e_msg',
}
const empty = { name: '', email: '', message: '' }

export default function Contact() {
  const { t } = useT()
  const [v, setV] = useState(empty)
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const check = k => rules[k](v[k]) || ''
  const onChange = e => {
    const { name, value } = e.target
    setSent(false); setV({ ...v, [name]: value })
    if (err[name]) setErr({ ...err, [name]: '' })
  }
  const onBlur = e => setErr({ ...err, [e.target.name]: check(e.target.name) })
  const submit = e => {
    e.preventDefault()
    const next = Object.fromEntries(Object.keys(rules).map(k => [k, check(k)]))
    setErr(next)
    if (Object.values(next).some(Boolean)) return
    // No backend: open the visitor's mail app with the message filled in.
    const subject = encodeURIComponent(`Portfolio message from ${v.name}`)
    const body = encodeURIComponent(`${v.message}\n\n${v.name} (${v.email})`)
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`
    setSent(true); setV(empty)
  }
  const field = (k, label, Tag = 'input', extra = {}) => (
    <div>
      <label htmlFor={k}>{label}</label>
      <Tag id={k} name={k} value={v[k]} onChange={onChange} onBlur={onBlur} aria-invalid={!!err[k]} {...extra} />
      {err[k] && <p className="err" role="alert">{t[err[k]]}</p>}
    </div>
  )
  return (
    <section className="contact" id="contact">
      <div>
        <h2>{t.cta} <em>{t.cta2}</em></h2>
        <p className="mail"><a href={`mailto:${links.email}`}>{links.email}</a></p>
      </div>
      <form onSubmit={submit} noValidate>
        {field('name', t.name, 'input', { type: 'text', autoComplete: 'name' })}
        {field('email', t.email, 'input', { type: 'email', autoComplete: 'email' })}
        {field('message', t.msg, 'textarea', { rows: 3 })}
        <button className="send" type="submit">{t.send}</button>
        {sent && <p role="status">{t.ok}</p>}
      </form>
    </section>
  )
}
