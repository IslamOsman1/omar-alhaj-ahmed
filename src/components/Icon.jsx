import * as Icons from 'lucide-react'
export default function Icon({ name, size = 24, ...props }) {
  const Cmp = Icons[name] || Icons.Box
  return <Cmp size={size} {...props} />
}
