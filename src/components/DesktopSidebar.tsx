import { useNavigate } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import { List, Heart, Bell, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Listings', icon: List },
  { to: '/dashboard/alerts', label: 'Alerts', icon: Bell },
  { to: '/dashboard/saved', label: 'Saved', icon: Heart },
];

export function DesktopSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Backlist
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/dashboard'}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground',
                  'hover:bg-accent hover:text-accent-foreground transition-colors'
                )}
                activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
