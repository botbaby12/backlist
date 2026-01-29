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
    <div className="flex h-screen bg-background overflow-hidden">
      <DesktopSidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <MobileHeader
          searchQuery={searchQuery}
          onSearchChange={onSearchChange || (() => {})}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 md:pb-0 -webkit-overflow-scrolling-touch">
          {children}
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
