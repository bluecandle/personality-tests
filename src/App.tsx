import React, { useEffect } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import RootNavigator from './navigation/RootNavigator';
import { TestEngineProvider } from './state/TestEngineProvider';
import { initAdmob } from './services/admob';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  colors: {
    background: {
      900: '#0f172a',
      800: '#1f2937',
      700: '#374151',
    },
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
  },
});

const App = () => {
  useEffect(() => {
    (async () => {
      try {
        await initAdmob();
      } catch (e) {
        console.log('[admob] init error', e);
      }
    })();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <TestEngineProvider>
        <RootNavigator />
      </TestEngineProvider>
    </NativeBaseProvider>
  );
};

export default App;
