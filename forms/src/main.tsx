import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm.tsx';
import ReactHookForm from './components/ReactHookForm/ReactHookForm.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="uncontrolled-form" element={<UncontrolledForm />} />
          <Route path="react-hook-form" element={<ReactHookForm />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
