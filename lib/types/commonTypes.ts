export interface PaginatedResponse<T> {
  data: T[];

  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}