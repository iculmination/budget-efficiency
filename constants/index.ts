import {
  LayoutDashboard,
  Wallet,
  List,
  PiggyBank,
  BarChart,
  Settings,
} from "lucide-react";

export const navItems = [
  { name: "Dashboard", href: "/main", icon: LayoutDashboard },
  { name: "Wallet", href: "/main/wallet", icon: Wallet },
  { name: "Transactions", href: "/main/transactions", icon: List },
  { name: "Budget", href: "/main/budget", icon: BarChart },
  { name: "Savings", href: "/main/savings", icon: PiggyBank },
  { name: "Settings", href: "/main/settings", icon: Settings },
];
