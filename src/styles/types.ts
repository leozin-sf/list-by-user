export interface Colors {
  background: string;
  text: string;
  white: string;

  loginPage: {
    background: string;
    text: string;
    inputBorder: string;
    loginGradient: string;
    hoverButton: string;
    error: string;
  };

  toDoListPage: {
    userText: string;
  };
}

export interface Breakpoints {
  small: number;
  medium: number;

  maxWidthDesk: string;
}

export interface Typography {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  paragraph: string;

  h1Desk: string;
  h2Desk: string;
  h3Desk: string;
  h4Desk: string;
  paragraphDesk: string;

  base: string;
  baseDesk: string;
  display: string;
  body: string;

  size1: string;
  size2: string;
  size3: string;
  size4: string;
  size5: string;
  size6: string;

  large: string;
  medium: string;
  normal: string;
  small: string;
}

export interface Theme {
  colors: Colors;
  breakpoints: Breakpoints;
  typography: Typography;
}
