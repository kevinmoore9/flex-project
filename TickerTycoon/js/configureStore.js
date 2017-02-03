import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';

//
async function getToken() {
  const token = await AsyncStorage.getItem('SESSION_TOKEN');
  console.log('async config store: ' + token);
}
export default function configureStore(onCompletion:()=>void):any {
  // getToken();
  const enhancer = compose(
    applyMiddleware(thunk, promise),
    devTools({
      name: 'tickertycoon', realtime: true,
    }),
  );
  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
