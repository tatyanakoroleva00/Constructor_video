import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DemoPlayer from './player/DemoPlayer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <DemoPlayer/>
  </React.StrictMode>
);