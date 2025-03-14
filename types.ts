// Common interface for shared structure
interface BaseType {
  value: string;
  label: string;
}

// Category type definition
export type Category = BaseType[];

// JobType type definition
export type JobType = BaseType[];
