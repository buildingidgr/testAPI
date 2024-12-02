import { faker } from '@faker-js/faker';

interface Project {
  title: string;
  description: string;
  type: string;
  state: 'public' | 'private';
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    }
  }
}

interface CategoryTotals {
  [category: string]: number;
}

interface PaginatedResponse {
  projects: Project[];
  currentPage: number;
  totalPages: number;
  totalProjects: number;
  categoryTotals: CategoryTotals;
}

const projectTypes = [
  'Infrastructure', 'Commercial', 'Residential', 'Industrial', 'Energy', 
  'Tourism', 'Technology', 'Agriculture', 'Education', 'Healthcare'
];

const greekCities = [
  'Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 
  'Volos', 'Ioannina', 'Trikala', 'Chalkida', 'Serres'
];

function generateProject(): Project {
  const city = faker.helpers.arrayElement(greekCities);
  return {
    title: `${faker.company.buzzPhrase()} in ${city}`,
    description: faker.lorem.paragraph(),
    type: faker.helpers.arrayElement(projectTypes),
    state: faker.helpers.arrayElement(['public', 'private']),
    location: {
      address: `${faker.location.streetAddress()}, ${city}, Greece`,
      coordinates: {
        lat: faker.location.latitude({ max: 41.7, min: 35 }),
        lng: faker.location.longitude({ max: 28.2, min: 19.3 })
      }
    }
  };
}

function generateCategoryTotals(totalProjects: number): CategoryTotals {
  const totals: CategoryTotals = {};
  projectTypes.forEach(type => {
    totals[type] = Math.floor(Math.random() * (totalProjects / 10)) + 1;
  });
  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  if (sum < totalProjects) {
    totals[projectTypes[0]] += totalProjects - sum;
  }
  return totals;
}

export function generatePaginatedResponse(page: number, limit: number): PaginatedResponse {
  const totalProjects = 100; // You can adjust this number as needed
  const totalPages = Math.ceil(totalProjects / limit);
  const categoryTotals = generateCategoryTotals(totalProjects);

  const projects = Array.from({ length: Math.min(limit, totalProjects) }, generateProject);

  return {
    projects,
    currentPage: page,
    totalPages,
    totalProjects,
    categoryTotals
  };
}

