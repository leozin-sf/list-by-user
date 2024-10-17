import styled from '@emotion/styled';

export const Content = styled.div``;

export const Menu = styled.div`
  height: 3.625rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoutButton = styled.button`
  height: 2rem;
`;

export const Wellcome = styled.div``;

export const WellcomeText = styled.span`
  font-size: 1.3rem;
  font-weight: 300;
  color: ${(p) => p.theme.colors.white};
`;

export const UserNameText = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${(p) => p.theme.colors.toDoListPage.userText};
`;
