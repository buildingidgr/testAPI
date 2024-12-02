import { faker } from '@faker-js/faker';

interface CategoryData {
  category: string;
  projects: number;
  fill: string;
}

const projectTypes = [
  'Infrastructure', 'Commercial', 'Residential', 'Industrial', 'Energy'
];

const fillColors = [
  'neutral-50', 'neutral-100', 'neutral-200', 'neutral-300', 'neutral-400'
];

export function generateCategoryData(): CategoryData[] {
  return projectTypes.map((category, index) => ({
    category,
    projects: faker.number.int({ min: 50, max: 300 }),
    fill: fillColors[index]
  }));
}

