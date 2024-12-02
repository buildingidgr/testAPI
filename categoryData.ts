import { faker } from '@faker-js/faker';

interface CategoryData {
  category: string;
  projects: number;
  fill: string;
}

const categories = [
  { category: "Infrastructure", fill: "hsl(var(--chart-1))" },
  { category: "Commercial", fill: "hsl(var(--chart-2))" },
  { category: "Residential", fill: "hsl(var(--chart-3))" },
  { category: "Industrial", fill: "hsl(var(--chart-4))" },
  { category: "Energy", fill: "hsl(var(--chart-5))" }
];

export function generateCategoryData(): CategoryData[] {
  return categories.map(({ category, fill }) => ({
    category,
    projects: faker.number.int({ min: 50, max: 300 }),
    fill
  }));
}

