import { FormEvent, useEffect, useState, useRef } from 'react';
import { supabase } from '../../auth/SupaBaseClient';
import { useNavigate } from 'react-router-dom';

import Container from '../../layout/Container';

import {
  Content,
  Menu,
  LogoutButton,
  Wellcome,
  WellcomeText,
  UserNameText,
  ListContent,
  NewTaskDiv,
  AddTask,
  Tasks,
  Task,
  TaskText,
  ExcludeButton,
} from './styles';

import { TaskTypes } from './types';

const getUserId = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      // console.log('Erro on getUser', error);
      return null;
    }
    if (user) {
      // console.log('ID do usuário', user.id);
      return user.id;
    } else {
      // console.log('Usuário não autenticado');
      return null;
    }
  } catch (error) {}
};

export function ToDoList() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const newTaskText = useRef<HTMLInputElement>(null);

  const getTasks = async (userID: string) => {
    const { data: tasksData, error: tasksError } = await supabase
      .from('to_do_list')
      .select('*')
      .eq('user_id', userID)
      .order('created_at', { ascending: false });

    if (tasksError) {
      // console.log(tasksError);
    } else {
      setTasks(tasksData);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userID = await getUserId();

        if (userID) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', userID)
            .single();
          if (userError) {
            // console.log(userError);
            return;
          }

          setUserName(userData.name);
          getTasks(userID);
        }
      } catch (error) {}
    };

    fetchUserData();
  }, []);

  const signOutApp = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        // console.log(error);
      } else {
        navigate('/');
      }
    } catch (error) {}
  };

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    const userID = await getUserId();

    if (userID && newTaskText.current?.value) {
      const { data, error } = await supabase.from('to_do_list').insert([
        {
          text: newTaskText.current.value,
          task_confirmed: false,
          user_id: userID,
        },
      ]);

      if (error) {
        // console.log('Erro em todolist, erro');
      } else {
        getTasks(userID);
        newTaskText.current.value = '';
      }
    }
  };

  const deleteTask = async (taskID: string) => {
    const userID = await getUserId();

    if (!userID) {
      console.log('Usuário não autenticado ou erro ao obter ID do usuário.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('to_do_list')
        .delete()
        .eq('list_id', taskID)
        .eq('user_id', userID);

      if (error) {
        console.log('Erro ao deletar tarefa', error);
      } else {
        getTasks(userID);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Content>
      <Container>
        <Menu>
          <Wellcome>
            <WellcomeText>Olá,</WellcomeText>{' '}
            <UserNameText>{userName}</UserNameText>
          </Wellcome>
          <LogoutButton onClick={signOutApp}>Logout</LogoutButton>
        </Menu>
        <ListContent>
          <NewTaskDiv>
            <input
              type="textarea"
              placeholder="Adicionar tarefa"
              ref={newTaskText}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTask(e);
                }
              }}
            />
            <AddTask onClick={handleAddTask}>Adicionar</AddTask>
          </NewTaskDiv>
          <Tasks>
            {tasks.map((task) => (
              <Task key={task.list_id}>
                <TaskText>{task.text}</TaskText>
                <ExcludeButton onClick={() => deleteTask(task.list_id)}>
                  Del
                </ExcludeButton>
              </Task>
            ))}
          </Tasks>
        </ListContent>
      </Container>
    </Content>
  );
}
