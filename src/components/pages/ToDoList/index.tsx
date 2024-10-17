import { useEffect, useState } from 'react';
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
} from './styles';

import { Task } from './types';

export function ToDoList() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

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

  useEffect(() => {
    const getUserId = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          console.log(error);
        } else if (user) {
          const { data: users, error: errorUsers } = await supabase
            .from('users')
            .select('name')
            .eq('id', user.id)
            .single();
          if (errorUsers) {
            console.log(errorUsers);
          } else {
            setUserName(users.name);
          }
        } else {
          console.log('User not found');
        }
      } catch (error) {}
    };

    getUserId();
  }, []);

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
        <h1>Login Realizado!</h1>
      </Container>
    </Content>
  );
}
