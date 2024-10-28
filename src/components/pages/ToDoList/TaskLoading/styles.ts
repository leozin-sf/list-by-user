import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const small = (p: any) => p.theme.breakpoints.small;

const loadingTask = keyframes`
0% {background-position: 200% 0;}
  100% {background-position: -200% 0;}
`;

export const SkeletonButton = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background: linear-gradient(90deg, #cccccc 25%, #ffffff 50%, #cccccc 75%);
  background-size: 200% 100%;
  animation: ${loadingTask} 1.5s infinite linear;
  border-radius: 0.5rem;
`;

export const Skeleton = styled.div`
  position: relative;
  padding: 1rem 2.5rem;
  background-color: #727d92;
  border-radius: 1rem;
  min-height: 4rem;
  min-width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${SkeletonButton} {
    &:nth-of-type(2) {
      position: absolute;
      left: 0.5rem;
    }
    &:nth-of-type(3) {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-45%, 35%);
    }
    &:nth-of-type(4) {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translate(-46%, -25%);
    }
  }

  @media (min-width: ${small}px) {
    padding: 2rem 1rem 2rem 2.1rem;
  }
`;

export const SkeletonText = styled.div`
  flex: 0.85;
  height: 1rem;
  background: linear-gradient(90deg, #cccccc 25%, #ffffff 50%, #cccccc 75%);
  background-size: 200% 100%;
  animation: ${loadingTask} 1.5s infinite linear;
  border-radius: 0.5rem;
`;
