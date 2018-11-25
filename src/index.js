import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import initialState from './store/initialState';

import App from './App';
import rootReducer from './reducers';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    rootReducer,
    initialState
);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

registerServiceWorker();
