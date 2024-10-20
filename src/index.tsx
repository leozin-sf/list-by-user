import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';

import ProtectedRoute from './components/auth/ProtectedRoute';

import Main from './components/pages/Home/index';
import { ToDoList } from './components/pages/ToDoList';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { PasswordRecovery } from './components/pages/PasswordRecovery';

if (process.env.NODE_ENV !== 'development') {
  console.log = function () {};
  console.error = function () {};
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/to-do-list"
              element={
                <ProtectedRoute>
                  <ToDoList />
                </ProtectedRoute>
              }
            />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
