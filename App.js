import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './RootNavigator';
import {Provider} from 'react-redux';

export default App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};
