import express from 'express';
import { generatePaginatedResponse } from './dataGenerator';

const app = express();
const port = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Greece Projects API' });
});

// Projects route
app.get('/api/projects', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  const response = generatePaginatedResponse(page, pageSize);
  res.json(response);
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

