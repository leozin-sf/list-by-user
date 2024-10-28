import { FormEvent, useEffect, useState, useRef } from 'react';
import { supabase } from '../../auth/SupaBaseClient';
import { useNavigate } from 'react-router-dom';

import { useIsMobile } from '../../../hooks/useMobile';
import Container from '../../layout/Container';
import { Button } from '../../common/Button';
import { Pagination } from './Pagination/index';
import { TaskLoading } from './TaskLoading';

import {
  Content,
  Menu,
  LogoutButton,
  Wellcome,
  WellcomeText,
  UserNameText,
  ListContent,
  NewTaskDiv,
  AddTaskSticky,
  AddTask,
  Tasks,
  Task,
  TaskText,
  ShowByFilter,
  FilterSelect,
  UpdateContent,
  SaveButton,
} from './styles';

import { TaskTypes } from './types';

const getUserId = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.log('Erro on getUser', error);
      return null;
    }
    if (user) {
      console.log('ID do usuário', user.id);
      return user.id;
    } else {
      console.log('Usuário não autenticado');
      return null;
    }
  } catch (error) {}
};

export function ToDoList() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);
  const [newTaskLoading, setNewTaskLoading] = useState<boolean>(false);
  const [firsLoadingPage, setFirsLoadingPage] = useState<boolean>(true);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [updateContent, setUpdateContent] = useState<{
    [key: string]: boolean;
  }>({});
  const [editedText, setEditedText] = useState<{ [key: string]: string }>({});
  const updatedTaskText = useRef<HTMLInputElement>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const filteredTasks = tasks.filter(
    (task) => task.task_confirmed === showCompleted
  );
  const tasksPerPage = 10;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = isMobile
    ? filteredTasks
    : filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const getTasks = async (userID: string) => {
    if (firsLoadingPage) setTasksLoading(true);

    const { data: tasksData, error: tasksError } = await supabase
      .from('to_do_list')
      .select('*')
      .eq('user_id', userID)
      .order('created_at', { ascending: false });

    if (tasksError) {
      console.log(tasksError);
    } else {
      setTasks(tasksData);
    }

    if (firsLoadingPage) {
      setTimeout(() => {
        setTasksLoading(false);
        setFirsLoadingPage(false);
      }, 1000);
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
            console.log(userError);
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
        console.log(error);
      } else {
        navigate('/');
      }
    } catch (error) {}
  };

  const [addingTask, setAddingTask] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  };

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    setAddingTask(true);
    setNewTaskLoading(true);

    const userID = await getUserId();

    if (userID && newTaskText) {
      const { data, error } = await supabase.from('to_do_list').insert([
        {
          text: newTaskText,
          task_confirmed: false,
          user_id: userID,
        },
      ]);

      if (error) {
        console.log('Erro em todolist, erro');
      } else {
        await getTasks(userID);
        setNewTaskText(''); // Limpa o campo de entrada

        setTimeout(() => {
          setNewTaskLoading(false);
        }, 100);
      }
    }
    setAddingTask(false);
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

  const toggleTask = async (taskID: string) => {
    const userID = await getUserId();

    if (!userID) {
      console.log('Usuário não autenticado ou erro ao obter ID do usuário.');
      return;
    }

    try {
      const { data: tasks, error: tasksError } = await supabase
        .from('to_do_list')
        .select('task_confirmed')
        .eq('list_id', taskID)
        .eq('user_id', userID)
        .single();

      if (!tasks || tasksError) {
        console.log('Erro ao marcar tarefa como concluída', tasksError);
      }

      const taskConfirmedState: boolean = !tasks?.task_confirmed;

      const { data, error } = await supabase
        .from('to_do_list')
        .update({ task_confirmed: taskConfirmedState })
        .eq('list_id', taskID)
        .eq('user_id', userID)
        .single();

      if (error) {
        console.log('Erro ao atualizar tarefa', error);
      } else {
        getTasks(userID);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showUpdateTask = (taskID: string, currentText: string) => {
    setUpdateContent((prevState) => ({
      ...prevState,
      [taskID]: !prevState[taskID],
    }));

    setEditedText((prevText) => ({
      ...prevText,
      [taskID]: currentText,
    }));

    setEditingTaskId(taskID);
  };

  const handleUpdateTask = async (taskID: string) => {
    const userID = await getUserId();

    if (!userID || !updatedTaskText.current) {
      console.log('Erro ao obter usuário ou input');
      return;
    }

    const updatedText = updatedTaskText.current.value.trim();
    const task = tasks.find((t) => t.list_id === taskID);
    if (!task || task.text === updatedText) {
      console.log('Nenhuma alteração no texto');
      setUpdateContent((prevState) => ({
        ...prevState,
        [taskID]: !prevState[taskID],
      }));
      setEditingTaskId(null);
      return;
    }

    const timeStamp = new Date().toISOString();

    const { data, error } = await supabase
      .from('to_do_list')
      .update({ text: updatedText, created_at: timeStamp })
      .eq('user_id', userID)
      .eq('list_id', taskID)
      .single();

    if (error) {
      console.log('Erro ao atualizar tarefa', error);
    } else {
      getTasks(userID);
      setUpdateContent((prevState) => ({
        ...prevState,
        [taskID]: false,
      }));
    }
    setEditingTaskId(null);
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
            <AddTaskSticky>
              <input
                type="textarea"
                placeholder="Adicionar tarefa"
                value={newTaskText}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTask(e);
                  }
                }}
              />
              <AddTask
                onClick={handleAddTask}
                addingTask={addingTask}
                disabled={!newTaskText.trim()}
              />
            </AddTaskSticky>
          </NewTaskDiv>
          <ShowByFilter>
            <FilterSelect
              onClick={() => setShowCompleted(false)}
              isActive={!showCompleted}
            >
              Pendentes
            </FilterSelect>
            <FilterSelect
              onClick={() => setShowCompleted(true)}
              isActive={showCompleted}
            >
              Concluídas
            </FilterSelect>
          </ShowByFilter>
          <Tasks>
            {tasksLoading && firsLoadingPage ? (
              <>
                <TaskLoading />
                <TaskLoading />
                <TaskLoading />
                <TaskLoading />
              </>
            ) : (
              <>
                {newTaskLoading && <TaskLoading />}

                {currentTasks.map((task) => (
                  <Task key={task.list_id}>
                    {!updateContent[task.list_id] && (
                      <>
                        <TaskText>{task.text}</TaskText>
                        <Button
                          buttonType="excludeTask"
                          onClick={() => deleteTask(task.list_id)}
                          disabled={
                            editingTaskId !== null &&
                            editingTaskId !== task.list_id
                          }
                        />
                        <Button
                          buttonType="markTask"
                          onClick={() => toggleTask(task.list_id)}
                          disabled={
                            editingTaskId !== null &&
                            editingTaskId !== task.list_id
                          }
                          task_confirmed={task.task_confirmed}
                        />
                        <Button
                          buttonType="editTask"
                          onClick={() =>
                            showUpdateTask(task.list_id, task.text)
                          }
                          disabled={
                            editingTaskId !== null &&
                            editingTaskId !== task.list_id
                          }
                        />
                      </>
                    )}
                    {updateContent[task.list_id] && (
                      <UpdateContent>
                        <input
                          type="text"
                          defaultValue={task.text}
                          ref={updatedTaskText}
                          onChange={(e) =>
                            setEditedText((prev) => ({
                              ...prev,
                              [task.list_id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleUpdateTask(task.list_id);
                            }
                          }}
                        />
                        <SaveButton
                          onClick={() => handleUpdateTask(task.list_id)}
                        >
                          Salvar
                        </SaveButton>
                      </UpdateContent>
                    )}
                  </Task>
                ))}
              </>
            )}
          </Tasks>

          {!isMobile && (
            <Pagination
              tasksPerPage={tasksPerPage}
              totalTasks={filteredTasks.length}
              paginate={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </ListContent>
      </Container>
    </Content>
  );
}
