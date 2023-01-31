import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* Redux Integration */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './Redux/reducer';


const loadAccessToken = () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken === null) return {};
    return {accessToken}
  }
  catch {
    return {}
  }
} 

const store = createStore(reducer, loadAccessToken());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
