import { ReactNode } from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';

interface AppLayoutProps {
  children: ReactNode;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export function AppLayout({ children, searchQuery = '', onSearchChange }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <DesktopSidebar />
      
      <div className="flex-1 flex flex-col">
        <MobileHeader 
          searchQuery={searchQuery} 
          onSearchChange={onSearchChange || (() => {})} 
        />
        
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        
        <MobileBottomNav />
      </div>
    </div>
  );
}
