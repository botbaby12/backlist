import { useNavigate } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import { List, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { DealGrade, ListingSource } from '@/types/listing';

const navItems = [
  { to: '/dashboard', label: 'Listings', icon: List },
  { to: '/dashboard/saved', label: 'Saved', icon: Heart },
];

const dealGrades: { value: DealGrade; label: string; color: string }[] = [
  { value: 'steal', label: 'Steal', color: 'bg-emerald-500' },
  { value: 'great', label: 'Great', color: 'bg-green-500' },
  { value: 'good', label: 'Good', color: 'bg-blue-500' },
  { value: 'fair', label: 'Fair', color: 'bg-yellow-500' },
  { value: 'pass', label: 'Pass', color: 'bg-gray-400' },
];

const sources: { value: ListingSource; label: string }[] = [
  { value: 'facebook', label: 'FB Marketplace' },
  { value: 'autotrader', label: 'AutoTrader' },
  { value: 'carscom', label: 'Cars.com' },
  { value: 'craigslist', label: 'Craigslist' },
];

interface DesktopSidebarProps {
  selectedGrades?: DealGrade[];
  selectedSources?: ListingSource[];
  onGradeChange?: (grades: DealGrade[]) => void;
  onSourceChange?: (sources: ListingSource[]) => void;
}

export function DesktopSidebar({ 
  selectedGrades = [], 
  selectedSources = [],
  onGradeChange,
  onSourceChange,
}: DesktopSidebarProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const toggleGrade = (grade: DealGrade) => {
    if (!onGradeChange) return;
    if (selectedGrades.includes(grade)) {
      onGradeChange(selectedGrades.filter(g => g !== grade));
    } else {
      onGradeChange([...selectedGrades, grade]);
    }
  };

  const toggleSource = (source: ListingSource) => {
    if (!onSourceChange) return;
    if (selectedSources.includes(source)) {
      onSourceChange(selectedSources.filter(s => s !== source));
    } else {
      onSourceChange([...selectedSources, source]);
    }
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
      <nav className="p-4">
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

      {/* Filters */}
      <div className="flex-1 p-4 border-t border-border overflow-y-auto">
        <h3 className="text-sm font-semibold text-foreground mb-3">Filters</h3>
        
        {/* Deal Grade Filter */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Deal Rating</h4>
          <div className="space-y-2">
            {dealGrades.map(({ value, label, color }) => (
              <label 
                key={value} 
                className="flex items-center gap-3 cursor-pointer hover:bg-accent rounded px-2 py-1.5 -mx-2"
              >
                <Checkbox
                  checked={selectedGrades.includes(value)}
                  onCheckedChange={() => toggleGrade(value)}
                />
                <span className={cn('w-2 h-2 rounded-full', color)} />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Source Filter */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Source</h4>
          <div className="space-y-2">
            {sources.map(({ value, label }) => (
              <label 
                key={value} 
                className="flex items-center gap-3 cursor-pointer hover:bg-accent rounded px-2 py-1.5 -mx-2"
              >
                <Checkbox
                  checked={selectedSources.includes(value)}
                  onCheckedChange={() => toggleSource(value)}
                />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedGrades.length > 0 || selectedSources.length > 0) && (
          <Button
            size="sm"
            variant="outline"
            className="w-full text-xs"
            onClick={() => {
              onGradeChange?.([]);
              onSourceChange?.([]);
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

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
