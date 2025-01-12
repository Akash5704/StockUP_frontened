import { Menu, X, LayoutDashboard, User, Briefcase, LogOut } from 'lucide-react';
export const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/home' },
  { label: 'Profile', icon: <User className="w-5 h-5" />, href: '/profile' },
  { label: 'Portfolio', icon: <Briefcase className="w-5 h-5" />, href: '/portfolio' },
];