import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TraceProvider from './trace-provider';

ReactDOM.render(
  <React.StrictMode>
    <TraceProvider>
      <App />
    </TraceProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

