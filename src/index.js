import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Player from './player/Player';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Player />

  </React.StrictMode>
);