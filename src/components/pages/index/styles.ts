import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoginContainer = styled.div`
  background: ${(p) => p.theme.colors.loginPage.loginGradient};
  min-height: 16rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
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
`;

export const User = styled.label`
  .erroNome {
    outline: 0.125rem solid ${(p) => p.theme.colors.loginPage.error};
  }
`;

export const Password = styled.label`
  .erroNome {
    outline: 0.125rem solid ${(p) => p.theme.colors.loginPage.error};
  }
`;

export const Text = styled.h3`
  margin: 0;
  text-align: center;
  padding-bottom: 0.8rem;
  font-size: 1.375rem;
  color: ${(p) => p.theme.colors.loginPage.white};
`;

const Dot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${(p) => p.theme.colors.loginPage.text};
  border-radius: 50%;
  position: absolute;
`;

export const DotTop1 = styled(Dot)`
  top: 0;
  left: 0;
`;

export const DotTop2 = styled(Dot)`
  top: 0;
  right: 0;
`;

export const DotLeft = styled(Dot)`
  bottom: 0;
  left: 0;
`;

export const DotRight = styled(Dot)`
  bottom: 0;
  right: 0;
`;

export const DotContainer = styled.div`
  position: relative;
  width: 1.4rem;
  height: 1.4rem;

  ${(props: { loading: boolean }) =>
    props.loading &&
    css`
      animation: ${rotate} 1s linear infinite;
    `}
`;

export const LogginButton = styled.button<{ loading: boolean }>`
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
    color: ${(p) => p.theme.colors.loginPage.white};
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

export const RegisterButton = styled(LogginButton)`
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

export const Error = styled.div``;

export const ErrorMessage = styled.p`
  color: ${(p) => p.theme.colors.loginPage.text};
  text-align: center;
  font-weight: bold;
  margin: 0;
`;

export const RegisterContent = styled.div``;

export const LoginText = styled.p`
  color: ${(p) => p.theme.colors.loginPage.white};
  margin: 0;
  text-align: left;
  &:nth-of-type(2) {
    text-align: center;

    a {
      color: ${(p) => p.theme.colors.loginPage.hoverButton};
      text-decoration: underline;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

export const RegisterText = styled(LoginText)`
  text-align: center;
`;
