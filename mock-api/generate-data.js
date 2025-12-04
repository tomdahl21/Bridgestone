const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Helper functions to generate realistic data
function generateTireDetails() {
  const brands = ['Bridgestone', 'Firestone', 'Michelin', 'Goodyear'];
  const conditions = ['excellent', 'good', 'fair', 'poor'];
  
  return {
    brand: faker.helpers.arrayElement(brands),
    model: faker.vehicle.model(),
    size: `${faker.number.int({ min: 185, max: 285 })}/${faker.number.int({ min: 50, max: 80 })}R${faker.number.int({ min: 15, max: 22 })}`,
    installDate: faker.date.past({ years: 2 }),
    mileage: faker.number.int({ min: 1000, max: 80000 }),
    condition: faker.helpers.arrayElement(conditions),
  };
}

function generateAddress() {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: 'USA',
  };
}

function generateGeoCoordinates() {
  return {
    latitude: faker.location.latitude({ min: 25.0, max: 49.0 }),
    longitude: faker.location.longitude({ min: -125.0, max: -66.0 }),
    address: faker.location.streetAddress(),
  };
}

// Generate users
function generateUsers(count = 10) {
  return Array.from({ length: count }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
      id: faker.string.uuid(),
      email: faker.internet.email({ firstName, lastName }),
      firstName,
      lastName,
      role: faker.helpers.arrayElement(['driver', 'manager', 'admin']),
      fleetIds: [faker.string.uuid(), faker.string.uuid()],
      phoneNumber: faker.phone.number(),
      createdAt: faker.date.past({ years: 2 }),
      lastLoginAt: faker.date.recent(),
    };
  });
}

// Generate fleets
function generateFleets(count = 5) {
  return Array.from({ length: count }, () => {
    const companyName = faker.company.name();
    
    return {
      id: faker.string.uuid(),
      name: `${companyName} Fleet`,
      companyName,
      contactEmail: faker.internet.email(),
      contactPhone: faker.phone.number(),
      address: generateAddress(),
      vehicles: [], // Will be populated separately
      activeServiceRequests: faker.number.int({ min: 0, max: 10 }),
      totalVehicles: faker.number.int({ min: 5, max: 50 }),
      monthlySpend: faker.number.float({ min: 5000, max: 50000, multipleOf: 0.01 }),
      createdAt: faker.date.past({ years: 3 }),
    };
  });
}

// Generate vehicles
function generateVehicles(fleets, count = 50) {
  return Array.from({ length: count }, () => {
    const fleet = faker.helpers.arrayElement(fleets);
    
    return {
      id: faker.string.uuid(),
      fleetId: fleet.id,
      vin: faker.vehicle.vin(),
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.number.int({ min: 2015, max: 2024 }),
      licensePlate: faker.vehicle.vrm(),
      currentLocation: generateGeoCoordinates(),
      status: faker.helpers.arrayElement(['active', 'in-service', 'maintenance', 'inactive']),
      lastServiceDate: faker.date.past({ months: 6 }),
      nextServiceDue: faker.date.future({ months: 3 }),
      tireInfo: {
        frontLeft: generateTireDetails(),
        frontRight: generateTireDetails(),
        rearLeft: generateTireDetails(),
        rearRight: generateTireDetails(),
        spareCount: faker.number.int({ min: 0, max: 2 }),
      },
      driverAssigned: faker.person.fullName(),
      createdAt: faker.date.past({ years: 2 }),
    };
  });
}

// Generate service requests
function generateServiceRequests(vehicles, count = 30) {
  const issueTypes = [
    'flat_tire', 'puncture', 'worn_tread', 'sidewall_damage',
    'alignment_issue', 'pressure_loss', 'irregular_wear', 'road_hazard', 'other'
  ];
  
  const statuses = [
    'submitted', 'approved', 'rejected', 'dispatched',
    'in_progress', 'completed', 'invoiced', 'on_hold', 'cancelled'
  ];
  
  return Array.from({ length: count }, () => {
    const vehicle = faker.helpers.arrayElement(vehicles);
    const createdAt = faker.date.past({ months: 3 });
    
    return {
      id: faker.string.uuid(),
      fleetId: vehicle.fleetId,
      vehicleId: vehicle.id,
      vehicleVIN: vehicle.vin,
      requestorId: faker.string.uuid(),
      location: generateGeoCoordinates(),
      issueType: faker.helpers.arrayElement(issueTypes),
      priority: faker.helpers.arrayElement(['urgent', 'standard', 'scheduled']),
      description: faker.lorem.paragraph(),
      photos: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
        id: faker.string.uuid(),
        uri: faker.image.url(),
        thumbnail: faker.image.url(),
        description: faker.lorem.sentence(),
        timestamp: faker.date.between({ from: createdAt, to: new Date() }),
      })),
      status: faker.helpers.arrayElement(statuses),
      createdAt,
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
      estimatedServiceTime: faker.date.future({ days: 7 }),
      actualServiceTime: faker.date.recent(),
      technicianId: faker.string.uuid(),
      technicianName: faker.person.fullName(),
      technicianPhone: faker.phone.number(),
      serviceNotes: faker.lorem.paragraph(),
      invoiceId: faker.string.uuid(),
    };
  });
}

// Generate invoices
function generateInvoices(serviceRequests, count = 20) {
  return Array.from({ length: count }, () => {
    const serviceRequest = faker.helpers.arrayElement(serviceRequests);
    const lineItems = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => {
      const quantity = faker.number.int({ min: 1, max: 4 });
      const unitPrice = faker.number.float({ min: 50, max: 500, multipleOf: 0.01 });
      
      return {
        id: faker.string.uuid(),
        description: faker.commerce.productName(),
        quantity,
        unitPrice,
        total: quantity * unitPrice,
        category: faker.helpers.arrayElement(['tire', 'labor', 'parts', 'service']),
      };
    });
    
    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.08; // 8% tax
    
    return {
      id: faker.string.uuid(),
      serviceRequestId: serviceRequest.id,
      fleetId: serviceRequest.fleetId,
      amount: subtotal,
      tax,
      total: subtotal + tax,
      status: faker.helpers.arrayElement(['pending', 'approved', 'paid', 'disputed']),
      lineItems,
      poNumber: faker.string.alphanumeric(8).toUpperCase(),
      costCenter: faker.string.alphanumeric(6).toUpperCase(),
      approvedBy: faker.person.fullName(),
      approvedAt: faker.date.recent(),
      createdAt: faker.date.past({ months: 2 }),
      dueDate: faker.date.future({ days: 30 }),
    };
  });
}

// Generate all data
const users = generateUsers();
const fleets = generateFleets();
const vehicles = generateVehicles(fleets);
const serviceRequests = generateServiceRequests(vehicles);
const invoices = generateInvoices(serviceRequests);

// Create the database object
const db = {
  users,
  fleets,
  vehicles,
  serviceRequests,
  invoices,
  // Auth endpoint mock response
  auth: {
    login: {
      user: users[0],
      token: 'mock-jwt-token-' + faker.string.alphanumeric(20),
    },
  },
};

// Write to db.json
fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

console.log('Mock database generated successfully!');
console.log(`Generated:
  - ${users.length} users
  - ${fleets.length} fleets
  - ${vehicles.length} vehicles
  - ${serviceRequests.length} service requests
  - ${invoices.length} invoices
`);