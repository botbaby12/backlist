import { useNavigate } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import { List, Bell, Heart, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Feed', icon: List },
  { to: '/dashboard/alerts', label: 'Alerts', icon: Bell },
  { to: '/dashboard/saved', label: 'Saved', icon: Heart },
];

export function MobileBottomNav() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/dashboard'}
              className={cn(
                'flex flex-col items-center gap-1 px-6 py-2 text-muted-foreground',
                'transition-colors'
              )}
              activeClassName="text-primary"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-6 py-2 text-muted-foreground transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
