import express from 'express';
import cors from 'cors';
import { generatePaginatedResponse, projectTypes } from './dataGenerator';
import { generateCategoryData } from './categoryData';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Greece Projects API' });
});

// Projects route with filtering
app.get('/api/projects', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const types = (req.query.type as string | string[]) || [];

  // Ensure types is always an array
  const typeFilters = Array.isArray(types) ? types : [types];

  // Validate type filters
  const validTypes = typeFilters.filter(type => projectTypes.includes(type));

  const response = generatePaginatedResponse(page, limit, validTypes);
  res.json(response);
});

// Category data route
app.get('/api/projects/categories', (req, res) => {
  const categoryData = generateCategoryData();
  res.json(categoryData);
});

// Available project types route
app.get('/api/projects/types', (req, res) => {
  res.json(projectTypes);
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

