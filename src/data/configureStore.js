import { getConfig } from '@edx/frontend-platform';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';


const sagaMiddleware = createSagaMiddleware();

function composeMiddleware() {
  if (getConfig().ENVIRONMENT === 'development') {
    const loggerMiddleware = createLogger({
      collapsed: true,
    });
    return composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware, loggerMiddleware));
  }

  return compose(applyMiddleware(thunkMiddleware, sagaMiddleware));
}

function combineSagas(sagas) {
  function* rootSaga() {
    yield all([sagas])
  };
  return rootSaga;
}

export default function configureStore(initialState = {}, reducers, sagas) {
  const store = createStore(
    combineReducers(...reducers),
    initialState,
    composeMiddleware(),
  );
  sagaMiddleware.run(combineSagas(sagas));

  return store;
}
