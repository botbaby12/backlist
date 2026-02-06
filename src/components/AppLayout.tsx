import { ReactNode } from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { DealGrade, ListingSource } from '@/types/listing';

interface AppLayoutProps {
  children: ReactNode;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  selectedGrades?: DealGrade[];
  selectedSources?: ListingSource[];
  onGradeChange?: (grades: DealGrade[]) => void;
  onSourceChange?: (sources: ListingSource[]) => void;
}

export function AppLayout({ 
  children, 
  searchQuery = '', 
  onSearchChange,
  selectedGrades = [],
  selectedSources = [],
  onGradeChange,
  onSourceChange,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <DesktopSidebar 
        selectedGrades={selectedGrades}
        selectedSources={selectedSources}
        onGradeChange={onGradeChange}
        onSourceChange={onSourceChange}
      />
      
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
