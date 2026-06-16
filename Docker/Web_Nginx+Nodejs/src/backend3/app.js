const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'backend', node: 'backend3' });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
    { id: 3, name: 'Charlie', role: 'User' }
  ]);
});

app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
  ]);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running on port ${PORT}`);
});
