import { FormEvent, useRef, useState, useEffect } from 'react';
import { supabase } from '../../auth/SupaBaseClient';
import { useNavigate } from 'react-router-dom';

import Container from '../../layout/Container';
import { Loading } from '../../common/DotLoading';
import { LoginContainer, User, ErrorMessage } from '../Home/styles';
import { Content, UserReset, RecoveryButton } from './styles';
import PasswordInput from '../../common/Password';

export function PasswordRecovery() {
  const [loading, setLoading] = useState<boolean>(false);
  const newPassword = useRef<HTMLInputElement>(null);
  const confirmedPassword = useRef<HTMLInputElement>(null);
  const [passwordMatches, setPasswordMatches] = useState<boolean>(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get('access_token');
    if (token) {
    } else {
      setError('Token de recuperação de senha inválido ou ausente');
      navigate('/');
    }
  }, [navigate]);

  const changePassword = async (e: FormEvent) => {
    e.preventDefault();

    const password = newPassword?.current?.value;
    const confirm = confirmedPassword?.current?.value;

    if (password !== confirm) {
      setPasswordMatches(true);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        password: password || '',
      });
      setLoading(false);

      if (error) {
        setError(error.message);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Falha ao atualizar a senha');
      setLoading(false);
    }
  };

  return (
    <Content>
      <Container>
        <LoginContainer>
          <UserReset>
            <PasswordInput
              placeholder="Digite sua nova senha"
              ref={newPassword}
            />
            <PasswordInput
              placeholder="Repita sua senha"
              ref={confirmedPassword}
              onEnterPress={changePassword}
            />
          </UserReset>
          <RecoveryButton onClick={changePassword} loading={loading}>
            {loading && <Loading loading={loading} />}
          </RecoveryButton>
          {passwordMatches && (
            <ErrorMessage>Senhas não coincidem!</ErrorMessage>
          )}
          {error && (
            <ErrorMessage style={{ color: 'red' }}>{error}</ErrorMessage>
          )}
        </LoginContainer>
      </Container>
    </Content>
  );
}
