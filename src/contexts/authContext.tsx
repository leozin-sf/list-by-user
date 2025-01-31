import React, { createContext, useContext, useState, FormEvent } from 'react';
import { supabase } from '../components/auth/SupaBaseClient';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  loading: boolean;
  showWarning: { status: boolean; message: string };
  emailError: boolean;
  passwordError: boolean;
  nameError: boolean;
  lastNameError: boolean;
  passwordWarning: boolean;
  showLogin: boolean;
  showRegister: boolean;
  showResetPassword: boolean;
  showEmailSended: boolean;
  disabledButton: boolean;
  setDisabledButton: (value: boolean) => void;
  setEmailError: (value: boolean) => void;
  setPasswordError: (value: boolean) => void;
  setNameError: (value: boolean) => void;
  setLastNameError: (value: boolean) => void;
  setShowLogin: (value: boolean) => void;
  setShowRegister: (value: boolean) => void;
  setShowResetPassword: (value: boolean) => void;
  handleLogin: (
    e: FormEvent,
    email: string | undefined,
    password: string | undefined
  ) => Promise<void>;
  handleRegister: (
    e: FormEvent,
    name: string | undefined,
    lastName: string | undefined,
    email: string | undefined,
    password: string | undefined
  ) => Promise<void>;
  handleResetPassword: (
    e: FormEvent,
    email: string | undefined
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [showEmailSended, setShowEmailSended] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<{
    status: boolean;
    message: string;
  }>({
    status: false,
    message: '',
  });
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (
    e: FormEvent,
    email: string | undefined,
    password: string | undefined
  ) => {
    e.preventDefault();
    setEmailError(!email || email.trim() === '');
    setPasswordError(!password || password.trim() === '');

    if (!email || email.trim() === '' || !password || password.trim() === '') {
      return;
    }

    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (userError || !userData) {
        if (
          userError.message ===
          'JSON object requested, multiple (or no) rows returned'
        ) {
          console.error('Usuário não encontrado', userError);
          setLoading(true);
          setDisabledButton(true);
          setTimeout(() => {
            setShowWarning({ status: true, message: 'Usuário não cadastrado' });
            setLoading(false);
            setDisabledButton(false);
          }, 500);
          setTimeout(() => {
            setShowWarning({ status: false, message: '' });
            setLoading(false);
          }, 3000);
        } else {
          console.error('Falha ao verificar usuário', userError);
          setLoading(true);
          setDisabledButton(true);
          setTimeout(() => {
            setShowWarning({
              status: true,
              message: 'Falha ao verificar usuário',
            });
            setLoading(false);
            setDisabledButton(false);
          }, 500);
          setTimeout(() => {
            setShowWarning({ status: false, message: '' });
            setLoading(false);
          }, 3000);
        }
        return;
      }

      const { error: errorAuth } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (errorAuth) {
        if (errorAuth.message === 'Invalid login credentials') {
          console.error(errorAuth);
          setLoading(true);
          setDisabledButton(true);
          setTimeout(() => {
            setShowWarning({ status: true, message: 'Senha inválida' });
            setLoading(false);
            setDisabledButton(false);
          }, 500);
          setTimeout(() => {
            setShowWarning({ status: false, message: '' });
            setLoading(false);
          }, 3000);
        } else {
          console.error(errorAuth);
          setLoading(true);
          setDisabledButton(true);
          setTimeout(() => {
            setShowWarning({
              status: true,
              message: 'Falha ao fazer login',
            });
            setLoading(false);
            setDisabledButton(false);
          }, 500);
          setTimeout(() => {
            setShowWarning({ status: false, message: '' });
            setLoading(false);
          }, 3000);
        }
      } else {
        setTimeout(() => {
          setLoading(true);
          setShowWarning({ status: false, message: '' });
          setDisabledButton(true);
        }, 0);
        setTimeout(() => {
          navigate('/to-do-list');
          setLoading(false);
          setDisabledButton(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (
    e: FormEvent,
    name: string | undefined,
    lastName: string | undefined,
    email: string | undefined,
    password: string | undefined
  ) => {
    e.preventDefault();

    setNameError(!name || name.trim() === '');
    setLastNameError(!lastName || lastName.trim() === '');
    setEmailError(!email || email.trim() === '');
    setPasswordError(!password || password.trim() === '');

    if (!name || !lastName || !email || !password) {
      return;
    }

    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (userData) {
        console.error('Usuário já cadastrado');
        setLoading(true);
        setDisabledButton(true);
        setShowWarning({ status: true, message: 'Usuário já cadastrado' });
        setTimeout(() => {
          setShowWarning({ status: false, message: '' });
          setLoading(false);
          setDisabledButton(false);
        }, 3500);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, last_name: lastName },
        },
      });

      if (error) {
        if (error.message === 'User already registered') {
          setLoading(true);
          setDisabledButton(true);
          setShowWarning({ status: true, message: 'Usuário já cadastrado' });
          setTimeout(() => {
            setShowWarning({ status: false, message: '' });
            setLoading(false);
            setDisabledButton(false);
          }, 3500);
        } else if (
          error.message === 'Password should be at least 6 characters.'
        ) {
          setLoading(true);
          setDisabledButton(true);
          setPasswordWarning(true);
          setTimeout(() => {
            setPasswordWarning(false);
            setLoading(false);
            setDisabledButton(false);
          }, 3500);
        } else {
          console.error(error.message);
        }
      } else if (data.user) {
        await supabase
          .from('users')
          .insert([
            { user_id: data.user.id, email, name, last_name: lastName },
          ]);
        setTimeout(() => {
          navigate('/to-do-list');
          setLoading(false);
        }, 850);
      }
    } catch (error) {
      console.error('Erro no registro', error);
    }
  };

  const handleResetPassword = async (
    e: FormEvent,
    email: string | undefined
  ) => {
    e.preventDefault();
    setEmailError(!email || email.trim() === '');

    if (!email) {
      return;
    }

    try {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (userError || !user) {
        setLoading(true);
        setShowWarning({ status: true, message: 'E-mail inválido' });
        setDisabledButton(true);
        setTimeout(() => {
          setShowWarning({ status: false, message: '' });
          setDisabledButton(false);
          setLoading(false);
        }, 3000);
        return;
      }

      setShowEmailSended(true);
      setLoading(true);
      setDisabledButton(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        console.error('Erro ao enviar e-mail de redefinição de senha', error);
        setShowEmailSended(false);
      } else {
        setTimeout(() => {
          setShowEmailSended(false);
          setShowResetPassword(false);
          setShowLogin(true);
          setDisabledButton(false);
          setLoading(false);
        }, 4000);
      }
    } catch (error) {
      console.error('Erro na recuperação de senha', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        disabledButton,
        setDisabledButton,
        showEmailSended,
        loading,
        showWarning,
        emailError,
        setEmailError,
        passwordError,
        setPasswordError,
        nameError,
        setNameError,
        lastNameError,
        setLastNameError,
        passwordWarning,
        showLogin,
        showRegister,
        showResetPassword,
        setShowLogin,
        setShowRegister,
        setShowResetPassword,
        handleLogin,
        handleRegister,
        handleResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
