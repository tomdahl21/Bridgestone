import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store, persistor } from './src/store';
import { theme } from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingScreen from './src/components/LoadingScreen';

export default function App() {
  const paperTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: theme.colors.primary,
      onPrimary: theme.colors.onPrimary,
      secondary: theme.colors.secondary,
      surface: theme.colors.surface,
      onSurface: theme.colors.onSurface,
      background: theme.colors.background,
      onBackground: theme.colors.onBackground,
      error: theme.colors.error,
      outline: theme.colors.outline,
      surfaceVariant: theme.colors.surfaceVariant,
      onSurfaceVariant: theme.colors.onSurfaceVariant,
    },
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <PaperProvider theme={paperTheme}>
          <SafeAreaProvider>
            <StatusBar style="light" backgroundColor={theme.colors.primary} />
            <AppNavigator />
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
