# Design System Documentation

## Overview
This document defines the design system, user experience principles, and visual guidelines for the Bridgestone Fleet Management application.

## Brand Identity

### Bridgestone Brand Guidelines
- **Primary Brand Color**: Bridgestone Red (#DC143C)
- **Selection Color**: Action Red (#CA3232)
- **Neutral Color**: Professional Gray (#8B8FA3)
- **Logo Usage**: B-iso.svg for compact spaces, full logo for headers
- **Brand Voice**: Professional, reliable, innovative, safety-focused

### Color Palette
```
Primary Colors:
- Bridgestone Red: #DC143C (backgrounds, headers, primary actions)
- Action Red: #CA3232 (selections, active states, urgent indicators)
- Professional Gray: #8B8FA3 (neutral information, secondary text)

Secondary Colors:
- Success Green: #4CAF50 (completed states, positive indicators)
- Warning Amber: #FF9800 (caution states, pending actions)
- Error Red: #F44336 (error states, critical issues)
- Info Blue: #2196F3 (informational content, links)

Neutral Colors:
- Surface White: #FFFFFF (card backgrounds, modal overlays)
- Background Gray: #F5F5F5 (app background, inactive areas)
- Text Primary: #212121 (main content, headers)
- Text Secondary: #757575 (supporting text, descriptions)
- Divider Gray: #E0E0E0 (separators, borders)
```

## Typography System

### Type Scale
- **Display Large**: 57px - Hero sections, major headings
- **Display Medium**: 45px - Section headers, important announcements
- **Display Small**: 36px - Card headers, feature titles
- **Headline Large**: 32px - Screen titles, primary headings
- **Headline Medium**: 28px - Secondary headings, subsections
- **Headline Small**: 24px - Tertiary headings, card titles
- **Title Large**: 22px - Important labels, form sections
- **Title Medium**: 16px - Standard labels, navigation items
- **Title Small**: 14px - Supporting labels, captions
- **Body Large**: 16px - Primary body text, descriptions
- **Body Medium**: 14px - Secondary body text, details
- **Body Small**: 12px - Fine print, metadata
- **Label Large**: 14px - Button text, action labels
- **Label Medium**: 12px - Form labels, status indicators
- **Label Small**: 11px - Timestamps, secondary metadata

### Font Families
- **Primary**: System fonts (San Francisco on iOS, Roboto on Android)
- **Fallback**: Segoe UI, Helvetica Neue, Arial, sans-serif
- **Monospace**: SF Mono, Consolas, Monaco (for codes, technical data)

## Spacing System

### Base Unit: 4px
All spacing values are multiples of 4px for consistent rhythm and alignment.

```
Spacing Scale:
- xs: 4px - Tight spacing, small gaps
- sm: 8px - Close spacing, related elements
- md: 16px - Standard spacing, general layout
- lg: 24px - Loose spacing, section separation
- xl: 32px - Wide spacing, major section breaks
- xxl: 48px - Extra wide, page-level spacing
```

### Layout Grid
- **Mobile**: 16px margins, 8px gutters
- **Tablet**: 24px margins, 16px gutters
- **Desktop**: 32px margins, 24px gutters

## Component Design Patterns

### Cards
- **Elevation**: 2dp for standard cards, 4dp for selected/active
- **Corner Radius**: 12px for consistency with Material Design 3
- **Padding**: 16px internal padding, 8px between elements
- **Borders**: None (use elevation), 1px solid #E0E0E0 for outlined variants

### Buttons
- **Primary**: Bridgestone Red background, white text
- **Secondary**: Outlined with Bridgestone Red border
- **Tertiary**: Text-only with Bridgestone Red color
- **Height**: 48px for touch targets, 40px for compact areas
- **Corner Radius**: 24px (pill shape) for primary, 8px for secondary

### Input Fields
- **Outlined**: Material Design 3 outlined style
- **Filled**: Subtle background with bottom border
- **Height**: 56px for standard inputs, 40px for compact
- **Focus State**: Bridgestone Red outline, 2px width
- **Error State**: Error Red outline with descriptive text

### Navigation
- **Tab Bar**: Bottom navigation with icons and labels
- **Top Navigation**: Custom header with logo and actions
- **Drawer Navigation**: Slide-out menu for secondary navigation
- **Stack Navigation**: Standard push/pop transitions

## Iconography

### Icon Style
- **Style**: Material Design Icons (outlined style)
- **Size**: 24px standard, 20px compact, 32px prominent
- **Color**: Inherit from text color or use theme colors
- **Stroke Width**: 2px for outlined icons

### Custom Icons
- **Fleet Icons**: Vehicle types, service categories
- **Status Icons**: Progress indicators, completion states
- **Action Icons**: Common user actions, navigation elements

## Animation & Transitions

### Motion Principles
- **Duration**: 200ms for micro-interactions, 300ms for screen transitions
- **Easing**: Cubic bezier (0.4, 0.0, 0.2, 1.0) for natural feel
- **Purpose**: Provide feedback, guide attention, smooth transitions

### Transition Types
- **Fade**: Modal appearances, content loading
- **Slide**: Screen navigation, drawer opening
- **Scale**: Button press feedback, selection states
- **Rotation**: Loading indicators, refresh actions

## Accessibility Guidelines

### Color Accessibility
- **Contrast Ratio**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Color Independence**: Never rely solely on color for information
- **Dark Mode**: Full support with appropriate color inversions

### Touch Accessibility
- **Target Size**: Minimum 44px touch targets
- **Spacing**: Adequate space between interactive elements
- **Feedback**: Clear visual and haptic feedback for interactions

### Screen Reader Support
- **Labels**: Descriptive labels for all interactive elements
- **Headings**: Proper heading hierarchy for navigation
- **Live Regions**: Dynamic content updates announced appropriately

## User Experience Patterns

### Progressive Disclosure
- **Wizards**: Multi-step processes with clear progress indication
- **Expandable Sections**: Hide complexity, reveal on demand
- **Contextual Actions**: Show relevant actions based on state

### Error Handling
- **Inline Validation**: Real-time feedback during form input
- **Error Messages**: Clear, actionable error descriptions
- **Recovery**: Easy paths to resolve errors and continue

### Loading States
- **Skeletons**: Content placeholders during loading
- **Progress Indicators**: Clear progress for long operations
- **Optimistic Updates**: Immediate feedback with rollback capability

## Mobile-Specific Considerations

### Platform Conventions
- **iOS**: Follow iOS Human Interface Guidelines
- **Android**: Adhere to Material Design principles
- **Cross-Platform**: Maintain brand consistency across platforms

### Gesture Support
- **Swipe Actions**: Intuitive swipe gestures for common actions
- **Pull to Refresh**: Standard refresh pattern for lists
- **Long Press**: Context menus and quick actions

### Responsive Design
- **Breakpoints**: Mobile-first with tablet and desktop considerations
- **Flexible Layouts**: Adapt to various screen sizes gracefully
- **Orientation**: Support both portrait and landscape modes

## Design Tokens

### Implementation
All design values are defined as tokens for consistency and maintainability:

```javascript
// Color Tokens
export const colors = {
  primary: '#DC143C',
  selection: '#CA3232',
  neutral: '#8B8FA3',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3'
};

// Spacing Tokens
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

// Typography Tokens
export const typography = {
  displayLarge: { fontSize: 57, fontWeight: '400', lineHeight: 64 },
  headlineLarge: { fontSize: 32, fontWeight: '400', lineHeight: 40 },
  bodyLarge: { fontSize: 16, fontWeight: '400', lineHeight: 24 }
};
```

## Component Library

### Core Components
- **BridgestoneButton**: Branded button with variants
- **BridgestoneCard**: Consistent card styling
- **BridgestoneInput**: Standardized input fields
- **BridgestoneHeader**: Custom navigation header
- **StatusChip**: Color-coded status indicators

### Composite Components
- **ServiceRequestWizard**: Multi-step form component
- **FleetHealthCard**: Dashboard analytics display
- **VehicleListItem**: Standardized vehicle representation
- **InvoiceCard**: Billing information display

## Quality Assurance

### Design Reviews
- **Consistency**: Verify adherence to design system
- **Accessibility**: Test with screen readers and color tools
- **Usability**: Validate user flows and interactions
- **Brand Compliance**: Ensure proper brand representation

### Testing Guidelines
- **Visual Regression**: Automated screenshot comparison
- **Interaction Testing**: Verify all interactive elements
- **Cross-Platform**: Test on various devices and screen sizes
- **Performance**: Ensure smooth animations and transitions

## Evolution & Maintenance

### Design System Updates
- **Version Control**: Track design system changes
- **Documentation**: Keep documentation current with implementation
- **Migration Guides**: Provide clear upgrade paths
- **Deprecation**: Graceful handling of outdated patterns

### Feedback Integration
- **User Testing**: Regular usability testing sessions
- **Analytics**: Monitor usage patterns and pain points
- **Stakeholder Input**: Regular design reviews with business teams
- **Developer Feedback**: Incorporate implementation insights