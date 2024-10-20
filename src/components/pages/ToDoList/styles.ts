import styled from '@emotion/styled';

export const Content = styled.div``;

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
  position: relative;
  padding: 0 12rem;

  input {
    width: 100%;
    height: 3rem;
    border-radius: 1rem;
    padding: 1rem 6rem 1rem 1rem;
  }
`;

export const AddTask = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-13rem, 75%);
`;

export const Tasks = styled.div`
  padding-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 1rem;
`;

export const Task = styled.div`
  position: relative;
  padding: 2rem 1rem;
  background-color: #727d92;
  border-radius: 1rem;
  min-height: 4rem;
  min-width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TaskText = styled.p`
  font-size: 1rem;
  color: ${(p) => p.theme.colors.white};
`;

export const ExcludeButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(-50%, -50%);
`