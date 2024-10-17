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

export function ToDoList() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');

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
    const fetchUserName = async () => {
      const userEmail = localStorage.getItem('user_email');
      if (userEmail) {
        const { data, error } = await supabase
          .from('users')
          .select('name')
          .eq('email', userEmail)
          .single();

        if (error) {
          console.log(error);
        } else {
          setUserName(data.name);
        }
      }
    };

    fetchUserName();
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
