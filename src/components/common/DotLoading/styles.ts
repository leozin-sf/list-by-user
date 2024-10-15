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

export const DotContainer = styled.div<{ loading: boolean }>`
  position: relative;
  width: 1.4rem;
  height: 1.4rem;

  ${(props) =>
    props.loading &&
    css`
      animation: ${rotate} 1s linear infinite;
    `}
`;
