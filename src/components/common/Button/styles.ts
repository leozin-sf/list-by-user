import styled from '@emotion/styled';
import { CommonButtonProps } from './types';

export const Content = styled.button<CommonButtonProps>`
  cursor: pointer;
  position: absolute;

  ${({ buttonType }) =>
    buttonType === 'excludeTask' &&
    `
      right: 0;
      bottom: 0;
      transform: translate(-50%, -50%);
    `}

  ${({ buttonType }) =>
    buttonType === 'markTask' &&
    `
      top: 0;
      right: 0;
      transform: translate(-20%, 50%);
    `}

  ${({ buttonType }) =>
    buttonType === 'editTask' &&
    `
      left: 0.5rem;
    `}

  font-size: ${({ size }) => (size === 'medium' ? '1rem' : '0.875rem')};
  padding: ${({ size }) =>
    size === 'medium' ? '0.5rem 1rem' : '0.25rem 0.75rem'};

  :disabled {
    visibility: hidden;
  }
`;
