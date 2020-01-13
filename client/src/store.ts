import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { logger } from 'redux-logger';

import createRootReducer from './modules/reducers';
import rootSaga from 'modules/sagas';

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [] as any;

const sagaMiddleware = createSagaMiddleware ();

let middleware = [
  routerMiddleware(history),
  sagaMiddleware,
];


if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
  
  const { __REDUX_DEVTOOLS_EXTENSION__ } = window as any;
  
  if (__REDUX_DEVTOOLS_EXTENSION__ && typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    // enhancers.push(__REDUX_DEVTOOLS_EXTENSION__());
  } else {
    // enhancers.push(DevTools.instrument());
  };
};

// Remove undefined middleware
middleware = middleware.filter(e =>  {
  return typeof e === 'function';
});

const extendCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Redux enhancers
const composedEnhancers = extendCompose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  createRootReducer(history),
  initialState,
  composedEnhancers,
);


if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
  let sagaTask = sagaMiddleware.run(rootSaga);

  (module as any).hot.accept ("modules/reducers", () => {
    const nextRootReducer = require ("modules/reducers");
    store.replaceReducer (nextRootReducer);
  });
  (module as any).hot.accept("modules/sagas", () => {
    sagaTask.cancel()
    sagaTask.toPromise().then(() => {
      sagaTask = sagaMiddleware.run(function* replacedSaga () {
          const getNewSagas = require("modules/sagas");
          yield getNewSagas()
        })
      })
  })
};

export default store;
