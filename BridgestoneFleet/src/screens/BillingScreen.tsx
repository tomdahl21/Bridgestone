import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, Button, Chip, Divider, SegmentedButtons, FAB } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

interface Invoice {
  id: string;
  invoiceNumber: string;
  vendor: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'needs_submission' | 'approved' | 'paid';
  serviceType: string;
  vehicleId?: string;
  description: string;
  createdDate: string;
}

const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2024-001',
    vendor: 'Bridgestone Service Center',
    amount: 1247.50,
    dueDate: '2024-12-15',
    status: 'needs_submission',
    serviceType: 'Tire Replacement',
    vehicleId: 'FL-4521',
    description: 'Complete tire replacement - 4 Bridgestone Dueler H/T tires',
    createdDate: '2024-12-01'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2024-002',
    vendor: 'Tampa Fleet Services',
    amount: 485.75,
    dueDate: '2024-12-20',
    status: 'pending',
    serviceType: 'Oil Change',
    vehicleId: 'FL-7832',
    description: 'Synthetic oil change and filter replacement',
    createdDate: '2024-12-02'
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2024-003',
    vendor: 'Bridgestone Service Center',
    amount: 2150.00,
    dueDate: '2024-12-18',
    status: 'needs_submission',
    serviceType: 'Brake Service',
    vehicleId: 'FL-9876',
    description: 'Complete brake system service - pads, rotors, fluid',
    createdDate: '2024-12-03'
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-2024-004',
    vendor: 'Mobile Fleet Repair',
    amount: 625.25,
    dueDate: '2024-12-25',
    status: 'pending',
    serviceType: 'Engine Diagnostic',
    vehicleId: 'FL-5567',
    description: 'Engine diagnostic and minor repairs',
    createdDate: '2024-11-28'
  },
  {
    id: 'inv-5',
    invoiceNumber: 'INV-2024-005',
    vendor: 'Bridgestone Service Center',
    amount: 895.00,
    dueDate: '2024-12-12',
    status: 'needs_submission',
    serviceType: 'Wheel Alignment',
    vehicleId: 'FL-4521',
    description: 'Four-wheel alignment and balancing service',
    createdDate: '2024-11-30'
  }
];

export default function BillingScreen() {
  const [selectedTab, setSelectedTab] = useState('needs_submission');

  const filteredInvoices = mockInvoices.filter(invoice => 
    selectedTab === 'all' ? true : invoice.status === selectedTab
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'needs_submission': return '#CA3232';
      case 'pending': return theme.colors.accent;
      case 'approved': return theme.colors.success;
      case 'paid': return theme.colors.success;
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'needs_submission': return 'Needs Submission';
      case 'pending': return 'Pending Review';
      case 'approved': return 'Approved';
      case 'paid': return 'Paid';
      default: return status;
    }
  };

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const needsSubmissionCount = mockInvoices.filter(i => i.status === 'needs_submission').length;
  const pendingCount = mockInvoices.filter(i => i.status === 'pending').length;

  const handleSubmitInvoice = (invoiceId: string) => {
    console.log('Submitting invoice:', invoiceId);
    // TODO: Implement invoice submission logic
  };

  const handleApproveInvoice = (invoiceId: string) => {
    console.log('Approving invoice:', invoiceId);
    // TODO: Implement invoice approval logic
  };

  const renderInvoiceCard = ({ item }: { item: Invoice }) => (
    <Card style={styles.invoiceCard}>
      <Card.Content>
        <View style={styles.invoiceHeader}>
          <View style={styles.invoiceInfo}>
            <Text variant="titleMedium" style={styles.invoiceNumber}>
              {item.invoiceNumber}
            </Text>
            <Text variant="bodyMedium" style={styles.vendor}>
              {item.vendor}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text variant="headlineSmall" style={styles.amount}>
              ${item.amount.toLocaleString()}
            </Text>
            <Chip 
              mode="flat"
              style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) + '20' }]}
              textStyle={{ color: getStatusColor(item.status) }}
            >
              {getStatusLabel(item.status)}
            </Chip>
          </View>
        </View>

        <View style={styles.invoiceDetails}>
          <View style={styles.detailRow}>
            <MaterialIcons name="build" size={16} color={theme.colors.onSurfaceVariant} />
            <Text variant="bodySmall" style={styles.detailText}>
              {item.serviceType}
            </Text>
          </View>
          {item.vehicleId && (
            <View style={styles.detailRow}>
              <MaterialIcons name="directions-car" size={16} color={theme.colors.onSurfaceVariant} />
              <Text variant="bodySmall" style={styles.detailText}>
                Vehicle: {item.vehicleId}
              </Text>
            </View>
          )}
          <View style={styles.detailRow}>
            <MaterialIcons name="schedule" size={16} color={theme.colors.onSurfaceVariant} />
            <Text variant="bodySmall" style={styles.detailText}>
              Due: {new Date(item.dueDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <Text variant="bodySmall" style={styles.description}>
          {item.description}
        </Text>

        {item.status === 'needs_submission' && (
          <View style={styles.actionRow}>
            <Button
              mode="contained"
              onPress={() => handleSubmitInvoice(item.id)}
              style={[styles.actionButton, { backgroundColor: '#CA3232' }]}
              contentStyle={styles.buttonContent}
              icon="send"
            >
              Submit for Approval
            </Button>
          </View>
        )}

        {item.status === 'pending' && (
          <View style={styles.actionRow}>
            <Button
              mode="outlined"
              onPress={() => handleApproveInvoice(item.id)}
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
              icon="check"
            >
              Approve Payment
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Billing & Invoices
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Manage fleet service invoices and approvals
        </Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <Card style={[styles.summaryCard, { backgroundColor: '#CA3232' }]}>
          <Card.Content style={styles.summaryContent}>
            <MaterialIcons name="send" size={24} color="#FFFFFF" />
            <Text variant="headlineSmall" style={styles.summaryNumber}>
              {needsSubmissionCount}
            </Text>
            <Text variant="bodySmall" style={styles.summaryLabel}>
              Need Submission
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.summaryCard, { backgroundColor: theme.colors.accent }]}>
          <Card.Content style={styles.summaryContent}>
            <MaterialIcons name="pending" size={24} color="#FFFFFF" />
            <Text variant="headlineSmall" style={styles.summaryNumber}>
              {pendingCount}
            </Text>
            <Text variant="bodySmall" style={styles.summaryLabel}>
              Pending Review
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.summaryCard, { backgroundColor: '#8B8FA3' }]}>
          <Card.Content style={styles.summaryContent}>
            <MaterialIcons name="attach-money" size={24} color="#FFFFFF" />
            <Text variant="headlineSmall" style={styles.summaryNumber}>
              ${totalAmount.toLocaleString()}
            </Text>
            <Text variant="bodySmall" style={styles.summaryLabel}>
              Total Amount
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Filter Tabs */}
      <SegmentedButtons
        value={selectedTab}
        onValueChange={setSelectedTab}
        buttons={[
          { value: 'needs_submission', label: 'Need Submission', icon: 'send' },
          { value: 'pending', label: 'Pending', icon: 'pending' },
          { value: 'all', label: 'All Invoices', icon: 'receipt' },
        ]}
        style={styles.filterTabs}
      />

      {/* Invoices List */}
      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item.id}
        renderItem={renderInvoiceCard}
        style={styles.invoicesList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="receipt" size={64} color={theme.colors.onSurfaceVariant} />
            <Text variant="titleMedium" style={styles.emptyTitle}>
              No invoices found
            </Text>
            <Text variant="bodyMedium" style={styles.emptyText}>
              No invoices match the selected filter
            </Text>
          </View>
        }
      />
    </View>
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
  title: {
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
  },
  summaryRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  summaryCard: {
    flex: 1,
  },
  summaryContent: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  summaryNumber: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  summaryLabel: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  filterTabs: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  invoicesList: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  separator: {
    height: theme.spacing.sm,
  },
  invoiceCard: {
    marginBottom: theme.spacing.sm,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontWeight: '600',
  },
  vendor: {
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.xs,
  },
  amountContainer: {
    alignItems: 'flex-end',
    gap: theme.spacing.xs,
  },
  amount: {
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  statusChip: {
    marginLeft: theme.spacing.sm,
  },
  invoiceDetails: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  detailText: {
    color: theme.colors.onSurfaceVariant,
  },
  description: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.md,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.sm,
  },
  actionButton: {
    minWidth: 160,
  },
  buttonContent: {
    paddingVertical: theme.spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl * 2,
    gap: theme.spacing.md,
  },
  emptyTitle: {
    fontWeight: '600',
  },
  emptyText: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
});