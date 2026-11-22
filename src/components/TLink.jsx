import { Link, NavLink } from 'react-router-dom'
import { useT } from '../i18n'

// A link whose navigation opens as a circle growing from the click point.
export default function TLink({ to, nav, onClick, children, ...rest }) {
  const { go } = useT()
  const C = nav ? NavLink : Link
  const click = e => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    go(to, e)
  }
  return <C to={to} onClick={click} {...rest}>{children}</C>
}
