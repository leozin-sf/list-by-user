// src/components/layout/Layout.tsx
import React from 'react';
import Page from '../Page';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <Page>{children}</Page>;
};

export default Layout;
