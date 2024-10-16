import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { LogginButton, User } from '../Index/styles';

export const Content = styled.div``;

export const UserReset = styled(User)`
  & > :nth-of-type(1) {
    margin-bottom: 1rem;
  }
`;

export const RecoveryButton = styled(LogginButton)`
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
