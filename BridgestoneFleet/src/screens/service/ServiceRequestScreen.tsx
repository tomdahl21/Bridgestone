import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, ProgressBar, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import VehicleSelectionStep from '../../components/service/VehicleSelectionStep';
import IssueClassificationStep from '../../components/service/IssueClassificationStep';
import LocationStep from '../../components/service/LocationStep';
import PhotoCaptureStep from '../../components/service/PhotoCaptureStep';
import ReviewStep from '../../components/service/ReviewStep';

export type ServiceRequestStep = 'vehicle' | 'issue' | 'location' | 'photos' | 'review';

export interface ServiceRequestData {
  vehicle: {
    id: string;
    vin: string;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    mileage: number;
    status: 'active' | 'maintenance' | 'inactive';
    location: string;
  } | null;
  issue: {
    category: string;
    subcategory: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    description: string;
  } | null;
  location: {
    type: 'current' | 'custom';
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  } | null;
  photos: string[];
  preferredDate?: Date;
  notes?: string;
}

const STEPS: { key: ServiceRequestStep; title: string; icon: string; emoji: string }[] = [
  { key: 'vehicle', title: 'Vehicle', icon: 'directions-car', emoji: '🚗' },
  { key: 'issue', title: 'Issue', icon: 'build', emoji: '🔧' },
  { key: 'location', title: 'Location', icon: 'place', emoji: '📍' },
  { key: 'photos', title: 'Photos', icon: 'camera-alt', emoji: '📸' },
  { key: 'review', title: 'Review', icon: 'check-circle', emoji: '✅' },
];

export default function ServiceRequestScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState<ServiceRequestStep>('vehicle');
  const [serviceData, setServiceData] = useState<ServiceRequestData>({
    vehicle: null,
    issue: null,
    location: null,
    photos: [],
  });

  const currentStepIndex = STEPS.findIndex(step => step.key === currentStep);
  const progress = (currentStepIndex + 1) / STEPS.length;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].key);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].key);
    }
  };

  const handleStepSelect = (step: ServiceRequestStep) => {
    setCurrentStep(step);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const updateServiceData = (updates: Partial<ServiceRequestData>) => {
    setServiceData(prev => ({ ...prev, ...updates }));
  };

  const isStepComplete = (step: ServiceRequestStep): boolean => {
    switch (step) {
      case 'vehicle':
        return serviceData.vehicle !== null;
      case 'issue':
        return serviceData.issue !== null;
      case 'location':
        return serviceData.location !== null;
      case 'photos':
        return true; // Photos are optional
      case 'review':
        return true;
      default:
        return false;
    }
  };

  const canProceed = isStepComplete(currentStep);

  const renderStepContent = () => {
    switch (currentStep) {
      case 'vehicle':
        return (
          <VehicleSelectionStep
            selectedVehicle={serviceData.vehicle}
            onVehicleSelect={(vehicle) => updateServiceData({ vehicle })}
          />
        );
      case 'issue':
        return (
          <IssueClassificationStep
            issue={serviceData.issue}
            onIssueUpdate={(issue) => updateServiceData({ issue })}
          />
        );
      case 'location':
        return (
          <LocationStep
            location={serviceData.location}
            onLocationUpdate={(location) => updateServiceData({ location })}
          />
        );
      case 'photos':
        return (
          <PhotoCaptureStep
            photos={serviceData.photos}
            onPhotosUpdate={(photos) => updateServiceData({ photos })}
          />
        );
      case 'review':
        return (
          <ReviewStep
            serviceData={serviceData}
            onDataUpdate={updateServiceData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Progress */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.headerContent}>
            <Text variant="titleLarge" style={styles.headerTitle}>
              New Service Request
            </Text>
          </View>
          
          <ProgressBar 
            progress={progress}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
          
          <Text variant="bodySmall" style={styles.progressText}>
            Step {currentStepIndex + 1} of {STEPS.length}: {STEPS[currentStepIndex].title}
          </Text>
        </Card.Content>
      </Card>

      {/* Step Navigator */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stepNavigator}>
        <View style={styles.stepsContainer}>
          {STEPS.map((step, index) => (
            <View key={step.key} style={styles.stepContainer}>
              <Button
                mode={currentStep === step.key ? 'contained' : 'outlined'}
                compact
                onPress={() => handleStepSelect(step.key)}
                style={[
                  styles.stepButton,
                  isStepComplete(step.key) && currentStep !== step.key && styles.completedStep
                ]}
                labelStyle={styles.stepButtonLabel}
                contentStyle={styles.stepButtonContent}
                disabled={index > currentStepIndex + 1}
              >
                {step.emoji} {step.title}
              </Button>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      {/* Bottom Navigation */}
      <Card style={styles.bottomCard}>
        <Card.Content>
          <View style={styles.bottomActions}>
            <Button
              mode="outlined"
              onPress={handlePrevious}
              disabled={currentStepIndex === 0}
              style={styles.actionButton}
            >
              Previous
            </Button>
            
            {currentStep === 'review' ? (
              <Button
                mode="contained"
                onPress={() => {
                  // Handle service request submission
                  console.log('Submitting service request:', serviceData);
                  navigation.goBack();
                }}
                disabled={!canProceed}
                style={styles.actionButton}
              >
                Submit Request
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={handleNext}
                disabled={!canProceed}
                style={styles.actionButton}
              >
                Next
              </Button>
            )}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerCard: {
    margin: 0,
    borderRadius: 0,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    position: 'relative',
  },
  headerTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: theme.spacing.sm,
  },
  progressText: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
  },
  stepNavigator: {
    maxHeight: 60,
    backgroundColor: theme.colors.surface,
  },
  stepsContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  stepContainer: {
    marginRight: theme.spacing.xs,
  },
  stepButton: {
    minWidth: 85,
    paddingHorizontal: theme.spacing.xs,
    borderRadius: theme.spacing.md,
  },
  stepButtonContent: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
  },
  stepButtonLabel: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginHorizontal: 0,
    marginVertical: 0,
  },
  completedStep: {
    backgroundColor: theme.colors.surfaceVariant,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  bottomCard: {
    margin: 0,
    borderRadius: 0,
    elevation: 8,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});