import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { useDbStore } from "../shared/store/useDbStore";

useDbStore.getState().bootstrap();

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
