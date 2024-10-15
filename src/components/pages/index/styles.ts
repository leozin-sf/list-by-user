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

export const Page = styled.div`
  background-color: ${(p) => p.theme.colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginContainer = styled.div`
  min-height: 16rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    height: 1.4rem;
  }
`;

export const User = styled.label``;

export const Password = styled.label``;

export const Text = styled.h3`
  margin: 0;
  text-align: center;
  padding-bottom: 0.8rem;
  font-size: 1.375rem;
  color: ${(p) => p.theme.colors.white};
`;

const Dot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: #fff;
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
  border: 0px solid transparent;
  font-weight: bold;
  font-size: 0.875rem;

  :hover {
    cursor: pointer;
    background-color: lightblue;
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

export const Error = styled.div``;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin: 0;
`;
