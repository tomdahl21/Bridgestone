import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, TextInput, Chip, Divider, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { ServiceRequestData } from '../../screens/service/ServiceRequestScreen';

interface ReviewStepProps {
  serviceData: ServiceRequestData;
  onDataUpdate: (updates: Partial<ServiceRequestData>) => void;
}

export default function ReviewStep({ serviceData, onDataUpdate }: ReviewStepProps) {
  const [additionalNotes, setAdditionalNotes] = useState(serviceData.notes || '');
  const [preferredDate, setPreferredDate] = useState('');

  const handleNotesChange = (notes: string) => {
    setAdditionalNotes(notes);
    onDataUpdate({ notes });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return theme.colors.error;
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.accent;
      case 'low': return theme.colors.success;
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'priority-high';
      case 'high': return 'arrow-upward';
      case 'medium': return 'remove';
      case 'low': return 'arrow-downward';
      default: return 'help';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text variant="headlineSmall" style={styles.title}>
        Review Request
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Please review your service request details before submitting
      </Text>

      {/* Vehicle Information */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="directions-car" size={24} color={theme.colors.primary} />
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Vehicle Information
            </Text>
          </View>
          
          {serviceData.vehicle ? (
            <View style={styles.vehicleInfo}>
              <Text variant="titleLarge" style={styles.vehicleName}>
                {serviceData.vehicle.year} {serviceData.vehicle.make} {serviceData.vehicle.model}
              </Text>
              <View style={styles.vehicleDetails}>
                <View style={styles.detailRow}>
                  <MaterialIcons name="confirmation-number" size={16} color={theme.colors.onSurfaceVariant} />
                  <Text variant="bodySmall" style={styles.detailText}>
                    {serviceData.vehicle.licensePlate}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="fingerprint" size={16} color={theme.colors.onSurfaceVariant} />
                  <Text variant="bodySmall" style={styles.detailText}>
                    VIN: {serviceData.vehicle.vin}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <Text variant="bodyMedium" style={styles.missingInfo}>
              No vehicle selected
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Service Details */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="build" size={24} color={theme.colors.primary} />
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Service Details
            </Text>
          </View>
          
          {serviceData.issue ? (
            <View style={styles.serviceInfo}>
              <View style={styles.serviceRow}>
                <Text variant="labelMedium" style={styles.label}>Category:</Text>
                <Chip mode="outlined" style={styles.chip}>
                  {serviceData.issue.category}
                </Chip>
              </View>
              
              <View style={styles.serviceRow}>
                <Text variant="labelMedium" style={styles.label}>Service:</Text>
                <Chip mode="outlined" style={styles.chip}>
                  {serviceData.issue.subcategory}
                </Chip>
              </View>
              
              <View style={styles.serviceRow}>
                <Text variant="labelMedium" style={styles.label}>Priority:</Text>
                <Chip 
                  mode="flat" 
                  icon={getPriorityIcon(serviceData.issue.priority)}
                  style={[styles.chip, { backgroundColor: getPriorityColor(serviceData.issue.priority) + '20' }]}
                >
                  {serviceData.issue.priority.charAt(0).toUpperCase() + serviceData.issue.priority.slice(1)}
                </Chip>
              </View>
              
              {serviceData.issue.description && (
                <View style={styles.descriptionSection}>
                  <Text variant="labelMedium" style={styles.label}>Description:</Text>
                  <Text variant="bodyMedium" style={styles.description}>
                    {serviceData.issue.description}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <Text variant="bodyMedium" style={styles.missingInfo}>
              No service details provided
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Location */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="place" size={24} color={theme.colors.primary} />
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Service Location
            </Text>
          </View>
          
          {serviceData.location ? (
            <View style={styles.locationInfo}>
              <View style={styles.locationRow}>
                <MaterialIcons 
                  name={serviceData.location.type === 'current' ? 'my-location' : 'edit-location'} 
                  size={20} 
                  color={theme.colors.primary} 
                />
                <View style={styles.locationDetails}>
                  <Text variant="bodyMedium" style={styles.address}>
                    {serviceData.location.address}
                  </Text>
                  <Text variant="bodySmall" style={styles.locationType}>
                    {serviceData.location.type === 'current' ? 'Current Location' : 'Custom Address'}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <Text variant="bodyMedium" style={styles.missingInfo}>
              No location specified
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Photos */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="photo-camera" size={24} color={theme.colors.primary} />
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Attached Photos
            </Text>
            <Chip icon="photo" mode="outlined">
              {serviceData.photos.length}
            </Chip>
          </View>
          
          {serviceData.photos.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.photosGrid}>
                {serviceData.photos.map((photo, index) => (
                  <Image key={index} source={{ uri: photo }} style={styles.photoThumbnail} />
                ))}
              </View>
            </ScrollView>
          ) : (
            <Text variant="bodyMedium" style={styles.missingInfo}>
              No photos attached
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Additional Notes */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="note" size={24} color={theme.colors.primary} />
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Additional Notes
            </Text>
          </View>
          
          <TextInput
            label="Special instructions or additional details"
            value={additionalNotes}
            onChangeText={handleNotesChange}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.notesInput}
            placeholder="Any special instructions for the technician..."
          />
        </Card.Content>
      </Card>

      {/* Submission Summary */}
      <Card style={styles.summaryCard}>
        <Card.Content>
          <View style={styles.summaryHeader}>
            <MaterialIcons name="check-circle" size={24} color={theme.colors.success} />
            <Text variant="titleMedium" style={styles.summaryTitle}>
              Ready to Submit
            </Text>
          </View>
          
          <Text variant="bodyMedium" style={styles.summaryText}>
            Your service request will be sent to the nearest Bridgestone service center. 
            You'll receive a confirmation email and the technician will contact you to schedule the service.
          </Text>
          
          <Divider style={styles.divider} />
          
          <View style={styles.expectationsList}>
            <View style={styles.expectationRow}>
              <MaterialIcons name="schedule" size={16} color={theme.colors.primary} />
              <Text variant="bodySmall" style={styles.expectationText}>
                Response within 2 hours
              </Text>
            </View>
            <View style={styles.expectationRow}>
              <MaterialIcons name="phone" size={16} color={theme.colors.primary} />
              <Text variant="bodySmall" style={styles.expectationText}>
                Technician will call to confirm
              </Text>
            </View>
            <View style={styles.expectationRow}>
              <MaterialIcons name="star" size={16} color={theme.colors.primary} />
              <Text variant="bodySmall" style={styles.expectationText}>
                Professional certified service
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
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
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontWeight: '600',
    flex: 1,
  },
  vehicleInfo: {
    gap: theme.spacing.sm,
  },
  vehicleName: {
    fontWeight: '600',
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
  serviceInfo: {
    gap: theme.spacing.md,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  label: {
    minWidth: 80,
    fontWeight: '600',
  },
  chip: {
    flex: 1,
  },
  descriptionSection: {
    gap: theme.spacing.sm,
  },
  description: {
    fontStyle: 'italic',
    color: theme.colors.onSurfaceVariant,
  },
  locationInfo: {
    gap: theme.spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  locationDetails: {
    flex: 1,
  },
  address: {
    fontWeight: '500',
  },
  locationType: {
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.xs,
  },
  photosGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  photoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: theme.spacing.sm,
  },
  notesInput: {
    marginTop: theme.spacing.sm,
  },
  missingInfo: {
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  summaryCard: {
    backgroundColor: theme.colors.success + '10',
    marginBottom: theme.spacing.xl,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  summaryTitle: {
    fontWeight: '600',
    color: theme.colors.success,
  },
  summaryText: {
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  divider: {
    marginBottom: theme.spacing.md,
  },
  expectationsList: {
    gap: theme.spacing.sm,
  },
  expectationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  expectationText: {
    color: theme.colors.onSurfaceVariant,
  },
});