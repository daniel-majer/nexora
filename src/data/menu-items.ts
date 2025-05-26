import {
  UsersRoundIcon,
  ChartColumnBigIcon,
  PackageOpenIcon,
  ShoppingCartIcon,
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
  { name: "Create user", path: "/users", icon: UsersRoundIcon },
];

export default menuNames;
