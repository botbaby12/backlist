import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DealGrade, ListingSource } from '@/types/listing';
import { ChevronDown, Filter } from 'lucide-react';

interface FilterBarProps {
  selectedGrades: DealGrade[];
  selectedSources: ListingSource[];
  onGradeChange: (grades: DealGrade[]) => void;
  onSourceChange: (sources: ListingSource[]) => void;
}

const dealGrades: { value: DealGrade; label: string }[] = [
  { value: 'steal', label: 'Steal' },
  { value: 'great', label: 'Great' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'pass', label: 'Pass' },
];

const sources: { value: ListingSource; label: string }[] = [
  { value: 'facebook', label: 'FB Marketplace' },
  { value: 'autotrader', label: 'AutoTrader' },
  { value: 'carscom', label: 'Cars.com' },
  { value: 'craigslist', label: 'Craigslist' },
];

export function FilterBar({ selectedGrades, selectedSources, onGradeChange, onSourceChange }: FilterBarProps) {
  const toggleGrade = (grade: DealGrade) => {
    if (selectedGrades.includes(grade)) {
      onGradeChange(selectedGrades.filter(g => g !== grade));
    } else {
      onGradeChange([...selectedGrades, grade]);
    }
  };

  const toggleSource = (source: ListingSource) => {
    if (selectedSources.includes(source)) {
      onSourceChange(selectedSources.filter(s => s !== source));
    } else {
      onSourceChange([...selectedSources, source]);
    }
  };

  const gradeLabel = selectedGrades.length === 0 
    ? 'All Deals' 
    : selectedGrades.length === 1 
      ? dealGrades.find(g => g.value === selectedGrades[0])?.label 
      : `${selectedGrades.length} selected`;

  const sourceLabel = selectedSources.length === 0 
    ? 'All Sources' 
    : selectedSources.length === 1 
      ? sources.find(s => s.value === selectedSources[0])?.label 
      : `${selectedSources.length} selected`;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Filter className="h-4 w-4 text-muted-foreground" />
      
      {/* Deal Grade Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            {gradeLabel}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {dealGrades.map(({ value, label }) => (
            <DropdownMenuCheckboxItem
              key={value}
              checked={selectedGrades.includes(value)}
              onCheckedChange={() => toggleGrade(value)}
            >
              {label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Source Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            {sourceLabel}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {sources.map(({ value, label }) => (
            <DropdownMenuCheckboxItem
              key={value}
              checked={selectedSources.includes(value)}
              onCheckedChange={() => toggleSource(value)}
            >
              {label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters */}
      {(selectedGrades.length > 0 || selectedSources.length > 0) && (
        <Button
          size="sm"
          variant="ghost"
          className="h-8 text-xs text-muted-foreground"
          onClick={() => {
            onGradeChange([]);
            onSourceChange([]);
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
}
