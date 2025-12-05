import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button, TextInput, RadioButton, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

interface Location {
  type: 'current' | 'custom';
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface LocationStepProps {
  location: Location | null;
  onLocationUpdate: (location: Location) => void;
}

export default function LocationStep({ location, onLocationUpdate }: LocationStepProps) {
  const [locationType, setLocationType] = useState<'current' | 'custom'>(location?.type || 'current');
  const [customAddress, setCustomAddress] = useState(location?.address || '');

  const handleLocationTypeChange = (type: 'current' | 'custom') => {
    setLocationType(type);
    
    if (type === 'current') {
      // Simulate getting current location
      onLocationUpdate({
        type: 'current',
        address: '1234 Main Street, Tampa, FL 33607',
        coordinates: {
          latitude: 27.9506,
          longitude: -82.4572
        }
      });
    } else {
      if (customAddress.trim()) {
        onLocationUpdate({
          type: 'custom',
          address: customAddress.trim()
        });
      }
    }
  };

  const handleCustomAddressChange = (address: string) => {
    setCustomAddress(address);
    if (locationType === 'custom' && address.trim()) {
      onLocationUpdate({
        type: 'custom',
        address: address.trim()
      });
    }
  };

  const getCurrentLocation = () => {
    // Simulate location services
    const mockLocation = {
      type: 'current' as const,
      address: '1234 Main Street, Tampa, FL 33607',
      coordinates: {
        latitude: 27.9506,
        longitude: -82.4572
      }
    };
    onLocationUpdate(mockLocation);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Service Location
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Where should the technician meet you?
      </Text>

      {/* Location Type Selection */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Choose Location Type
          </Text>
          
          <View style={styles.radioGroup}>
            <View style={styles.radioRow}>
              <RadioButton
                value="current"
                status={locationType === 'current' ? 'checked' : 'unchecked'}
                onPress={() => handleLocationTypeChange('current')}
                color={theme.colors.primary}
              />
              <View style={styles.radioContent}>
                <Text variant="bodyLarge" style={styles.radioLabel}>
                  Use Current Location
                </Text>
                <Text variant="bodySmall" style={styles.radioDescription}>
                  We'll detect your current location automatically
                </Text>
              </View>
              <MaterialIcons name="my-location" size={24} color={theme.colors.primary} />
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.radioRow}>
              <RadioButton
                value="custom"
                status={locationType === 'custom' ? 'checked' : 'unchecked'}
                onPress={() => handleLocationTypeChange('custom')}
                color={theme.colors.primary}
              />
              <View style={styles.radioContent}>
                <Text variant="bodyLarge" style={styles.radioLabel}>
                  Enter Custom Address
                </Text>
                <Text variant="bodySmall" style={styles.radioDescription}>
                  Specify a different location for service
                </Text>
              </View>
              <MaterialIcons name="edit-location" size={24} color={theme.colors.primary} />
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Current Location Card */}
      {locationType === 'current' && (
        <Card style={styles.locationCard}>
          <Card.Content>
            <View style={styles.locationHeader}>
              <MaterialIcons name="place" size={24} color={theme.colors.primary} />
              <Text variant="titleMedium" style={styles.locationTitle}>
                Current Location
              </Text>
            </View>
            
            {location?.type === 'current' ? (
              <View style={styles.currentLocationInfo}>
                <Text variant="bodyMedium" style={styles.addressText}>
                  {location.address}
                </Text>
                <Button
                  mode="outlined"
                  icon="refresh"
                  onPress={getCurrentLocation}
                  style={styles.refreshButton}
                  compact
                >
                  Refresh Location
                </Button>
              </View>
            ) : (
              <View style={styles.locationPrompt}>
                <Text variant="bodyMedium" style={styles.promptText}>
                  Tap to get your current location
                </Text>
                <Button
                  mode="contained"
                  icon="my-location"
                  onPress={getCurrentLocation}
                  style={styles.getLocationButton}
                >
                  Get Current Location
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>
      )}

      {/* Custom Address Input */}
      {locationType === 'custom' && (
        <Card style={styles.locationCard}>
          <Card.Content>
            <View style={styles.locationHeader}>
              <MaterialIcons name="edit-location" size={24} color={theme.colors.primary} />
              <Text variant="titleMedium" style={styles.locationTitle}>
                Custom Address
              </Text>
            </View>
            
            <TextInput
              label="Street Address"
              value={customAddress}
              onChangeText={handleCustomAddressChange}
              mode="outlined"
              style={styles.addressInput}
              placeholder="Enter the full service address..."
              multiline
              numberOfLines={3}
              left={<TextInput.Icon icon="place" />}
            />
            
            <Text variant="bodySmall" style={styles.helpText}>
              Include street address, city, state, and ZIP code for best results
            </Text>
          </Card.Content>
        </Card>
      )}

      {/* Location Summary */}
      {location && (
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="labelMedium" style={styles.summaryLabel}>
              Service Location:
            </Text>
            <View style={styles.summaryContent}>
              <MaterialIcons 
                name={location.type === 'current' ? 'my-location' : 'place'} 
                size={20} 
                color={theme.colors.primary} 
              />
              <View style={styles.summaryText}>
                <Text variant="bodyMedium" style={styles.summaryAddress}>
                  {location.address}
                </Text>
                <Text variant="bodySmall" style={styles.summaryType}>
                  {location.type === 'current' ? 'Current Location' : 'Custom Address'}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Additional Info */}
      <Card style={styles.infoCard}>
        <Card.Content>
          <View style={styles.infoHeader}>
            <MaterialIcons name="info" size={20} color={theme.colors.accent} />
            <Text variant="titleSmall" style={styles.infoTitle}>
              Service Location Tips
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.infoText}>
            • Ensure the location is accessible for service vehicles{'\n'}
            • Provide additional details in the notes section if needed{'\n'}
            • The technician will contact you before arrival
          </Text>
        </Card.Content>
      </Card>
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
  card: {
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  radioGroup: {
    gap: theme.spacing.sm,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  radioContent: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  radioLabel: {
    fontWeight: '500',
  },
  radioDescription: {
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.xs,
  },
  divider: {
    marginVertical: theme.spacing.sm,
  },
  locationCard: {
    marginBottom: theme.spacing.lg,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  locationTitle: {
    fontWeight: '600',
  },
  currentLocationInfo: {
    gap: theme.spacing.md,
  },
  addressText: {
    fontWeight: '500',
  },
  refreshButton: {
    alignSelf: 'flex-start',
  },
  locationPrompt: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  promptText: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  getLocationButton: {
    minWidth: 200,
  },
  addressInput: {
    marginBottom: theme.spacing.sm,
  },
  helpText: {
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  summaryCard: {
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceVariant,
  },
  summaryLabel: {
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  summaryText: {
    flex: 1,
  },
  summaryAddress: {
    fontWeight: '500',
  },
  summaryType: {
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.xs,
  },
  infoCard: {
    backgroundColor: theme.colors.accent + '10',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  infoTitle: {
    fontWeight: '600',
  },
  infoText: {
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
});