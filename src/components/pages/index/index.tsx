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
  Error,
  ErrorMessage,
  RegisterContent,
  LoginText,
  RegisterText,
} from './styles';
import { Loading } from '../../common/DotLoading';

function Main() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const registerEmailRef = useRef<HTMLInputElement>(null);
  const registerPasswordRef = useRef<HTMLInputElement>(null);
  const registerNameRef = useRef<HTMLInputElement>(null);
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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

    const email = registerEmailRef.current?.value;
    const password = registerPasswordRef.current?.value;
    const name = registerNameRef.current?.value;

    let hasError = false;
    if (!name || name.trim() === '') {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (!email || email.trim() === '') {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!password || password.trim() === '') {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email || '',
        password: password || '',
        options: {
          data: { name: name },
        },
      });

      if (error) {
        if (error.message === 'User already registered') {
          setShowWarning(true);
          setTimeout(() => {
            setShowWarning(false);
          }, 10000);
        }

        console.log(error.message);
      } else if (data.user) {
        const { error } = await supabase
          .from('users')
          .insert([{ id: data.user.id, email: data.user.email, name: name }]);

        if (error) {
          console.log('Erro ao registrar nome de usuário', error);
        } else {
          navigate('/to-do-list');
        }
      }
    } catch (error) {
      console.error('Erro no registro', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1400);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    let hasError = false;

    if (!email || email.trim() === '') {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!password || password.trim() === '') {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email || '',
        password: password || '',
      });
      if (error) {
        console.log(error.message);
        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
        }, 5000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1400);
        navigate('/to-do-list');
      }
    } catch (error) {
      console.error('Erro no login', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1400);
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
                name="Login"
                placeholder="E-mail"
                type="email"
                className={emailError ? 'erroNome' : ''}
              />
            </User>
            <Password>
              <Text>Senha</Text>
              <PasswordInput
                placeholder="Digite sua senha"
                ref={passwordRef}
                className={passwordError ? 'erroNome' : ''}
              />
            </Password>
            <LogginButton onClick={handleLogin} loading={loading}>
              {loading && <Loading loading={loading} />}
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
                placeholder={nameError ? 'Informe seu nome!' : 'Seu Nome'}
                className={nameError ? 'erroNome' : ''}
              />
            </User>
            <User>
              <Text>E-mail</Text>
              <input
                ref={registerEmailRef}
                type="email"
                placeholder={emailError ? 'Informe seu e-mail!' : 'Seu e-mail'}
                className={emailError ? 'erroNome' : ''}
              />
            </User>
            <Password>
              <Text>Senha</Text>
              <PasswordInput
                placeholder={
                  passwordError ? 'Informe uma senha!' : 'Digite sua senha'
                }
                ref={registerPasswordRef}
                className={passwordError ? 'erroNome' : ''}
              />
            </Password>
            <RegisterButton onClick={handleRegister} loading={loading}>
              {loading && <Loading loading={loading} />}
            </RegisterButton>
            <RegisterContent>
              <RegisterText>Já possui cadastro?</RegisterText>
              <RegisterText>
                Clique <a onClick={showLoginForm}>aqui</a>!
              </RegisterText>
            </RegisterContent>
            {showWarning && (
              <Error>
                <ErrorMessage>E-mail já cadastrado!</ErrorMessage>
              </Error>
            )}
          </>
        )}
      </LoginContainer>
    </Container>
  );
}

export default Main;
