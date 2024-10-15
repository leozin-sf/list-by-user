// src/components/layout/styles.ts
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  background-color: ${(p) => p.theme.colors.loginPage.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
