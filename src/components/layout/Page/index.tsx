// src/components/layout/Page.tsx
import React from 'react';
import { PageWrapper } from './styles'; // Importando o estilo do Page

type PageProps = {
  children: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
  return <PageWrapper>{children}</PageWrapper>;
};

export default Page;
