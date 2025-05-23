import {
  ChartColumnBigIcon,
  HeartHandshakeIcon,
  PackageOpenIcon,
  ShoppingCartIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

const menuNames: MenuItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: ChartColumnBigIcon },
  { name: "Orders", path: "/orders", icon: ShoppingCartIcon },
  { name: "Products", path: "/products", icon: PackageOpenIcon },
];

export default menuNames;
