import { PaginationTypes } from './types';

import { PaginationContent, Pages, Page } from './styles';

export const Pagination = ({
  tasksPerPage,
  totalTasks,
  paginate,
  currentPage,
}: PaginationTypes) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContent>
      <Pages>
        {pageNumbers.map((number) => (
          <Page
            onClick={() => paginate(number)}
            key={number}
            className={currentPage === number ? 'currentPage' : ''}
          >
            <p>{number}</p>
          </Page>
        ))}
      </Pages>
    </PaginationContent>
  );
};
