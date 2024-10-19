import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { LoginButton, User } from '../Home/styles';

export const Content = styled.div``;

export const UserReset = styled(User)`
  & > :nth-of-type(1) {
    margin-bottom: 1rem;
  }
`;

export const RecoveryButton = styled(LoginButton)`
  ${(props) =>
    props.loading
      ? css`
          ::after {
            content: '';
          }
        `
      : css`
          ::after {
            content: 'Recuperar';
          }
        `}
`;
