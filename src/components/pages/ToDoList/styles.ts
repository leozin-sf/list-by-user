import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

const small = (p: any) => p.theme.breakpoints.small;

const rotate = keyframes`
  0% {transform: rotate(0deg)}
  100%{transform: rotate(360deg)}
`;

export const Content = styled.div`
  input {
    border: none;
    :focus {
      outline: 0.125rem solid ${(p) => p.theme.colors.loginPage.inputBorder};
    }
  }
`;

export const Menu = styled.div`
  height: 3.625rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoutButton = styled.button`
  cursor: pointer;
  height: 2rem;
  border: none;
  background: none;
  color: ${(p) => p.theme.colors.white};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: url(assets/logout.svg);
  }
`;

export const Wellcome = styled.div``;

export const WellcomeText = styled.span`
  font-size: 1.3rem;
  font-weight: 300;
  color: ${(p) => p.theme.colors.white};
`;

export const UserNameText = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${(p) => p.theme.colors.toDoListPage.userText};
`;

export const ListContent = styled.div`
  margin-top: 4rem;
`;

export const NewTaskDiv = styled.div`
  position: absolute;
  width: calc(100% - 2rem);
  min-height: calc(100% - 4rem - 3.625rem);

  input {
    font-size: 1rem;
    width: 100%;
    height: 3rem;
    border-radius: 1rem;
    padding: 1rem 4.8rem 1rem 1rem;
  }

  @media (min-width: ${small}px) {
    padding: 0 12rem;
    position: relative;
    width: unset;
    height: unset;

    input {
      padding: 1rem 6rem 1rem 1rem;
    }
  }
`;

export const AddTask = styled.button<{ addingTask: boolean }>`
  position: absolute;
  top: 0.75rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${(p) => p.theme.colors.toDoListPage.bgButtonColor};
  border: none;
  border-radius: 0.5rem;
  transform-origin: center;

  ${({ addingTask }) =>
    addingTask &&
    css`
      animation: ${rotate} 1s ease-in-out;
    `}

  &::after {
    content: url(/assets/add-l.svg);
    display: inline-block;
  }

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.colors.toDoListPage.bgFiltered};
  }

  :disabled {
    background-color: ${(p) => p.theme.colors.grey};
    cursor: not-allowed;
  }

  @media (min-width: ${small}px) {
    right: 13rem;
    top: 0.75rem;
  }
`;

export const AddTaskSticky = styled.div`
  position: sticky;
  top: 1rem;
  z-index: 100;

  @media (min-width: ${small}px) {
    position: unset;
    top: unset;
    z-index: unset;
  }
`;

export const Tasks = styled.div`
  padding: 1rem 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${small}px) {
    padding: 1rem 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 1rem;
  }
`;

export const Task = styled.div`
  position: relative;
  padding: 1rem 2.5rem;
  background-color: ${(p) => p.theme.colors.toDoListPage.task};
  border-radius: 1rem;
  min-height: 4rem;
  min-width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${small}px) {
    padding: 2rem 1rem 2rem 2.1rem;
  }
`;

export const TaskText = styled.p`
  font-size: 1rem;
  color: ${(p) => p.theme.colors.white};
`;

export const ShowByFilter = styled.div`
  position: relative;
  padding-top: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (min-width: ${small}px) {
    padding-top: 1rem;
    gap: 4rem;
  }
`;

export const FilterSelect = styled.button<{ isActive: boolean }>`
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;

  background-color: ${(p) =>
    p.isActive
      ? p.theme.colors.toDoListPage.bgButtonColor
      : p.theme.colors.white};
  color: ${(p) => (p.isActive ? p.theme.colors.white : p.theme.colors.text)};

  &:hover {
    background-color: ${(p) => p.theme.colors.toDoListPage.bgFiltered};
    color: ${(p) => p.theme.colors.white};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${(p) =>
      p.isActive
        ? p.theme.colors.toDoListPage.bgButtonColor
        : p.theme.colors.white};

    &:hover {
      background-color: ${(p) => p.theme.colors.toDoListPage.bgFiltered};
    }
  }
`;

export const UpdateContent = styled.div`
  width: 100%;
  position: relative;

  input {
    font-size: 1rem;
    width: 100%;
    height: 2.5rem;
    border-radius: 1rem;
    padding: 1rem;
  }
`;

export const SaveButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-30%, 30%);

  &::after {
    display: inline-block;
    width: 100%;
    height: 100%;
    content: url(/assets/save.svg);
  }
`;
