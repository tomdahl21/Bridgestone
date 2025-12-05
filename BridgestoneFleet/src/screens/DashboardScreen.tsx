import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { Text, Card, Button, ProgressBar, Chip, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { RootState } from '../store';

// Import Bridgestone logo
const BridgestoneLogo = require('../../assets/Bridgestone-Logo.png');

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);

  const mockData = {
    fleet: {
      totalVehicles: 24,
      activeVehicles: 22,
      inService: 2,
      maintenanceDue: 5,
    },
    serviceRequests: {
      pending: 3,
      inProgress: 2,
      completed: 15,
      urgent: 1,
    },
    costs: {
      monthlySpend: 28500,
      avgPerVehicle: 1187,
      lastMonth: 31200,
    }
  };

  const healthPercentage = (mockData.fleet.activeVehicles / mockData.fleet.totalVehicles) * 100;

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.welcomeTitle}>
          Welcome back, {user?.firstName || 'Fleet Manager'}
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Here's your fleet overview for today
        </Text>
      </View>

      {/* Quick Stats Row */}
      <View style={styles.statsRow}>
        <Card style={[styles.statCard, { backgroundColor: '#8B8FA3' }]}>
          <Card.Content style={styles.statContent}>
            <MaterialIcons name="local-shipping" size={24} color="#FFFFFF" />
            <Text variant="headlineSmall" style={[styles.statNumber, { color: '#FFFFFF' }]}>
              {mockData.fleet.totalVehicles}
            </Text>
            <Text variant="bodySmall" style={[styles.statLabel, { color: '#FFFFFF' }]}>
              Total Vehicles
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, { backgroundColor: theme.colors.success }]}>
          <Card.Content style={styles.statContent}>
            <MaterialIcons name="check-circle" size={24} color={theme.colors.onPrimary} />
            <Text variant="headlineSmall" style={[styles.statNumber, { color: theme.colors.onPrimary }]}>
              {mockData.fleet.activeVehicles}
            </Text>
            <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.onPrimary }]}>
              Active
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, { backgroundColor: '#CA3232' }]}>
          <Card.Content style={styles.statContent}>
            <MaterialIcons name="build" size={24} color="#FFFFFF" />
            <Text variant="headlineSmall" style={[styles.statNumber, { color: '#FFFFFF' }]}>
              {mockData.fleet.inService}
            </Text>
            <Text variant="bodySmall" style={[styles.statLabel, { color: '#FFFFFF' }]}>
              In Service
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Fleet Health Overview */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <MaterialIcons name="dashboard" size={24} color={theme.colors.primary} />
            <Text variant="titleLarge" style={styles.cardTitle}>Fleet Health</Text>
          </View>
          
          <View style={styles.healthMetric}>
            <Text variant="bodyMedium">Overall Fleet Health</Text>
            <ProgressBar 
              progress={healthPercentage / 100} 
              color={theme.colors.success}
              style={styles.progressBar}
            />
            <Text variant="bodySmall" style={styles.percentage}>
              {healthPercentage.toFixed(0)}% operational
            </Text>
          </View>

          <View style={styles.chipRow}>
            <Chip icon="warning" textStyle={{ color: theme.colors.accent }}>
              {mockData.fleet.maintenanceDue} Maintenance Due
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>Quick Actions</Text>
          
          <View style={styles.actionRow}>
            <Button 
              mode="contained" 
              icon="add" 
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
              onPress={() => navigation.navigate('ServiceRequest' as never)}
            >
              New Service Request
            </Button>
            <Button 
              mode="outlined" 
              icon="map" 
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
            >
              Track Services
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Active Service Requests */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <MaterialIcons name="assignment" size={24} color={theme.colors.primary} />
            <Text variant="titleLarge" style={styles.cardTitle}>Service Requests</Text>
          </View>
          
          <View style={styles.serviceGrid}>
            <View style={styles.serviceItem}>
              <Text variant="headlineMedium" style={styles.serviceNumber}>
                {mockData.serviceRequests.pending}
              </Text>
              <Text variant="bodyMedium">Pending</Text>
            </View>
            <View style={styles.serviceItem}>
              <Text variant="headlineMedium" style={[styles.serviceNumber, { color: theme.colors.accent }]}>
                {mockData.serviceRequests.inProgress}
              </Text>
              <Text variant="bodyMedium">In Progress</Text>
            </View>
            <View style={styles.serviceItem}>
              <Text variant="headlineMedium" style={[styles.serviceNumber, { color: theme.colors.success }]}>
                {mockData.serviceRequests.completed}
              </Text>
              <Text variant="bodyMedium">Completed Today</Text>
            </View>
          </View>

          {mockData.serviceRequests.urgent > 0 && (
            <View style={styles.urgentAlert}>
              <MaterialIcons name="priority-high" size={20} color={theme.colors.error} />
              <Text variant="bodyMedium" style={{ color: theme.colors.error, marginLeft: 8 }}>
                {mockData.serviceRequests.urgent} urgent request requires attention
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Monthly Spending */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <MaterialIcons name="attach-money" size={24} color={theme.colors.primary} />
            <Text variant="titleLarge" style={styles.cardTitle}>Monthly Spending</Text>
          </View>
          
          <View style={styles.spendingRow}>
            <View style={styles.spendingItem}>
              <Text variant="headlineMedium" style={styles.amount}>
                ${mockData.costs.monthlySpend.toLocaleString()}
              </Text>
              <Text variant="bodyMedium">This Month</Text>
            </View>
            <View style={styles.spendingItem}>
              <Text variant="titleMedium" style={styles.avgAmount}>
                ${mockData.costs.avgPerVehicle}
              </Text>
              <Text variant="bodySmall">Avg per Vehicle</Text>
            </View>
          </View>

          <Divider style={styles.divider} />
          
          <View style={styles.comparisonRow}>
            <Text variant="bodyMedium">
              vs Last Month: ${mockData.costs.lastMonth.toLocaleString()}
            </Text>
            <Chip 
              icon="trending-down" 
              textStyle={{ color: theme.colors.success }}
              style={{ backgroundColor: theme.colors.surfaceVariant }}
            >
              -8.7%
            </Chip>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  welcomeTitle: {
    color: theme.colors.onSurface,
    fontWeight: '600',
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  statNumber: {
    fontWeight: 'bold',
    marginTop: theme.spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  card: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    elevation: 2,
  },
  lastCard: {
    marginBottom: theme.spacing.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    marginLeft: theme.spacing.sm,
    color: theme.colors.onSurface,
    fontWeight: '600',
  },
  healthMetric: {
    marginBottom: theme.spacing.md,
  },
  progressBar: {
    marginVertical: theme.spacing.sm,
    height: 8,
    borderRadius: 4,
  },
  percentage: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'right',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md,
  },
  serviceItem: {
    alignItems: 'center',
  },
  serviceNumber: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  urgentAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.sm,
  },
  spendingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  spendingItem: {
    alignItems: 'flex-start',
  },
  amount: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  avgAmount: {
    color: theme.colors.onSurfaceVariant,
  },
  divider: {
    marginVertical: theme.spacing.sm,
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  buttonContent: {
    paddingVertical: theme.spacing.xs,
  },
});