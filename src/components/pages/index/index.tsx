import React, { useState, FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supaString } from './types';

import Container from '../../layout/Container';

import {
  Page,
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

const supabaseUrl = supaString(process.env.REACT_APP_SUPABASE_URL);
const supabaseKey = supaString(process.env.REACT_APP_SUPABASE_KEY);

const supabase = createClient(supabaseUrl, supabaseKey);

function Main() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

        setTimeout(() => {
          setShowWarning(false);
        }, 2000);
      } else {
        console.log('Login realizado', data);
        // Aqui você pode redirecionar o usuário para outra página ou fazer outra ação
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Container>
        <LoginContainer>
          <User>
            <Text>Login</Text>
            <input
              name="Login"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </User>
          <Password>
            <Text>Senha</Text>
            <input
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
    </Page>
  );
}

export default Main;
