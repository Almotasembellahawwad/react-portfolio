// Small line drawings, one per project. They draw from the project's own subject, in the page ink.
const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
const pts = (n, f) => Array.from({ length: n }, (_, i) => f(i))

export default function Plate({ kind }) {
  let g = null
  if (kind === 'globe') g = (<>
    <circle cx="300" cy="180" r="150" {...s} />
    {[50, 100].map(r => <ellipse key={r} cx="300" cy="180" rx="150" ry={r} {...s} opacity=".55" />)}
    {[60, 110].map(r => <ellipse key={r} cx="300" cy="180" rx={r} ry="150" {...s} opacity=".55" />)}
    {[[240, 120], [360, 150], [300, 235], [395, 215], [215, 205], [330, 95]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="currentColor" />)}
    <circle cx="360" cy="150" r="16" {...s} />
  </>)
  if (kind === 'pipeline') g = (<>
    {[0, 1, 2, 3].map(i => (
      <g key={i}>
        <rect x={40 + i * 142} y={80 + (i % 2) * 40} width="112" height={200 - (i % 2) * 80} {...s} />
        <line x1={40 + i * 142} y1={120 + (i % 2) * 40} x2={152 + i * 142} y2={120 + (i % 2) * 40} {...s} />
        {i < 3 && <line x1={152 + i * 142} y1="180" x2={182 + i * 142} y2="180" {...s} />}
      </g>
    ))}
  </>)
  if (kind === 'map') g = (<>
    {[[110, 90], [110, 270], [300, 50], [490, 80], [490, 180], [490, 285]].map(([x, y], i) => (
      <g key={i}><line x1="300" y1="180" x2={x} y2={y} {...s} /><circle cx={x} cy={y} r="11" {...s} /></g>
    ))}
    {[[565, 140], [565, 220]].map(([x, y], i) => <g key={i}><line x1="490" y1="180" x2={x} y2={y} {...s} /><circle cx={x} cy={y} r="6" fill="currentColor" /></g>)}
    <circle cx="300" cy="180" r="30" {...s} /><circle cx="300" cy="180" r="6" fill="currentColor" />
  </>)
  if (kind === 'pulse') g = (<>
    <line x1="20" y1="230" x2="580" y2="230" {...s} opacity=".4" />
    <polyline points="20,220 80,190 140,235 200,150 260,172 320,88 380,142 440,110 500,205 580,128" {...s} strokeWidth="2" />
    {pts(14, i => <rect key={i} x={30 + i * 40} y={300 - (14 + ((i * 37) % 46))} width="16" height={14 + ((i * 37) % 46)} {...s} opacity=".6" />)}
  </>)
  if (kind === 'wave') g = (<>
    {pts(48, i => { const h = 16 + Math.abs(Math.sin(i * 0.52) * Math.cos(i * 0.17)) * 150; return <line key={i} x1={26 + i * 11.6} y1={180 - h / 2} x2={26 + i * 11.6} y2={180 + h / 2} {...s} strokeWidth="2.5" strokeLinecap="round" /> })}
    <circle cx="300" cy="180" r="165" {...s} opacity=".3" />
  </>)
  if (kind === 'window') g = (<>
    {[[40, 40, 300, 200], [190, 100, 300, 200], [320, 150, 240, 170]].map(([x, y, w, h], i) => (
      <g key={i}><rect x={x} y={y} width={w} height={h} fill="var(--bg)" stroke="currentColor" strokeWidth="1.5" /><line x1={x} y1={y + 26} x2={x + w} y2={y + 26} {...s} />{[0, 1, 2].map(k => <circle key={k} cx={x + 14 + k * 14} cy={y + 13} r="3.5" fill="currentColor" />)}</g>
    ))}
    <polygon points="470,250 470,300 483,289 492,309 501,305 492,285 509,285" fill="currentColor" />
  </>)
  return <svg className="plate" viewBox="0 0 600 360" aria-hidden="true">{g}</svg>
}
