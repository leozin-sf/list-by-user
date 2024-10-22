import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { LoginButton, User, LoginContainer } from '../Home/styles';

const small = (p: any) => p.theme.breakpoints.small;

export const Content = styled.div``;

export const RecoveryContainer = styled.div`
  background: ${(p) => p.theme.colors.loginPage.loginGradient};
  min-height: 26rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 3rem;
  border-radius: 1rem;

  input {
    height: 1.4rem;
    width: -webkit-fill-available;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    border: none;

    :focus {
      outline: 0.125rem solid ${(p) => p.theme.colors.loginPage.inputBorder};
      border-radius: 0.5rem;
    }
  }

  .erroNome {
    outline: 0.125rem solid ${(p) => p.theme.colors.loginPage.error};
  }

  @media (min-width: ${small}px) {
    min-height: 16rem;
    padding: 3rem 4rem;
  }
`;

export const UserReset = styled(User)`
  & > :nth-of-type(1) {
    margin-bottom: 1rem;
  }
`;

export const RecoveryButton = styled(LoginButton)`
  ${(props) =>
    props.loading
      ? css`
          ::after {
            content: '';
          }
        `
      : css`
          ::after {
            content: 'Recuperar';
          }
        `}
`;
