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

interface PaginatedResponse {
  projects: Project[];
  currentPage: number;
  totalPages: number;
  totalProjects: number;
}

export const projectTypes = [
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

export function generatePaginatedResponse(page: number, limit: number, types: string[] = []): PaginatedResponse {
  const totalProjects = 100; // You can adjust this number as needed
  let projects = Array.from({ length: totalProjects }, generateProject);

  // Filter projects if types are provided
  if (types.length > 0) {
    projects = projects.filter(project => types.includes(project.type));
  }

  const totalFilteredProjects = projects.length;
  const totalPages = Math.ceil(totalFilteredProjects / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    projects: projects.slice(startIndex, endIndex),
    currentPage: page,
    totalPages,
    totalProjects: totalFilteredProjects
  };
}

