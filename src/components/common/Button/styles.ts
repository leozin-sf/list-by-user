import styled from '@emotion/styled';
import { CommonButtonProps } from './types';

const small = (p: any) => p.theme.breakpoints.small;

export const BaseButton = styled.button<CommonButtonProps>`
  cursor: pointer;
  position: absolute;
  background: none;
  border: none;
  height: 1.25rem;
  width: 1.25rem;

  &:disabled {
    visibility: hidden;
  }

  &:after {
    display: inline-block;
    height: 100%;
    width: 100%;
  }

  @media (min-width: ${small}px) {
    height: 1.5rem;
    width: 1.5rem;
  }
`;
export const MarkTaskButton = styled(BaseButton)<{ task_confirmed?: boolean }>`
  position: unset;

  &::after {
    content: ${(p) =>
      p.task_confirmed
        ? `url('/assets/check-l-mobile.svg')`
        : `url('/assets/check-d-mobile.svg')`};
  }

  @media (min-width: ${small}px) {
    &::after {
      content: ${(p) =>
        p.task_confirmed
          ? `url('/assets/check-l.svg')`
          : `url('/assets/check-d.svg')`};
    }
  }
`;

export const DoneBg = styled.div<{
  task_confirmed?: boolean;
  disabled?: boolean;
}>`
  background-color: ${(p) =>
    p.task_confirmed
      ? p.theme.colors.toDoListPage.bgButtonColor
      : p.theme.colors.white};
  height: 1.4rem;
  width: 1.4rem;
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
    background-color: ${(p) =>
      p.task_confirmed
        ? p.theme.colors.white
        : p.theme.colors.toDoListPage.bgButtonColor};

    & ${MarkTaskButton}::after {
      content: ${(p) =>
        p.task_confirmed
          ? `url('/assets/check-d-mobile.svg')`
          : `url('/assets/check-l-mobile.svg')`};
    }
  }

  @media (min-width: ${small}px) {
    height: 1.5rem;
    width: 1.5rem;

    &:hover {
      & ${MarkTaskButton}::after {
        content: ${(p) =>
          p.task_confirmed
            ? `url(/assets/check-d.svg)`
            : `url(/assets/check-l.svg)`};
      }
    }
  }
`;

export const ExcludeButton = styled(BaseButton)`
  right: 0;
  bottom: 0;
  transform: translate(-55%, -30%);

  &::after {
    content: url(/assets/trash-mobile.svg);
  }

  @media (min-width: ${small}px) {
    transform: translate(-46%, -25%);

    &::after {
      content: url(/assets/trash.svg);
    }
  }
`;

export const EditTask = styled(BaseButton)`
  left: 0.5rem;

  &::after {
    content: url(/assets/edit-mobile.svg);
  }

  @media (min-width: ${small}px) {
    &::after {
      content: url(/assets/edit.svg);
    }
  }
`;
