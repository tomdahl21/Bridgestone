export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'driver' | 'manager' | 'admin';
  fleetIds: string[];
  phoneNumber: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface Fleet {
  id: string;
  name: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  address: Address;
  vehicles: Vehicle[];
  activeServiceRequests: number;
  totalVehicles: number;
  monthlySpend: number;
  createdAt: Date;
}

export interface Vehicle {
  id: string;
  fleetId: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  currentLocation?: GeoCoordinates;
  status: 'active' | 'in-service' | 'maintenance' | 'inactive';
  lastServiceDate?: Date;
  nextServiceDue?: Date;
  tireInfo: TireInfo;
  driverAssigned?: string;
  createdAt: Date;
}

export interface ServiceRequest {
  id: string;
  fleetId: string;
  vehicleId: string;
  vehicleVIN: string;
  requestorId: string;
  location: GeoCoordinates;
  issueType: TireIssueType;
  priority: 'urgent' | 'standard' | 'scheduled';
  description: string;
  photos: Photo[];
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
  estimatedServiceTime?: Date;
  actualServiceTime?: Date;
  technicianId?: string;
  technicianName?: string;
  technicianPhone?: string;
  serviceNotes?: string;
  invoiceId?: string;
}

export interface Invoice {
  id: string;
  serviceRequestId: string;
  fleetId: string;
  amount: number;
  tax: number;
  total: number;
  status: 'pending' | 'approved' | 'paid' | 'disputed';
  lineItems: LineItem[];
  poNumber?: string;
  costCenter?: string;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  dueDate: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface TireInfo {
  frontLeft: TireDetails;
  frontRight: TireDetails;
  rearLeft: TireDetails;
  rearRight: TireDetails;
  spareCount?: number;
}

export interface TireDetails {
  brand: string;
  model: string;
  size: string;
  installDate?: Date;
  mileage?: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'replace';
}

export interface Photo {
  id: string;
  uri: string;
  thumbnail?: string;
  description?: string;
  timestamp: Date;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'tire' | 'labor' | 'parts' | 'service';
}

export type TireIssueType = 
  | 'flat_tire'
  | 'puncture'
  | 'worn_tread'
  | 'sidewall_damage'
  | 'alignment_issue'
  | 'pressure_loss'
  | 'irregular_wear'
  | 'road_hazard'
  | 'other';

export type RequestStatus = 
  | 'submitted'
  | 'approved'
  | 'rejected'
  | 'dispatched'
  | 'in_progress'
  | 'completed'
  | 'invoiced'
  | 'on_hold'
  | 'cancelled';

export interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  token?: string;
  selectedFleetId?: string;
  biometricEnabled: boolean;
}

export interface AppState {
  auth: AuthState;
  fleets: Fleet[];
  vehicles: Vehicle[];
  serviceRequests: ServiceRequest[];
  invoices: Invoice[];
  loading: boolean;
  error?: string;
}