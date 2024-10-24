import styled from '@emotion/styled';

export const PaginationContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Pages = styled.div`
  display: flex;
  gap: 8px;
  list-style: none;
  padding: 0;
`;

export const Page = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.className === 'currentPage' ? '#007BFF' : '#FFFFFF'};
  color: ${(props) =>
    props.className === 'currentPage' ? '#FFFFFF' : '#007BFF'};
  border: 1px solid #007bff;
  transition:
    background-color 0.3s,
    color 0.3s;

  & a {
    text-decoration: none;
    color: inherit;
    font-size: 14px;
  }

  &:hover {
    background-color: #007bff;
    color: #ffffff;
  }
`;
