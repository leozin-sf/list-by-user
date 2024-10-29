import { useRef } from 'react';
import { useAuth } from '../../../contexts/authContext';
import Container from '../../layout/Container';
import PasswordInput from '../../common/Password';

import {
  LoginContainer,
  User,
  Password,
  PasswordLogin,
  Text,
  LoginButton,
  RegisterButton,
  ResetPasswordButton,
  Error,
  ErrorMessage,
  RegisterContent,
  LoginText,
  RegisterText,
  TextReset,
  GoBackButton,
  ShowContent,
  EmailSended,
} from './styles';
import { Loading } from '../../common/DotLoading';

function Main() {
  const {
    disabledButton,
    showEmailSended,
    handleLogin,
    handleRegister,
    handleResetPassword,
    loading,
    showWarning,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    showLogin,
    showRegister,
    showResetPassword,
    setShowLogin,
    setShowRegister,
    setShowResetPassword,
    nameError,
    setNameError,
    lastNameError,
    setLastNameError,
    passwordWarning,
  } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const registerEmailRef = useRef<HTMLInputElement>(null);
  const registerPasswordRef = useRef<HTMLInputElement>(null);
  const registerNameRef = useRef<HTMLInputElement>(null);
  const registerLastNameRef = useRef<HTMLInputElement>(null);
  const emailRecoverPasswordRef = useRef<HTMLInputElement>(null);

  const showRegisterForm = () => {
    setShowRegister(true);
    setShowLogin(false);
    setEmailError(false);
    setPasswordError(false);
  };

  const showLoginForm = () => {
    setShowRegister(false);
    setShowLogin(true);
    setEmailError(false);
    setPasswordError(false);
    setNameError(false);
    setLastNameError(false);
  };

  const showResetPasswordForm = () => {
    setShowResetPassword(true);
    setShowRegister(false);
    setShowLogin(false);
    setEmailError(false);
  };

  const showLoginAgain = () => {
    setShowResetPassword(false);
    setShowLogin(true);
    setEmailError(false);
  };

  return (
    <Container>
      <LoginContainer showResetPassword={showResetPassword}>
        {showLogin && (
          <ShowContent>
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
            <PasswordLogin>
              <Text>Senha</Text>
              <PasswordInput
                placeholder="Digite sua senha"
                ref={passwordRef}
                className={passwordError ? 'erroNome' : ''}
                onEnterPress={(e) =>
                  handleLogin(
                    e,
                    emailRef.current?.value,
                    passwordRef.current?.value
                  )
                }
                disabled={disabledButton}
              />
              <LoginText>
                Esqueceu sua senha? Clique{' '}
                <a onClick={showResetPasswordForm}>aqui</a>!
              </LoginText>
            </PasswordLogin>
            <LoginButton
              onClick={(e) =>
                handleLogin(
                  e,
                  emailRef.current?.value,
                  passwordRef.current?.value
                )
              }
              loading={loading}
              disabled={disabledButton}
            >
              {loading && <Loading loading={loading} />}
            </LoginButton>

            <RegisterContent>
              <LoginText>Ainda não possui cadastro?</LoginText>
              <LoginText>
                Cadastre-se <a onClick={showRegisterForm}>aqui</a>!
              </LoginText>
            </RegisterContent>
            {showWarning.status && (
              <Error>
                <ErrorMessage>{showWarning.message}</ErrorMessage>
              </Error>
            )}
          </ShowContent>
        )}
        {showRegister && (
          <ShowContent>
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
              <Text>Sobrenome</Text>
              <input
                ref={registerLastNameRef}
                type="text"
                placeholder={
                  lastNameError ? 'Informe seu sobrenome!' : 'Seu Sobrenome'
                }
                className={lastNameError ? 'erroNome' : ''}
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
                onEnterPress={(e) =>
                  handleRegister(
                    e,
                    registerNameRef.current?.value,
                    registerLastNameRef.current?.value,
                    registerEmailRef.current?.value,
                    registerPasswordRef.current?.value
                  )
                }
                disabled={disabledButton}
              />
            </Password>
            <RegisterButton
              onClick={(e) =>
                handleRegister(
                  e,
                  registerNameRef.current?.value,
                  registerLastNameRef.current?.value,
                  registerEmailRef.current?.value,
                  registerPasswordRef.current?.value
                )
              }
              loading={loading}
              disabled={disabledButton}
            >
              {loading && <Loading loading={loading} />}
            </RegisterButton>
            <RegisterContent>
              <RegisterText>Já possui cadastro?</RegisterText>
              <RegisterText>
                Clique <a onClick={showLoginForm}>aqui</a>!
              </RegisterText>
            </RegisterContent>
            {showWarning.status && (
              <Error>
                <ErrorMessage>{showWarning.message}</ErrorMessage>
              </Error>
            )}
            {passwordWarning && (
              <Error>
                <ErrorMessage>
                  Senha deve conter pelo menos 6 caracteres!
                </ErrorMessage>
              </Error>
            )}
          </ShowContent>
        )}
        {showResetPassword && (
          <ShowContent>
            <GoBackButton onClick={showLoginAgain} />
            <TextReset>Informe o e-mail cadastrado</TextReset>
            <input
              ref={emailRecoverPasswordRef}
              type="email"
              placeholder="Digite seu email"
              className={emailError ? 'erroNome' : ''}
              onKeyDown={(e) => {
                if (e.key == 'Enter') {
                  handleResetPassword(
                    e,
                    emailRecoverPasswordRef.current?.value
                  );
                }
              }}
              disabled={disabledButton}
            />
            <ResetPasswordButton
              onClick={(e) =>
                handleResetPassword(e, emailRecoverPasswordRef.current?.value)
              }
              loading={loading}
              disabled={disabledButton}
            >
              {loading && <Loading loading={loading} />}
            </ResetPasswordButton>
            {showEmailSended && (
              <EmailSended>
                <ErrorMessage>
                  Redefinição de senha enviada para o seu e-mail!
                </ErrorMessage>
                <ErrorMessage>Verifique também a caixa de spam!</ErrorMessage>
              </EmailSended>
            )}
            {showWarning.status && (
              <Error>
                <ErrorMessage>{showWarning.message}</ErrorMessage>
              </Error>
            )}
          </ShowContent>
        )}
      </LoginContainer>
    </Container>
  );
}

export default Main;
