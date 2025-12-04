const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

// Create server
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
server.use(cors());

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Custom routes for authentication
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple mock authentication - in real app, verify credentials
  if (email && password) {
    const db = router.db; // Get the database
    const user = db.get('users').find({ email }).value();
    
    if (user) {
      res.json({
        user,
        token: `mock-jwt-token-${Date.now()}`,
        message: 'Login successful'
      });
    } else {
      res.status(401).json({
        error: 'User not found'
      });
    }
  } else {
    res.status(400).json({
      error: 'Email and password required'
    });
  }
});

// Custom routes for fleet-specific resources
server.get('/fleets/:fleetId/vehicles', (req, res) => {
  const { fleetId } = req.params;
  const db = router.db;
  const vehicles = db.get('vehicles').filter({ fleetId }).value();
  res.json(vehicles);
});

server.get('/fleets/:fleetId/service-requests', (req, res) => {
  const { fleetId } = req.params;
  const db = router.db;
  const serviceRequests = db.get('serviceRequests').filter({ fleetId }).value();
  res.json(serviceRequests);
});

server.get('/fleets/:fleetId/invoices', (req, res) => {
  const { fleetId } = req.params;
  const db = router.db;
  const invoices = db.get('invoices').filter({ fleetId }).value();
  res.json(invoices);
});

// Approve invoice endpoint
server.post('/invoices/:id/approve', (req, res) => {
  const { id } = req.params;
  const db = router.db;
  
  const invoice = db.get('invoices').find({ id }).value();
  if (invoice) {
    db.get('invoices').find({ id }).assign({ 
      status: 'approved',
      approvedAt: new Date().toISOString(),
      approvedBy: 'Current User' // In real app, get from auth token
    }).write();
    
    res.json({ message: 'Invoice approved successfully' });
  } else {
    res.status(404).json({ error: 'Invoice not found' });
  }
});

// Add custom middleware to handle authentication headers
server.use((req, res, next) => {
  // Skip auth for login endpoint
  if (req.path === '/auth/login') {
    return next();
  }
  
  // Check for authorization header (mock check)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  next();
});

// Use default router
server.use(router);

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`📊 Database endpoints available:`);
  console.log(`   - GET /users`);
  console.log(`   - GET /fleets`);
  console.log(`   - GET /vehicles`);
  console.log(`   - GET /serviceRequests`);
  console.log(`   - GET /invoices`);
  console.log(`🔐 Auth endpoints:`);
  console.log(`   - POST /auth/login`);
  console.log(`🏢 Fleet-specific endpoints:`);
  console.log(`   - GET /fleets/:fleetId/vehicles`);
  console.log(`   - GET /fleets/:fleetId/service-requests`);
  console.log(`   - GET /fleets/:fleetId/invoices`);
  console.log(`   - POST /invoices/:id/approve`);
});