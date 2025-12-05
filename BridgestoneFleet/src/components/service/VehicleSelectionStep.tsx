import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Searchbar, Chip, Button, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
  status: 'active' | 'maintenance' | 'inactive';
  location: string;
}

interface VehicleSelectionStepProps {
  selectedVehicle: Vehicle | null;
  onVehicleSelect: (vehicle: Vehicle) => void;
}

// Mock vehicle data
const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    vin: '1HGBH41JXMN109186',
    make: 'Ford',
    model: 'Transit 350',
    year: 2023,
    licensePlate: 'FL-4521',
    mileage: 28542,
    status: 'active',
    location: 'Tampa Depot'
  },
  {
    id: 'v2',
    vin: '1FTFW1ET5DFC98765',
    make: 'Ford',
    model: 'F-150',
    year: 2022,
    licensePlate: 'FL-7832',
    mileage: 45231,
    status: 'active',
    location: 'Miami Office'
  },
  {
    id: 'v3',
    vin: '5NPE34AF4FH654321',
    make: 'Hyundai',
    model: 'Sonata',
    year: 2024,
    licensePlate: 'FL-9876',
    mileage: 12450,
    status: 'active',
    location: 'Orlando Branch'
  },
  {
    id: 'v4',
    vin: '1C4RJFAG8FC123456',
    make: 'Jeep',
    model: 'Grand Cherokee',
    year: 2023,
    licensePlate: 'FL-5567',
    mileage: 32100,
    status: 'maintenance',
    location: 'Jacksonville Facility'
  }
];

export default function VehicleSelectionStep({ selectedVehicle, onVehicleSelect }: VehicleSelectionStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'maintenance'>('all');

  useEffect(() => {
    let filtered = mockVehicles;
    
    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.status === filterStatus);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(vehicle => 
        vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.vin.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredVehicles(filtered);
  }, [searchQuery, filterStatus]);

  const renderVehicle = ({ item }: { item: Vehicle }) => (
    <Card 
      style={[
        styles.vehicleCard,
        selectedVehicle?.id === item.id && styles.selectedCard
      ]}
      onPress={() => onVehicleSelect(item)}
    >
      <Card.Content>
        <View style={styles.vehicleHeader}>
          <View style={styles.vehicleInfo}>
            <Text variant="titleMedium" style={styles.vehicleTitle}>
              {item.year} {item.make} {item.model}
            </Text>
            <Text variant="bodyMedium" style={styles.licensePlate}>
              {item.licensePlate}
            </Text>
          </View>
          <Chip 
            mode={item.status === 'active' ? 'flat' : 'outlined'}
            style={[
              styles.statusChip,
              item.status === 'active' ? styles.activeChip : styles.maintenanceChip
            ]}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Chip>
        </View>
        
        <View style={styles.vehicleDetails}>
          <View style={styles.detailRow}>
            <MaterialIcons name="confirmation-number" size={16} color={theme.colors.onSurfaceVariant} />
            <Text variant="bodySmall" style={styles.detailText}>
              VIN: {item.vin}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="speed" size={16} color={theme.colors.onSurfaceVariant} />
            <Text variant="bodySmall" style={styles.detailText}>
              {item.mileage.toLocaleString()} miles
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="place" size={16} color={theme.colors.onSurfaceVariant} />
            <Text variant="bodySmall" style={styles.detailText}>
              {item.location}
            </Text>
          </View>
        </View>
        
        {selectedVehicle?.id === item.id && (
          <View style={styles.selectedIndicator}>
            <MaterialIcons name="check-circle" size={20} color={theme.colors.primary} />
            <Text variant="bodySmall" style={styles.selectedText}>
              Selected
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Select Vehicle
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Choose the vehicle that needs service
      </Text>
      
      <Searchbar
        placeholder="Search by make, model, plate, or VIN"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      <View style={styles.filterRow}>
        <Text variant="labelMedium" style={styles.filterLabel}>Filter:</Text>
        <Chip 
          selected={filterStatus === 'all'}
          onPress={() => setFilterStatus('all')}
          style={styles.filterChip}
        >
          All ({mockVehicles.length})
        </Chip>
        <Chip 
          selected={filterStatus === 'active'}
          onPress={() => setFilterStatus('active')}
          style={styles.filterChip}
        >
          Active ({mockVehicles.filter(v => v.status === 'active').length})
        </Chip>
        <Chip 
          selected={filterStatus === 'maintenance'}
          onPress={() => setFilterStatus('maintenance')}
          style={styles.filterChip}
        >
          Maintenance ({mockVehicles.filter(v => v.status === 'maintenance').length})
        </Chip>
      </View>
      
      <FlatList
        data={filteredVehicles}
        keyExtractor={(item) => item.id}
        renderItem={renderVehicle}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      
      {selectedVehicle && (
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="labelMedium" style={styles.summaryLabel}>
              Selected Vehicle:
            </Text>
            <Text variant="titleMedium">
              {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.licensePlate})
            </Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.lg,
  },
  searchBar: {
    marginBottom: theme.spacing.md,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  filterLabel: {
    color: theme.colors.onSurfaceVariant,
  },
  filterChip: {
    marginRight: theme.spacing.xs,
  },
  list: {
    flex: 1,
  },
  separator: {
    height: theme.spacing.sm,
  },
  vehicleCard: {
    marginBottom: theme.spacing.sm,
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleTitle: {
    fontWeight: '600',
  },
  licensePlate: {
    color: theme.colors.onSurfaceVariant,
    fontWeight: '500',
  },
  statusChip: {
    marginLeft: theme.spacing.sm,
  },
  activeChip: {
    backgroundColor: theme.colors.success + '20',
  },
  maintenanceChip: {
    backgroundColor: theme.colors.accent + '20',
  },
  vehicleDetails: {
    gap: theme.spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  detailText: {
    color: theme.colors.onSurfaceVariant,
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  selectedText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  summaryCard: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.primaryContainer,
  },
  summaryLabel: {
    marginBottom: theme.spacing.xs,
  },
});