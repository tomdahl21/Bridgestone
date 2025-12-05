import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, FAB, IconButton, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

interface PhotoCaptureStepProps {
  photos: string[];
  onPhotosUpdate: (photos: string[]) => void;
}

// Mock photo URLs for demo
const MOCK_PHOTOS = [
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
  'https://images.unsplash.com/photo-1486326658981-ed68abe5868e?w=400',
  'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400',
];

export default function PhotoCaptureStep({ photos, onPhotosUpdate }: PhotoCaptureStepProps) {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleTakePhoto = () => {
    setIsCapturing(true);
    // Simulate camera capture delay
    setTimeout(() => {
      const newPhoto = MOCK_PHOTOS[photos.length % MOCK_PHOTOS.length];
      onPhotosUpdate([...photos, newPhoto]);
      setIsCapturing(false);
    }, 1500);
  };

  const handleSelectFromGallery = () => {
    // Simulate gallery selection
    Alert.alert(
      'Select Photo',
      'Choose a photo from your gallery',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Select',
          onPress: () => {
            const newPhoto = MOCK_PHOTOS[(photos.length + 1) % MOCK_PHOTOS.length];
            onPhotosUpdate([...photos, newPhoto]);
          }
        }
      ]
    );
  };

  const handleDeletePhoto = (index: number) => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to remove this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const newPhotos = photos.filter((_, i) => i !== index);
            onPhotosUpdate(newPhotos);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Add Photos
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Capture images to help the technician understand the issue
      </Text>

      {/* Photo Guidelines */}
      <Card style={styles.guidelinesCard}>
        <Card.Content>
          <View style={styles.guidelinesHeader}>
            <MaterialIcons name="photo-camera" size={24} color={theme.colors.primary} />
            <Text variant="titleMedium" style={styles.guidelinesTitle}>
              Photo Guidelines
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.guidelinesText}>
            • Take clear, well-lit photos of the issue{"\n"}
            • Include multiple angles if helpful{"\n"}
            • Capture any damage, wear, or problem areas{"\n"}
            • Photos are optional but recommended
          </Text>
        </Card.Content>
      </Card>

      {/* Photo Actions */}
      <View style={styles.actionsRow}>
        <Button
          mode="contained"
          icon="camera"
          onPress={handleTakePhoto}
          style={styles.actionButton}
          loading={isCapturing}
          disabled={isCapturing}
        >
          {isCapturing ? 'Capturing...' : 'Take Photo'}
        </Button>
        <Button
          mode="outlined"
          icon="photo-library"
          onPress={handleSelectFromGallery}
          style={styles.actionButton}
        >
          From Gallery
        </Button>
      </View>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <>
          <View style={styles.photoHeader}>
            <Text variant="titleMedium" style={styles.photoTitle}>
              Attached Photos
            </Text>
            <Chip icon="photo" mode="outlined">
              {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </Chip>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.photoScroll}
          >
            <View style={styles.photoGrid}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Image source={{ uri: photo }} style={styles.photo} />
                  <IconButton
                    icon="close-circle"
                    size={24}
                    iconColor={theme.colors.error}
                    containerColor={theme.colors.surface}
                    style={styles.deleteButton}
                    onPress={() => handleDeletePhoto(index)}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}

      {/* Empty State */}
      {photos.length === 0 && (
        <Card style={styles.emptyState}>
          <Card.Content>
            <View style={styles.emptyContent}>
              <MaterialIcons 
                name="add-photo-alternate" 
                size={64} 
                color={theme.colors.onSurfaceVariant} 
              />
              <Text variant="titleMedium" style={styles.emptyTitle}>
                No Photos Added
              </Text>
              <Text variant="bodyMedium" style={styles.emptyText}>
                Photos help technicians prepare for your service request
              </Text>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Tips Card */}
      <Card style={styles.tipsCard}>
        <Card.Content>
          <View style={styles.tipsHeader}>
            <MaterialIcons name="lightbulb" size={20} color={theme.colors.accent} />
            <Text variant="titleSmall" style={styles.tipsTitle}>
              Photo Tips
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.tipsText}>
            Good photos can speed up diagnosis and ensure the technician brings the right tools and parts.
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
  guidelinesCard: {
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.primaryLight + '20',
  },
  guidelinesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  guidelinesTitle: {
    fontWeight: '600',
  },
  guidelinesText: {
    lineHeight: 20,
    color: theme.colors.onSurfaceVariant,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  photoTitle: {
    fontWeight: '600',
  },
  photoScroll: {
    marginBottom: theme.spacing.lg,
  },
  photoGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
  },
  photoContainer: {
    position: 'relative',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: theme.spacing.sm,
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    elevation: 4,
  },
  emptyState: {
    marginBottom: theme.spacing.lg,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  emptyTitle: {
    fontWeight: '600',
  },
  emptyText: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  tipsCard: {
    backgroundColor: theme.colors.accent + '10',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  tipsTitle: {
    fontWeight: '600',
  },
  tipsText: {
    color: theme.colors.onSurfaceVariant,
    lineHeight: 18,
  },
});