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

export function generatePaginatedResponse(page: number, pageSize: number): PaginatedResponse {
  const totalProjects = 100; // You can adjust this number as needed
  const totalPages = Math.ceil(totalProjects / pageSize);

  const projects = Array.from({ length: pageSize }, generateProject);

  return {
    projects,
    currentPage: page,
    totalPages,
    totalProjects
  };
}

