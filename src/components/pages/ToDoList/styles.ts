import styled from '@emotion/styled';

const small = (p: any) => p.theme.breakpoints.small;

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
  height: 2rem;
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
  height: -webkit-fill-available;

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

export const AddTask = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-1rem, 75%);

  @media (min-width: ${small}px) {
    transform: translate(-13rem, 75%);
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
  background-color: #727d92;
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

export const ExcludeButton = styled.button`
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(-50%, -50%);

  :disabled {
    visibility: hidden;
  }
`;

export const MarkTaskAsDone = styled.button`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-20%, 50%);

  :disabled {
    visibility: hidden;
  }
`;

export const ShowByFilter = styled.div`
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

  background-color: ${({ isActive }) => (isActive ? '#007BFF' : '#ffffff')};
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#000000')};

  &:hover {
    background-color: #0056b3;
    color: #ffffff;
  }
`;

export const ShowUpdateTask = styled.button`
  cursor: pointer;
  position: absolute;
  left: 0.5rem;

  :disabled {
    visibility: hidden;
  }
`;

export const UpdateContent = styled.div`
  width: 100%;
  position: relative;

  input {
    width: 100%;
    height: 2rem;
    border-radius: 1rem;
    padding: 1rem;
  }
`;

export const SaveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-30%, 40%);
`;
