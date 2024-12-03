import { faker } from '@faker-js/faker';

interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface Project {
  id: string;
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
  };
  customer: Customer;
}

interface ProjectResponse {
  id: string;
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
  };
}

interface PaginatedResponse {
  projects: ProjectResponse[];
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

function generateCustomer(): Customer {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number('+30 69########')
  };
}

function generateProject(): Project {
  const city = faker.helpers.arrayElement(greekCities);
  return {
    id: faker.string.uuid(),
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
    },
    customer: generateCustomer()
  };
}

function projectToResponse(project: Project): ProjectResponse {
  const { customer, ...projectResponse } = project;
  return projectResponse;
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

  const projectResponses = projects.slice(startIndex, endIndex).map(projectToResponse);

  return {
    projects: projectResponses,
    currentPage: page,
    totalPages,
    totalProjects: totalFilteredProjects
  };
}

