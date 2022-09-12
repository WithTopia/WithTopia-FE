import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from './redux/store';
import {CookiesProvider} from 'react-cookie';
import axios from './api/axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={configureStore}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </Provider>
);
