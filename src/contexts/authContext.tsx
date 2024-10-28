import React, { createContext, useContext, useState, FormEvent } from 'react';
import { supabase } from '../components/auth/SupaBaseClient';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  loading: boolean;
  showWarning: boolean;
  emailError: boolean;
  passwordError: boolean;
  nameError: boolean;
  lastNameError: boolean;
  passwordWarning: boolean;
  showLogin: boolean;
  showRegister: boolean;
  showResetPassword: boolean;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
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
    setLoading(true);
    setEmailError(!email || email.trim() === '');
    setPasswordError(!password || password.trim() === '');

    if (!email || email.trim() === '' || !password || password.trim() === '') {
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    } else {
      navigate('/to-do-list');
    }
    setLoading(false);
  };

  const handleRegister = async (
    e: FormEvent,
    name: string | undefined,
    lastName: string | undefined,
    email: string | undefined,
    password: string | undefined
  ) => {
    e.preventDefault();
    setLoading(true);

    setNameError(!name || name.trim() === '');
    setLastNameError(!lastName || lastName.trim() === '');
    setEmailError(!email || email.trim() === '');
    setPasswordError(!password || password.trim() === '');

    if (!name || !lastName || !email || !password) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, last_name: lastName },
        },
      });

      if (error) {
        if (error.message === 'User already registered') {
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 10000);
        } else if (
          error.message === 'Password should be at least 6 characters.'
        ) {
          setPasswordWarning(true);
          setTimeout(() => setPasswordWarning(false), 10000);
        } else {
          console.error(error.message);
        }
      } else if (data.user) {
        await supabase
          .from('users')
          .insert([
            { user_id: data.user.id, email, name, last_name: lastName },
          ]);
        navigate('/to-do-list');
      }
    } catch (error) {
      console.error('Erro no registro', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (
    e: FormEvent,
    email: string | undefined
  ) => {
    e.preventDefault();
    setLoading(true);
    setEmailError(!email || email.trim() === '');

    if (!email) {
      setLoading(false);
      return;
    }

    try {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (userError || !user) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 5000);
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        console.error('Erro ao enviar e-mail de redefinição de senha', error);
      } else {
        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
          setShowResetPassword(false);
          setShowLogin(true);
        }, 5000);
      }
    } catch (error) {
      console.error('Erro na recuperação de senha', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
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
