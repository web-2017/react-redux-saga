import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga'

import App from './App';
import './index.css';
import {rootReducer} from "./redux/rootReducer";
import {forbiddenWordsMiddleware} from "./redux/middleware";
import {sagaWatcher} from "./redux/sagas";


const saga = createSagaMiddleware()

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunk,
            forbiddenWordsMiddleware,
            saga
        )
    )
)

saga.run(sagaWatcher)

render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
