import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware , compose , createStore } from "redux";
import { Provider } from 'react-redux';
import { rootReducer } from "./redux/rootReducer";
import thunk from 'redux-thunk';

import './style/index.scss';

import App from './App';

const store = createStore(rootReducer, compose(
    applyMiddleware(
        thunk,
    )
))

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

