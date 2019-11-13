import { createStore, compose } from 'redux';
import rootReducer from '../reducers/index';


declare global{
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
  
}

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (preloadedState: object) => (
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(),
  )
);

const store = configureStore({});

export default store;