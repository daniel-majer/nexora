import {
  ChartColumnBigIcon,
  HeartHandshakeIcon,
  PackageOpenIcon,
  ShoppingCartIcon,
  UsersIcon,
} from 'lucide-react'
import type { MenuItem } from '../types/types'

const menuNames: MenuItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: ChartColumnBigIcon },
  { name: 'Orders', path: '/orders', icon: ShoppingCartIcon },
  { name: 'Products', path: '/products', icon: PackageOpenIcon },
  { name: 'Customers', path: '/customers', icon: UsersIcon },
  { name: 'Employees', path: '/employees', icon: HeartHandshakeIcon },
]

export default menuNames
