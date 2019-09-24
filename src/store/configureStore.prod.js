import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(preloadedState) {
  console.log('prod');
  return createStore(rootReducer, preloadedState, compose(applyMiddleware(thunkMiddleware)));
}
