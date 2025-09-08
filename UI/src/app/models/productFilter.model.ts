export interface ProductFilter {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  unit?: string;
  sortBy?: string;
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}