# Bridgestone Fleet Management App

A comprehensive React Native fleet management application built with Expo SDK 50, designed for Bridgestone service centers to manage vehicle maintenance, service requests, and fleet operations.

## 📱 Features

### ✅ Completed Features
- **Authentication System** - Biometric authentication with TouchID/FaceID support
- **Fleet Dashboard** - Real-time fleet health overview with analytics
- **Service Request Wizard** - 5-step progressive service request flow with emoji indicators
- **Billing & Invoice Management** - Comprehensive invoice tracking and approval workflows
- **Navigation System** - Custom header with Bridgestone branding and persistent navigation
- **Design System** - Material Design 3 with Bridgestone brand colors

### 🚧 In Development
- Real-time service tracking with map integration
- Fleet management features with vehicle details
- Offline capability with sync management
- Advanced security implementations

## 🛠 Tech Stack

- **React Native** 0.73+ with Expo SDK 50
- **TypeScript** with ESLint and Prettier
- **React Navigation 6** for navigation management
- **React Native Paper** with Material Design 3
- **Redux Toolkit** with RTK Query for state management
- **React Native SVG** for custom logo integration

## 🎨 Design System

The app follows Bridgestone's brand guidelines with:
- **Primary Color**: Bridgestone Red (#DC143C)
- **Selection Color**: #CA3232
- **Neutral Color**: #8B8FA3
- **Material Design 3** component system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tomdahl21/Bridgestone.git
cd Bridgestone
```

2. Install dependencies for the main app:
```bash
cd BridgestoneFleet
npm install
```

3. Install dependencies for the mock API:
```bash
cd ../mock-api
npm install
```

### Running the App

1. Start the mock API server:
```bash
cd mock-api
npm start
```

2. Start the Expo development server:
```bash
cd ../BridgestoneFleet
npm start
```

3. Use Expo Go app or simulator to run the application

## 📁 Project Structure

```
Bridgestone/
├── BridgestoneFleet/          # Main React Native app
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── navigation/        # Navigation configuration
│   │   ├── screens/          # App screens
│   │   ├── store/            # Redux store and slices
│   │   ├── theme/            # Design system and theming
│   │   └── assets/           # Images, fonts, and SVG assets
│   └── app.config.js         # Expo configuration
├── mock-api/                 # JSON Server mock API
└── README.md
```

## 🔧 Key Components

### Service Request Flow
- **Vehicle Selection** 🚗 - VIN scanning and vehicle identification
- **Issue Classification** 🔧 - Service category and priority selection
- **Location Services** 📍 - GPS location and address confirmation
- **Photo Capture** 📸 - Evidence collection with camera integration
- **Review & Submit** ✅ - Final review and service request submission

### Dashboard Analytics
- Fleet health metrics with real-time updates
- Active service requests carousel
- Quick action buttons for common tasks
- Cost summaries and billing insights

## 🎯 Roadmap

- [ ] Real-time GPS tracking integration
- [ ] Push notifications for service updates
- [ ] Offline mode with data synchronization
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] Integration with Bridgestone service APIs

## 📄 License

This project is proprietary software developed for Bridgestone Corporation.

## 👥 Contributing

This is a private repository. For contribution guidelines, please contact the development team.

---

Built with ❤️ for Bridgestone Fleet Management Management Application
## Enterprise Fleet Service Management Platform

---

## 🚀 **Current Project Status: Foundation Complete**

### **✅ Phase 1 Completed - Production Ready Foundation**
- **React Native + Expo**: Cross-platform mobile app with web compatibility
- **Official Bridgestone Branding**: Aligned with corporate brand guidelines (#C8102E primary, clean white layouts)
- **Authentication Flow**: Professional login with biometric simulation
- **Enhanced Dashboard**: Fleet health metrics, service requests, cost analytics
- **Material Design 3**: Consistent UI components with Bridgestone theming
- **Redux State Management**: Scalable architecture with proper data flow
- **Mock API Server**: Realistic test data (10 users, 5 fleets, 50 vehicles, 30 service requests)

### **🎯 Ready for Stakeholder Demo**
- **Web Version**: http://localhost:8081 (instant browser demo)
- **Professional UI**: Corporate-grade interface matching Bridgestone standards
- **Interactive Features**: Working navigation, mock authentication, real-time data
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing

---

## 🏗️ **High-Level Architecture Considerations**

### **Enterprise Integration Points**
```
┌─────────────────────────────────────────────────┐
│                Mobile App Layer                  │
├─────────────────────────────────────────────────┤
│  • React Native + TypeScript                   │
│  • Material Design 3 Components                │
│  • Redux Toolkit State Management              │
│  • Offline-First Architecture                  │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              API Gateway Layer                   │
├─────────────────────────────────────────────────┤
│  • REST/GraphQL APIs                           │
│  • Authentication & Authorization              │
│  • Rate Limiting & Throttling                 │
│  • Request/Response Transformation             │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│            Backend Services Layer                │
├─────────────────────────────────────────────────┤
│  • Fleet Management Service                    │
│  • Service Request Orchestration               │
│  • Billing & Invoice Processing                │
│  • Real-time Tracking & Notifications          │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│          Enterprise Systems Integration          │
├─────────────────────────────────────────────────┤
│  • ERP Systems (SAP, Oracle)                  │
│  • CRM Integration (Salesforce)               │
│  • Fleet Telematics (Geotab, Samsara)         │
│  • Payment Processing (Stripe, PayPal)        │
└─────────────────────────────────────────────────┘
```

### **Security & Compliance Framework**
- **Data Encryption**: AES-256 for data at rest, TLS 1.3 for data in transit
- **Authentication**: OAuth 2.0/OIDC with MFA and biometric integration
- **API Security**: JWT tokens, rate limiting, certificate pinning
- **Privacy Compliance**: GDPR/CCPA data handling, audit trails
- **Enterprise SSO**: Integration with Active Directory/LDAP systems

### **Scalability Considerations**
- **Multi-Tenant Architecture**: Isolated fleet data with shared infrastructure
- **Microservices Design**: Independent scaling of service components
- **CDN Integration**: Global asset delivery and edge caching
- **Database Sharding**: Horizontal scaling for fleet data partitioning
- **Event-Driven Architecture**: Async processing for service workflows

### **Technology Stack Decisions**
```typescript
// Production Architecture Stack
Frontend: React Native 0.73+ (iOS/Android/Web)
State Management: Redux Toolkit + RTK Query
Navigation: React Navigation 6
UI Framework: React Native Paper (Material Design 3)
Authentication: Expo Auth Session + Keychain
Storage: Redux Persist + SQLite (offline)
Testing: Jest + React Native Testing Library
CI/CD: GitHub Actions + CodePush
Monitoring: Sentry + Analytics
```

---

## 📋 **Next Development Priorities**

### **Immediate Next Steps (Phase 2)**
1. **Service Request Wizard**: Multi-step tire issue reporting with photo capture
2. **Fleet Management**: Vehicle listing, details, and maintenance scheduling
3. **Real-Time Tracking**: Live service status with technician communication
4. **API Integration**: Connect to actual Bridgestone fleet management systems

### **Production Readiness Checklist**
- [ ] **API Security**: Implement OAuth 2.0 + certificate pinning
- [ ] **Error Handling**: Global error boundaries and user feedback
- [ ] **Performance**: Code splitting, image optimization, bundle analysis
- [ ] **Testing**: Unit tests (80%+ coverage), E2E testing suite
- [ ] **Deployment**: App Store/Play Store submission process
- [ ] **Analytics**: User behavior tracking and crash reporting

---

## 🎯 **Business Value Propositions**

### Business Objectives
- **Digital Transformation**: Modernize fleet service request workflows for enterprise customers
- **Operational Efficiency**: Reduce service scheduling friction and administrative overhead
- **Customer Experience**: Provide fleet managers with real-time visibility into service operations
- **Revenue Enhancement**: Streamline billing and increase service capture rates

### Target Audience
- Fleet managers at enterprise customers (e.g., Amazon, FedEx, UPS)
- Vehicle operators requiring immediate service authorization
- Fleet maintenance coordinators managing multiple service events
- Corporate procurement teams handling consolidated billing

---

## Technical Architecture

### Technology Stack

#### Frontend Framework
- **React Native 0.73+**: Cross-platform mobile development
- **TypeScript**: Type-safe development and improved maintainability
- **React Navigation 6**: Native navigation patterns
- **React Native Paper**: Material Design component library

#### State Management
- **Redux Toolkit**: Centralized state management
- **RTK Query**: API caching and synchronization
- **Redux Persist**: Offline state persistence

#### Backend Integration (Simulated for POC)
- **JSON Server**: Mock REST API endpoints
- **Faker.js**: Realistic test data generation
- **AsyncStorage**: Local data persistence

#### Development Tools
- **Expo SDK 50**: Simplified development workflow
- **ESLint & Prettier**: Code quality enforcement
- **Jest & React Native Testing Library**: Unit and integration testing

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Mobile Application                      │
├─────────────────────────────────────────────────────────┤
│                  React Native + TypeScript                │
├──────────────┬────────────────────┬────────────────────┤
│   UI Layer   │   Business Logic   │   Data Layer       │
│              │                    │                    │
│  Components  │   Redux Store      │   API Services    │
│  Screens     │   Actions/Reducers │   Local Storage   │
│  Navigation  │   Middleware       │   Cache Manager   │
└──────────────┴────────────────────┴────────────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │     Mock API Server          │
            │   (JSON Server for POC)      │
            └──────────────────────────────┘
```

---

## Core Features & User Flows

### 1. Authentication & Fleet Selection

#### User Story
As a fleet manager, I need to securely access my company's fleet management portal and select the appropriate cost center for service requests.

#### Technical Implementation
- **Biometric Authentication**: TouchID/FaceID integration
- **Multi-Fleet Support**: Account switching for managers overseeing multiple fleets
- **Role-Based Access**: Driver vs. Manager permission levels
- **Session Management**: Secure token storage and refresh

#### Flow Diagram
```
Login → Biometric Auth → Fleet Selection → Dashboard
         ↓ (fail)          ↓ (multiple)
      PIN Entry        Fleet Picker
```

### 2. Service Request Creation

#### User Story
As a driver experiencing tire issues, I need to quickly request service for my vehicle with minimal data entry.

#### Technical Implementation
- **Vehicle Identification**: VIN scanner via camera or manual entry
- **Location Services**: Automatic capture of vehicle GPS coordinates
- **Issue Classification**: Intelligent tire problem categorization
- **Photo Documentation**: Multi-image capture for damage assessment
- **Priority Assignment**: Urgency level based on issue type and fleet SLA

#### Data Model
```typescript
interface ServiceRequest {
  id: string;
  fleetId: string;
  vehicleId: string;
  vehicleVIN: string;
  location: GeoCoordinates;
  issueType: TireIssueType;
  priority: 'urgent' | 'standard' | 'scheduled';
  photos: Photo[];
  requestorId: string;
  createdAt: Date;
  estimatedServiceTime: Date;
  status: RequestStatus;
}
```

### 3. Real-Time Service Tracking

#### User Story
As a fleet coordinator, I need visibility into all active service requests and their current status.

#### Technical Implementation
- **Live Status Updates**: WebSocket connection for real-time updates
- **Technician ETA**: Integration with dispatch system
- **Service Progress**: Stage-based workflow visualization
- **Push Notifications**: Status change alerts
- **Service History**: Complete audit trail per vehicle

#### Status Workflow
```
Submitted → Approved → Dispatched → In Progress → Completed → Invoiced
    ↓          ↓           ↓            ↓             ↓
 Rejected   On Hold    Rescheduled   Paused      Under Review
```

### 4. Corporate Billing Integration

#### User Story
As a procurement manager, I need to review and approve service invoices before they're processed through our corporate billing system.

#### Technical Implementation
- **Invoice Preview**: Detailed line-item breakdown
- **Approval Workflow**: Multi-level authorization chains
- **PO Integration**: Purchase order number association
- **Cost Center Allocation**: Automatic routing based on vehicle assignment
- **Export Capabilities**: PDF and CSV invoice downloads

---

## User Interface Design

### Design System Alignment

#### Bridgestone Brand Colors
- **Primary Red**: #C8102E (Actions, CTAs)
- **Carbon Black**: #1C1C1C (Primary text)
- **Tech Grey**: #53565A (Secondary elements)
- **Alert Orange**: #FF6900 (Warnings, urgent states)
- **Success Green**: #00A651 (Confirmations)
- **Background Grey**: #F5F5F5 (Screen backgrounds)

#### Typography
- **Headings**: Bridgestone Gothic Bold
- **Body Text**: SF Pro Text (iOS) / Roboto (Android)
- **Data Labels**: Inter Medium

### Key Screen Designs

#### Dashboard Screen
- Fleet health overview widget
- Active service requests carousel
- Quick action buttons (Request Service, View Fleet, Reports)
- Recent activity feed
- Cost summary for current period

#### Service Request Screen
- Step-by-step wizard interface
- Progressive disclosure of options
- Smart defaults based on vehicle history
- Visual tire position selector
- Integrated camera for documentation

#### Tracking Screen
- Map view with service location
- Timeline visualization of service stages
- Technician contact information
- Estimated completion time
- Live status indicator

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- Environment setup and configuration
- Authentication flow implementation
- Core navigation structure
- Mock API server setup
- Basic UI component library

### Phase 2: Core Features (Weeks 3-4)
- Service request creation flow
- Vehicle management screens
- Dashboard development
- Status tracking implementation
- Push notification setup

### Phase 3: Advanced Features (Weeks 5-6)
- Billing integration screens
- Approval workflow logic
- Reporting dashboard
- Offline mode support
- Performance optimization

### Phase 4: Polish & Testing (Week 7)
- UI/UX refinements
- End-to-end testing
- Performance profiling
- Documentation completion
- Stakeholder demo preparation

---

## Technical Considerations

### Performance Requirements
- **App Launch**: < 2 seconds cold start
- **Screen Transitions**: < 300ms navigation
- **API Response**: < 1 second for standard requests
- **Offline Capability**: Core features available without connection
- **Battery Impact**: < 5% drain per hour of active use

### Security Requirements
- **Data Encryption**: AES-256 for local storage
- **API Security**: OAuth 2.0 + JWT tokens
- **Biometric Storage**: Keychain (iOS) / Keystore (Android)
- **Certificate Pinning**: Prevention of MITM attacks
- **Audit Logging**: Complete activity tracking

### Scalability Considerations
- **Multi-Tenant Architecture**: Support for multiple fleet accounts
- **Modular Component Design**: Reusable service modules
- **API Pagination**: Efficient handling of large datasets
- **Caching Strategy**: Intelligent data refresh policies
- **State Management**: Optimized Redux store structure

---

## Success Metrics

### Technical KPIs
- App crash rate < 0.5%
- API error rate < 1%
- Average session length > 5 minutes
- User retention (7-day) > 60%
- Feature adoption rate > 40%

### Business KPIs
- Service request completion time reduction: 30%
- Invoice processing time reduction: 50%
- User satisfaction score > 4.5/5
- Digital adoption rate among fleet managers: 75%
- Support ticket reduction: 40%

---

## Risk Management

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Platform fragmentation | High | Extensive device testing matrix |
| API performance | Medium | Implement aggressive caching |
| Offline sync conflicts | Medium | Conflict resolution strategy |
| Third-party dependencies | Low | Vendor evaluation and fallbacks |

### Business Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| User adoption resistance | High | Comprehensive training program |
| Integration complexity | Medium | Phased rollout approach |
| Data migration | Medium | Parallel system operation |
| Compliance requirements | Low | Early legal review |

---

## Budget Considerations

### Development Resources
- 2 Senior React Native Developers
- 1 UI/UX Designer
- 1 Backend Developer (API integration)
- 1 QA Engineer
- 0.5 Project Manager

### Timeline
- Total Duration: 7 weeks
- Development: 5 weeks
- Testing & Refinement: 2 weeks

### Infrastructure (POC)
- Development environments
- Testing devices (iOS and Android)
- Mock API hosting
- Analytics platform
- Push notification service

---

## Next Steps

1. **Stakeholder Alignment**: Review and approve technical approach
2. **Design Validation**: Confirm UI/UX concepts with fleet managers
3. **Environment Setup**: Initialize development infrastructure
4. **Sprint Planning**: Define Week 1 deliverables
5. **Vendor Evaluation**: Assess third-party service requirements
6. **Security Review**: Conduct initial threat modeling
7. **Legal Review**: Ensure compliance with data regulations

---

## Conclusion

This proof of concept will demonstrate Bridgestone's capability to deliver a modern, user-centric mobile experience for fleet management customers. By focusing on the critical service request workflow, we can validate technical feasibility, user acceptance, and business value before scaling to a full production implementation.

The modular architecture and technology choices position this POC for rapid evolution into a production-ready solution, while the emphasis on Bridgestone's brand identity ensures market differentiation and customer recognition.

---

## Appendices

### A. API Endpoint Specifications
Detailed REST API documentation available in separate technical specification document.

### B. Data Security Protocol
Comprehensive security requirements and implementation guidelines.

### C. Testing Strategy
Complete test plan including unit, integration, and user acceptance criteria.

### D. Deployment Guide
Step-by-step instructions for POC deployment and demonstration.

---

*Document Version: 1.0*  
*Last Updated: December 2024*  
*Classification: Confidential - Bridgestone Internal Use*