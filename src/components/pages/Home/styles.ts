import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { ShowTypes } from './types';

const small = (p: any) => p.theme.breakpoints.small;

export const LoginContainer = styled.div<ShowTypes>`
  background: ${(p) => p.theme.colors.loginPage.loginGradient};
  min-height: 24rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem 3rem;
  border-radius: 1rem;

  input {
    height: 100%;
    width: -webkit-fill-available;
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 1rem;

    :focus {
      outline: 0.125rem solid ${(p) => p.theme.colors.loginPage.inputBorder};
      border-radius: 0.5rem;
    }
  }

  .erroNome {
    outline: 0.125rem solid ${(p) => p.theme.colors.loginPage.error};
  }

  ${({ showResetPassword }) =>
    showResetPassword &&
    css`
      min-height: 16rem;
    `}

  @media (min-width: ${small}px) {
    min-height: 16rem;
    padding: 3rem 4rem;

    input {
      height: 1.4rem;
      font-size: 0.875rem;
      padding: 0 0.5rem;
    }
  }
`;

export const User = styled.label``;

export const Password = styled.label``;

export const Text = styled.h3`
  margin: 0;
  text-align: center;
  padding-bottom: 0.8rem;
  font-size: 1.5rem;
  color: ${(p) => p.theme.colors.white};

  @media (min-width: ${small}px) {
    font-size: 1.375rem;
  }
`;

export const LoginButton = styled.button<{ loading: boolean }>`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 0.5rem;
  border: 0rem solid transparent;
  font-weight: bold;
  font-size: 0.875rem;

  :hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.colors.loginPage.hoverButton};
    color: ${(p) => p.theme.colors.white};
  }

  ${(props) =>
    props.loading
      ? css`
          ::after {
            content: '';
          }
        `
      : css`
          ::after {
            content: 'Entrar';
          }
        `}
`;

export const RegisterButton = styled(LoginButton)`
  ${(props) =>
    props.loading
      ? css`
          ::after {
            content: '';
          }
        `
      : css`
          ::after {
            content: 'Registrar';
          }
        `}
`;

export const ResetPasswordButton = styled(LoginButton)`
  ${(props) =>
    props.loading
      ? css`
          ::after {
            content: '';
          }
        `
      : css`
          ::after {
            content: 'Enviar e-mail';
          }
        `}
`;

export const Error = styled.div``;

export const ErrorMessage = styled.p`
  color: ${(p) => p.theme.colors.text};
  text-align: center;
  font-weight: bold;
  margin: 0;
`;

export const LoginText = styled.p`
  color: ${(p) => p.theme.colors.white};
  margin: 0;
  text-align: center;

  &:nth-of-type(2) {
    a {
      color: ${(p) => p.theme.colors.loginPage.hoverButton};
      text-decoration: underline;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

export const RegisterContent = styled.div`
  ${LoginText} {
    &:nth-of-type(1) {
      font-size: 0.875rem;

      @media (min-width: ${small}px) {
        font-size: 1rem;
      }
    }
  }
`;

export const PasswordLogin = styled(Password)`
  & > :nth-child(3) {
    padding-top: 0.5rem;
    font-size: 0.625rem;
    a {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const RegisterText = styled(LoginText)`
  text-align: center;
`;

export const TextReset = styled(Text)`
  max-width: 12rem;
`;

export const GoBackButton = styled.button`
  background: none;
  border: none;
  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  top: 0;
  right: 0;
  transform: translate(-0.625rem, 0.625rem);

  &::after {
    content: url(/assets/return.svg);
    display: inline-block;
    width: 100%;
    height: 100%;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0;transform: translateY(10px);} to {opacity: 1;transform: translateY(0);}
`;

export const ShowContent = styled.div`
  animation: ${fadeIn} 0.4s ease-out;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  gap: 1rem;
`;
