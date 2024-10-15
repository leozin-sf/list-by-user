import React, { useState, FormEvent } from 'react';
import { supabase } from '../../auth/SupaBaseClient';
import { useNavigate } from 'react-router-dom';

import Container from '../../layout/Container';

import {
  LoginContainer,
  User,
  Password,
  Text,
  LogginButton,
  DotContainer,
  DotTop1,
  DotTop2,
  DotLeft,
  DotRight,
  Error,
  ErrorMessage,
} from './styles';

function Main() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1400));

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setShowWarning(true);
        setInputError(true);

        setTimeout(() => {
          setShowWarning(false);
          setInputError(false);
        }, 2000);
      } else {
        console.log('Login realizado', data);
        navigate('/to-do-list');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <User>
          <Text>Login</Text>
          <input
            className={inputError ? 'Error' : ''}
            name="Login"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </User>
        <Password>
          <Text>Senha</Text>
          <input
            className={inputError ? 'Error' : ''}
            name="Password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Password>
        <LogginButton onClick={handleLogin} loading={loading}>
          {loading && (
            <DotContainer loading={loading}>
              <DotTop1 />
              <DotTop2 />
              <DotLeft />
              <DotRight />
            </DotContainer>
          )}
        </LogginButton>
        {showWarning && (
          <Error>
            <ErrorMessage>Erro ao realizar login</ErrorMessage>
          </Error>
        )}
      </LoginContainer>
    </Container>
  );
}

export default Main;
