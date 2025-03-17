// Common interface for shared structure
interface BaseType {
  value: string;
  label: string;
}

// Category type definition
export type Category = BaseType[];

// JobType type definition
export type JobType = BaseType[];

export interface FilterValues {
  searchTerm: string;
  jobType: string;
  location: string;
}

export interface FilterProps {
  onFilterChange: (filters: FilterValues) => void;
}
