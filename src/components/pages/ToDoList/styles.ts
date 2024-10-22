import styled from '@emotion/styled';

const small = (p: any) => p.theme.breakpoints.small;

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

  input {
    width: 100%;
    height: 3rem;
    border-radius: 1rem;
    padding: 1rem 4.8rem 1rem 1rem;
  }

  @media (min-width: ${small}px) {
    padding: 0 12rem;

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
    transform: translate(-13rem, 50%);
  }
`;

export const Tasks = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${small}px) {
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
    padding: 2rem 1rem;
  }
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
`;
