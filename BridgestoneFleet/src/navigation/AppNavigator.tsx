import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import BisoLogo from '../../assets/B-iso.svg';

import { RootState } from '../store';
import { theme } from '../theme';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import FleetSelectionScreen from '../screens/auth/FleetSelectionScreen';

// Main App Screens
import DashboardScreen from '../screens/DashboardScreen';
import ServiceRequestScreen from '../screens/service/ServiceRequestScreen';
import TrackingScreen from '../screens/TrackingScreen';
import FleetManagementScreen from '../screens/FleetManagementScreen';
import BillingScreen from '../screens/BillingScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom header component with logo and profile
function CustomHeader({ navigation }: { navigation: any }) {
  const user = useSelector((state: RootState) => state.auth.user);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.logoContainer}>
        <BisoLogo width={40} height={40} />
      </View>
      <TouchableOpacity onPress={handleProfilePress} style={headerStyles.profileContainer}>
        <Avatar.Text 
          size={36} 
          label={user?.firstName?.charAt(0) || 'U'}
          style={headerStyles.avatar}
        />
      </TouchableOpacity>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    height: 60,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoFallback: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
    fontSize: 24,
  },
  profileContainer: {
    marginLeft: 16,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
});

function MainTabNavigator({ navigation }: { navigation: any }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Tracking':
              iconName = 'location-on';
              break;
            case 'Fleet':
              iconName = 'local-shipping';
              break;
            case 'Billing':
              iconName = 'receipt';
              break;
            default:
              iconName = 'help';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        header: () => <CustomHeader navigation={navigation} />,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tracking" component={TrackingScreen} />
      <Tab.Screen name="Fleet" component={FleetManagementScreen} />
      <Tab.Screen name="Billing" component={BillingScreen} />
    </Tab.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.onPrimary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ServiceRequest" 
        component={ServiceRequestScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.onPrimary,
        }}
      />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.onPrimary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="FleetSelection" 
        component={FleetSelectionScreen}
        options={{ title: 'Select Fleet' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}