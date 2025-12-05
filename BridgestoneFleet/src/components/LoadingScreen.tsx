import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { theme } from '../theme';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator 
        size="large" 
        color={theme.colors.primary}
        style={styles.loader}
      />
      <Text variant="titleMedium" style={styles.text}>
        Loading Bridgestone Fleet...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loader: {
    marginBottom: theme.spacing.md,
  },
  text: {
    color: theme.colors.onSurfaceVariant,
  },
});