import React from 'react';
import MusicProvider from './app/context/MusicContext';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './app/navigation/MainStack';
import {SheetProvider} from 'react-native-actions-sheet';
import './app/sheets';
import {store} from './app/store';
import {Provider} from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
      <SheetProvider>
        <NavigationContainer>
          <MusicProvider>
            <MainStack />
          </MusicProvider>
        </NavigationContainer>
      </SheetProvider>
    </Provider>
  );
};

export default App;
