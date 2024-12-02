import express from 'express';
import cors from 'cors';
import { generatePaginatedResponse, projectTypes, generateRandomUpdatedProject, getProjectById } from './dataGenerator';
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

// Category data route
app.get('/api/projects/categories', (req, res) => {
  const categoryData = generateCategoryData();
  res.json(categoryData);
});

// Available project types route
app.get('/api/projects/types', (req, res) => {
  res.json(projectTypes);
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

// GET endpoint for retrieving a single project with customer data
app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = getProjectById(id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.json(project);
});

// Updated PUT endpoint for updating a project (now returns random data)
app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  
  // Generate a random updated project
  const updatedProject = generateRandomUpdatedProject(id);

  res.json(updatedProject);
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

