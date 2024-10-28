import styled from '@emotion/styled';

export const PasswordContent = styled.div`
  position: relative;
  input[type='password']::-ms-reveal,
  input[type='password']::-ms-clear,
  input[type='password']::ms-reveal,
  input[type='password']::ms-clear,
  input[type='password']::-webkit-credentials-auto-fill-button,
  input[type='password']::-webkit-inner-spin-button,
  input[type='password']::-webkit-outer-spin-button,
  input[type='password']::-webkit-textfield-decoration-container,
  input[type='password']::-ms-clear,
  input[type='password']::-ms-reveal,
  input[type='password']:focus::-ms-value,
  input[type='password']::-webkit-credentials-auto-fill-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
    visibility: hidden;
    pointer-events: none;
    position: absolute;
    right: 0;
    color: transparent;
    text-shadow: 0 0 0 black;
  }
`;

export const ButtonShowHide = styled.button<{ isActive: boolean }>`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 1rem;
  background-color: transparent;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-10%, -50%);

  &::after {
    content: ${(p) =>
      p.isActive ? `url(/assets/hide.svg)` : 'url(/assets/show.svg)'};
    display: inline-block;
    width: 100%;
    height: 100%;
  }
`;
