import { Colors, Breakpoints, Typography, Theme } from './types';

const colors: Colors = {
  background: '#282c34',
  text: '#000000',
  white: '#ffffff',
  grey: '#808080',

  loginPage: {
    background: '#282c34',
    inputBorder: '#add8e6',
    text: '#000000',
    loginGradient: 'radial-gradient(circle, #5c0067 0%, #00d4ff 100%)',
    hoverButton: '#5c0067',
    error: '#FF5C5C',
  },

  toDoListPage: {
    task: '#727d92',
    userText: '#786518',
    bgButtonColor: '#007BFF',
    skeletonBg: 'linear-gradient(90deg, #cccccc 25%, #ffffff 50%, #cccccc 75%)',
    bgFiltered: '#0056B3',
  },
};
const breakpoints: Breakpoints = {
  small: 769,
  medium: 869,

  maxWidthDesk: '72rem',
};

const typography: Typography = {
  h1: '700 1.75rem "Montserrat", sans-serif',
  h2: '700 1.5rem "Montserrat", sans-serif',
  h3: '700 1.25rem "Montserrat", sans-serif',
  h4: '700 1.125rem "Montserrat", sans-serif',
  paragraph: '300 0.875rem "Montserrat", sans-serif',

  h1Desk: '700 2.75rem "Montserrat", sans-serif',
  h2Desk: '700 2.25rem "Montserrat", sans-serif',
  h3Desk: '700 1.75rem "Montserrat", sans-serif',
  h4Desk: '700 1.5rem "Montserrat", sans-serif',
  paragraphDesk: '300 1.125rem "Montserrat", sans-serif',

  base: '100%',
  baseDesk: '100%',
  display: '"Montserrat", sans-serif',
  body: '"Montserrat", sans-serif',

  size1: '2.75rem',
  size2: '2.25rem',
  size3: '1.75rem',
  size4: '1.5rem',
  size5: '1.25rem',
  size6: '1rem',
  large: '1.25rem',
  medium: '1.125rem',
  normal: '1rem',
  small: '0.875rem',
};

const theme: Theme = { colors, breakpoints, typography };

export default theme;
