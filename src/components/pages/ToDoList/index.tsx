import { supabase } from '../../auth/SupaBaseClient';
import { useNavigate } from 'react-router-dom';

import Container from '../../layout/Container';

import { Content, Menu } from './styles';

export function ToDoList() {
  const navigate = useNavigate();

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

  return (
    <Content>
      <Container>
        <Menu>
          <button onClick={signOutApp}>Logout</button>
        </Menu>
        <h1>Login Realizado!</h1>
      </Container>
    </Content>
  );
}
