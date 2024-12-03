import { faker } from '@faker-js/faker';
import { projectTypes } from './dataGenerator';

interface CategoryData {
  category: string;
  projects: number;
  fill: string;
}

const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))"
];

export function generateCategoryData(): CategoryData[] {
  return projectTypes.slice(0, 5).map((category, index) => ({
    category,
    projects: faker.number.int({ min: 50, max: 300 }),
    fill: chartColors[index]
  }));
}

