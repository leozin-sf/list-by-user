import styled from '@emotion/styled';

export const PaginationContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Pages = styled.div`
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
`;

export const Page = styled.div<{ isActive: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(p) =>
    p.isActive
      ? p.theme.colors.toDoListPage.bgButtonColor
      : p.theme.colors.white};
  color: ${(p) =>
    p.isActive
      ? p.theme.colors.white
      : p.theme.colors.toDoListPage.bgButtonColor};
  border: 0.0625rem solid ${(p) => p.theme.colors.toDoListPage.bgButtonColor};
  transition:
    background-color 0.3s,
    color 0.3s;

  & a {
    text-decoration: none;
    color: inherit;
    font-size: 0.875rem;
  }

  &:hover {
    background-color: ${(p) => p.theme.colors.toDoListPage.bgButtonColor};
    color: ${(p) => p.theme.colors.white};
  }
`;
