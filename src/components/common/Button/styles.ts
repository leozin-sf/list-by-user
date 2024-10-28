import styled from '@emotion/styled';
import { CommonButtonProps } from './types';

export const BaseButton = styled.button<CommonButtonProps>`
  cursor: pointer;
  position: absolute;
  background: none;
  border: none;

  :disabled {
    visibility: hidden;
  }
`;
export const MarkTaskButton = styled(BaseButton)<{ task_confirmed?: boolean }>`
  position: unset;

  &::after {
    content: ${(p) =>
      p.task_confirmed
        ? `url('/assets/check-l.svg')`
        : `url('/assets/check-d.svg')`};
  }
`;

export const DoneBg = styled.div<{
  task_confirmed?: boolean;
  disabled?: boolean;
}>`
  background-color: ${(p) => (p.task_confirmed ? '#007bff' : '#ffffff')};
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 0.5rem;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-45%, 35%);
  display: flex;
  align-items: center;
  justify-content: center;

  ${(p) =>
    p.disabled &&
    `
    visibility: hidden;
  `}

  &:hover {
    background-color: ${(p) => (p.task_confirmed ? '#ffffff' : '#007bff')};

    & ${MarkTaskButton}::after {
      content: ${(p) =>
        p.task_confirmed
          ? `url('/assets/check-d.svg')`
          : `url('/assets/check-l.svg')`};
    }
  }
`;

export const ExcludeButton = styled(BaseButton)`
  right: 0;
  bottom: 0;
  transform: translate(-46%, -25%);

  &::after {
    content: url('/assets/trash.svg');
  }
`;

export const EditTask = styled(BaseButton)`
  left: 0.5rem;

  &::after {
    content: url('/assets/edit.svg');
  }
`;
