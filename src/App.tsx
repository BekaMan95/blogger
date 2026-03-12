/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootLayout from './layout';
import { store } from './app/store';
import ToastContainer from './components/toaster-container';

enableScreens();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={ store }>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ToastContainer />
        <RootLayout />
      </SafeAreaProvider>
    </Provider>
  );
}


export default App;
