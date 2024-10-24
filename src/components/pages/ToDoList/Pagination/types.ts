export interface PaginationTypes {
  tasksPerPage: number;
  totalTasks: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}
