import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Button, Card, TextInput, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { theme } from '../../theme';
import Logo from '../../components/Logo';

const { width } = Dimensions.get('window');

// Temporary mock user for development
const mockUser = {
  id: '1',
  email: 'manager@bridgestone.com',
  firstName: 'Sarah',
  lastName: 'Johnson',
  role: 'manager' as const,
  fleetIds: ['fleet-1', 'fleet-2'],
  phoneNumber: '+1-555-0123',
  createdAt: new Date(),
};

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('manager@bridgestone.com');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      dispatch(loginSuccess({
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now()
      }));
      setLoading(false);
    }, 1000);
  };

  const handleBiometricLogin = () => {
    // Simulate biometric authentication
    dispatch(loginSuccess({
      user: mockUser,
      token: 'mock-jwt-token-biometric-' + Date.now()
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Bridgestone Logo Placeholder */}
        {/* Bridgestone Corporate Logo */}
        <Logo 
          size="large" 
          style={styles.logoContainer}
        />
        
        <Text variant="titleLarge" style={styles.subtitle}>
          Fleet Solutions
        </Text>
      </View>

      <Card style={styles.loginCard}>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleLarge" style={styles.loginTitle}>
            Welcome Back
          </Text>
          <Text variant="bodyMedium" style={styles.loginSubtitle}>
            Sign in to manage your fleet services
          </Text>

          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
            left={<TextInput.Icon icon="lock" />}
          />

          <Button 
            mode="contained" 
            onPress={handleLogin}
            style={styles.loginButton}
            contentStyle={styles.buttonContent}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <Divider style={styles.divider} />

          <Button 
            mode="outlined" 
            onPress={handleBiometricLogin}
            style={styles.biometricButton}
            contentStyle={styles.buttonContent}
            icon="fingerprint"
          >
            Use Touch ID / Face ID
          </Button>

          <View style={styles.demoInfo}>
            <MaterialIcons name="info" size={16} color={theme.colors.onSurfaceVariant} />
            <Text variant="bodySmall" style={styles.demoText}>
              This is a demo version. Use any credentials to sign in.
            </Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.footerText}>
          © 2025 Bridgestone Americas. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
  },
  logoContainer: {
    marginBottom: theme.spacing.xl,
  },
  subtitle: {
    color: theme.colors.secondary,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: theme.spacing.xl,
  },
  loginCard: {
    marginHorizontal: theme.spacing.lg,
    elevation: 4,
    borderRadius: theme.borderRadius.lg,
  },
  cardContent: {
    padding: theme.spacing.lg,
  },
  loginTitle: {
    color: theme.colors.onSurface,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  loginSubtitle: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  loginButton: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  biometricButton: {
    marginBottom: theme.spacing.md,
  },
  buttonContent: {
    paddingVertical: theme.spacing.sm,
  },
  divider: {
    marginVertical: theme.spacing.md,
  },
  demoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.sm,
  },
  demoText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.onSurfaceVariant,
    flex: 1,
  },
  footer: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.onSurfaceVariant,
  },
});