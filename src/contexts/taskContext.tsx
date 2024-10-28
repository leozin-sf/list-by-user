import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  FormEvent,
} from 'react';
import { supabase } from '../components/auth/SupaBaseClient';
import { useNavigate } from 'react-router-dom';
import { TaskTypes } from '../components/pages/ToDoList/types';

type TaskContextType = {
  tasks: TaskTypes[];
  tasksLoading: boolean;
  newTaskLoading: boolean;
  firstLoadingPage: boolean;
  userName: string;
  newTaskText: string;
  setNewTaskText: (text: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  showCompleted: boolean;
  setShowCompleted: (value: boolean) => void;
  addingTask: boolean;
  handleAddTask: (e: FormEvent) => Promise<void>;
  deleteTask: (taskID: string) => Promise<void>;
  toggleTask: (taskID: string) => Promise<void>;
  handleUpdateTask: (taskID: string) => Promise<void>;
  showUpdateTask: (taskID: string, currentText: string) => void;
  signOutApp: () => Promise<void>;
  updateContent: { [key: string]: boolean };
  setUpdateContent: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  editedText: { [key: string]: string };
  setEditedText: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  updatedTaskText: React.RefObject<HTMLInputElement>;
  editingTaskId: string | null;
  setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);
  const [newTaskLoading, setNewTaskLoading] = useState<boolean>(false);
  const [firstLoadingPage, setFirstLoadingPage] = useState<boolean>(true);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [updateContent, setUpdateContent] = useState<{
    [key: string]: boolean;
  }>({});
  const [editedText, setEditedText] = useState<{ [key: string]: string }>({});
  const updatedTaskText = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const getUserId = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.log('Erro ao obter usuário', error);
        return null;
      }
      return user ? user.id : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getTasks = async (userID: string) => {
    if (firstLoadingPage) setTasksLoading(true);
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

    if (firstLoadingPage) {
      setTimeout(() => {
        setTasksLoading(false);
        setFirstLoadingPage(false);
      }, 1000);
    }
  };

  const fetchUserData = async () => {
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
  };

  useEffect(() => {
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    setNewTaskLoading(true);
    setShowCompleted(false);

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
        console.log('Erro ao adicionar tarefa', error);
      } else {
        await getTasks(userID);
        setNewTaskText('');
        setTimeout(() => setNewTaskLoading(false), 100);
      }
    }
  };

  const deleteTask = async (taskID: string) => {
    const userID = await getUserId();
    if (!userID) return;

    const { error } = await supabase
      .from('to_do_list')
      .delete()
      .eq('list_id', taskID)
      .eq('user_id', userID);

    if (error) {
      console.log('Erro ao deletar tarefa', error);
    } else {
      getTasks(userID);
    }
  };

  const toggleTask = async (taskID: string) => {
    const userID = await getUserId();
    if (!userID) return;

    const { data: task, error: taskError } = await supabase
      .from('to_do_list')
      .select('task_confirmed')
      .eq('list_id', taskID)
      .eq('user_id', userID)
      .single();

    if (!task || taskError) return;

    const taskConfirmedState = !task.task_confirmed;
    const { error: updateError } = await supabase
      .from('to_do_list')
      .update({ task_confirmed: taskConfirmedState })
      .eq('list_id', taskID)
      .eq('user_id', userID)
      .single();

    if (!updateError) getTasks(userID);
  };

  const showUpdateTask = (taskID: string, currentText: string) => {
    setUpdateContent((prev) => ({ ...prev, [taskID]: !prev[taskID] }));
    setEditedText((prev) => ({ ...prev, [taskID]: currentText }));
    setEditingTaskId(taskID);
  };

  const handleUpdateTask = async (taskID: string) => {
    const userID = await getUserId();
    if (!userID || !updatedTaskText.current) return;

    const updatedText = updatedTaskText.current.value.trim();
    const task = tasks.find((t) => t.list_id === taskID);

    if (task && task.text === updatedText) {
      setUpdateContent((prev) => ({ ...prev, [taskID]: false }));
      setEditingTaskId(null);
      return;
    }

    const { error } = await supabase
      .from('to_do_list')
      .update({ text: updatedText })
      .eq('user_id', userID)
      .eq('list_id', taskID);

    if (!error) {
      getTasks(userID);
      setUpdateContent((prev) => ({ ...prev, [taskID]: false }));
    }
    setEditingTaskId(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        tasksLoading,
        newTaskLoading,
        firstLoadingPage,
        userName,
        newTaskText,
        setNewTaskText,
        currentPage,
        setCurrentPage,
        showCompleted,
        setShowCompleted,
        addingTask: newTaskLoading,
        handleAddTask,
        deleteTask,
        toggleTask,
        handleUpdateTask,
        showUpdateTask,
        signOutApp,
        updateContent,
        setUpdateContent,
        editedText,
        setEditedText,
        updatedTaskText,
        editingTaskId,
        setEditingTaskId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
