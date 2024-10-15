import React, { useState, FormEvent, useRef } from 'react';
import { supabase } from '../../auth/SupaBaseClient';
import { useNavigate } from 'react-router-dom';

import Container from '../../layout/Container';
import PasswordInput from '../../common/Password';

import {
  LoginContainer,
  User,
  Password,
  Text,
  LogginButton,
  RegisterButton,
  DotContainer,
  DotTop1,
  DotTop2,
  DotLeft,
  DotRight,
  Error,
  ErrorMessage,
  RegisterContent,
  LoginText,
  RegisterText,
} from './styles';

function Main() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const registerEmailRef = useRef<HTMLInputElement>(null);
  const registerPasswordRef = useRef<HTMLInputElement>(null);
  const registerNameRef = useRef<HTMLInputElement>(null);
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);
  const navigate = useNavigate();

  const showRegisterForm = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowWarning(false);
  };

  const showLoginForm = () => {
    setShowRegister(false);
    setShowLogin(true);
    setShowWarning(false);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1400));

    const email = registerEmailRef.current?.value;
    const password = registerPasswordRef.current?.value;
    const name = registerNameRef.current?.value;

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email || '',
        password: password || '',
      });

      if (error) {
        console.log(error.message);
      } else {
        navigate('/to-do-list');
      }
    } catch (error) {
      console.error('Erro no registro', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1400));

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email || '',
        password: password || '',
      });
      if (error) {
        console.log(error.message);
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
        {showLogin && (
          <>
            <User>
              <Text>Login</Text>
              <input
                ref={emailRef}
                className={inputError ? 'Error' : ''}
                name="Login"
                placeholder="E-mail"
                type="email"
              />
            </User>
            <Password>
              <Text>Senha</Text>
              <PasswordInput placeholder="Digite sua senha" />
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
            <RegisterContent>
              <LoginText>Ainda não possui cadastro?</LoginText>
              <LoginText>
                Cadastre-se <a onClick={showRegisterForm}>aqui</a>!
              </LoginText>
            </RegisterContent>
            {showWarning && (
              <Error>
                <ErrorMessage>Credenciais inválidas!</ErrorMessage>
              </Error>
            )}
          </>
        )}
        {showRegister && (
          <>
            <User>
              <Text>Nome</Text>
              <input
                ref={registerNameRef}
                type="text"
                placeholder="Seu Nome"
                required
              />
            </User>
            <User>
              <Text>E-mail</Text>
              <input
                ref={registerEmailRef}
                type="email"
                placeholder="digite seu e-mail"
                required
              />
            </User>
            <Password>
              <Text>Senha</Text>
              <PasswordInput placeholder="Digite sua senha" />
            </Password>
            <RegisterButton onClick={handleRegister} loading={loading}>
              {loading && (
                <DotContainer loading={loading}>
                  <DotTop1 />
                  <DotTop2 />
                  <DotLeft />
                  <DotRight />
                </DotContainer>
              )}
            </RegisterButton>
            <RegisterContent>
              <RegisterText>Já possui cadastro?</RegisterText>
              <RegisterText>
                Clique <a onClick={showLoginForm}>aqui</a>!
              </RegisterText>
            </RegisterContent>
          </>
        )}
      </LoginContainer>
    </Container>
  );
}

export default Main;
