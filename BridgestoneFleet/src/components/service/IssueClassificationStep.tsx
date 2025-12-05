import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, TextInput, Chip, SegmentedButtons, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

interface Issue {
  category: string;
  subcategory: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
}

interface IssueClassificationStepProps {
  issue: Issue | null;
  onIssueUpdate: (issue: Issue) => void;
}

const ISSUE_CATEGORIES = {
  'Tire Service': [
    'Flat Tire',
    'Tire Rotation', 
    'Tire Replacement',
    'Tire Pressure Check',
    'Wheel Alignment',
    'Wheel Balancing'
  ],
  'Engine Service': [
    'Oil Change',
    'Engine Diagnostic',
    'Engine Repair',
    'Coolant System',
    'Air Filter',
    'Spark Plugs'
  ],
  'Brake Service': [
    'Brake Inspection',
    'Brake Pad Replacement',
    'Brake Fluid',
    'Brake Rotor Service',
    'Emergency Brake'
  ],
  'Electrical': [
    'Battery Service',
    'Alternator',
    'Starter Motor',
    'Lighting Issues',
    'Fuse Replacement',
    'Wiring Issues'
  ],
  'Body & Paint': [
    'Dent Repair',
    'Scratch Repair',
    'Paint Touch-up',
    'Windshield Repair',
    'Mirror Replacement'
  ],
  'Other': [
    'AC/Heating',
    'Transmission',
    'Suspension',
    'Exhaust System',
    'General Inspection',
    'Custom Request'
  ]
};

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', icon: 'arrow-downward', color: theme.colors.success },
  { value: 'medium', label: 'Medium', icon: 'remove', color: theme.colors.accent },
  { value: 'high', label: 'High', icon: 'arrow-upward', color: theme.colors.error },
  { value: 'urgent', label: 'Urgent', icon: 'priority-high', color: theme.colors.error }
];

export default function IssueClassificationStep({ issue, onIssueUpdate }: IssueClassificationStepProps) {
  const [selectedCategory, setSelectedCategory] = useState(issue?.category || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(issue?.subcategory || '');
  const [priority, setPriority] = useState(issue?.priority || 'medium');
  const [description, setDescription] = useState(issue?.description || '');

  const updateIssue = () => {
    if (selectedCategory && selectedSubcategory && description.trim()) {
      onIssueUpdate({
        category: selectedCategory,
        subcategory: selectedSubcategory,
        priority,
        description: description.trim()
      });
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(''); // Reset subcategory when category changes
    updateIssue();
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setTimeout(updateIssue, 0); // Use timeout to ensure state is updated
  };

  const handlePriorityChange = (newPriority: string) => {
    setPriority(newPriority as Issue['priority']);
    setTimeout(updateIssue, 0);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    setTimeout(updateIssue, 0);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text variant="headlineSmall" style={styles.title}>
        Describe the Issue
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Help us understand what service your vehicle needs
      </Text>

      {/* Category Selection */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Service Category
      </Text>
      <View style={styles.categoryGrid}>
        {Object.keys(ISSUE_CATEGORIES).map(category => (
          <Chip
            key={category}
            selected={selectedCategory === category}
            onPress={() => handleCategorySelect(category)}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.selectedCategoryChip
            ]}
            mode={selectedCategory === category ? 'flat' : 'outlined'}
          >
            {category}
          </Chip>
        ))}
      </View>

      {/* Subcategory Selection */}
      {selectedCategory && (
        <>
          <Divider style={styles.divider} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Specific Service
          </Text>
          <View style={styles.subcategoryGrid}>
            {ISSUE_CATEGORIES[selectedCategory as keyof typeof ISSUE_CATEGORIES].map(subcategory => (
              <Chip
                key={subcategory}
                selected={selectedSubcategory === subcategory}
                onPress={() => handleSubcategorySelect(subcategory)}
                style={[
                  styles.subcategoryChip,
                  selectedSubcategory === subcategory && styles.selectedSubcategoryChip
                ]}
                mode={selectedSubcategory === subcategory ? 'flat' : 'outlined'}
              >
                {subcategory}
              </Chip>
            ))}
          </View>
        </>
      )}

      {/* Priority Selection */}
      {selectedSubcategory && (
        <>
          <Divider style={styles.divider} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Priority Level
          </Text>
          <SegmentedButtons
            value={priority}
            onValueChange={handlePriorityChange}
            buttons={PRIORITY_OPTIONS.map(option => ({
              value: option.value,
              label: option.label,
              icon: option.icon,
              style: priority === option.value ? { backgroundColor: option.color + '20' } : {}
            }))}
            style={styles.priorityButtons}
          />
        </>
      )}

      {/* Description */}
      {selectedSubcategory && (
        <>
          <Divider style={styles.divider} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Additional Details
          </Text>
          <TextInput
            label="Describe the issue or service needed"
            value={description}
            onChangeText={handleDescriptionChange}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.descriptionInput}
            placeholder="Provide any additional details that will help the technician understand the issue..."
          />
        </>
      )}

      {/* Summary */}
      {issue && (
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="labelMedium" style={styles.summaryLabel}>
              Service Request Summary:
            </Text>
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">
                <Text style={styles.summaryKey}>Category:</Text> {issue.category}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">
                <Text style={styles.summaryKey}>Service:</Text> {issue.subcategory}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">
                <Text style={styles.summaryKey}>Priority:</Text> {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
              </Text>
            </View>
            {issue.description && (
              <View style={styles.summaryRow}>
                <Text variant="bodyMedium">
                  <Text style={styles.summaryKey}>Details:</Text> {issue.description}
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>
      )}
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
  sectionTitle: {
    fontWeight: '600',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  divider: {
    marginVertical: theme.spacing.lg,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  categoryChip: {
    marginBottom: theme.spacing.sm,
  },
  selectedCategoryChip: {
    backgroundColor: theme.colors.primaryLight,
  },
  subcategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  subcategoryChip: {
    marginBottom: theme.spacing.sm,
  },
  selectedSubcategoryChip: {
    backgroundColor: theme.colors.secondaryLight,
  },
  priorityButtons: {
    marginBottom: theme.spacing.md,
  },
  descriptionInput: {
    marginBottom: theme.spacing.lg,
  },
  summaryCard: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceVariant,
  },
  summaryLabel: {
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
  },
  summaryRow: {
    marginBottom: theme.spacing.xs,
  },
  summaryKey: {
    fontWeight: '600',
  },
});