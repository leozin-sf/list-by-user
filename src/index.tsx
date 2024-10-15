import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from '../src/components/pages/index';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
