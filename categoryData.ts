import { faker } from '@faker-js/faker';

interface CategoryData {
  category: string;
  projects: number;
  fill: string;
}

const categories = [
  { category: "Infrastructure", fill: "var(--color-infrastructure)" },
  { category: "Commercial", fill: "hsl(var(--primary))" },
  { category: "Residential", fill: "hsl(var(--secondary))" },
  { category: "Industrial", fill: "hsl(var(--accent))" },
  { category: "Energy", fill: "hsl(var(--muted))" }
];

export function generateCategoryData(): CategoryData[] {
  return categories.map(({ category, fill }) => ({
    category,
    projects: faker.number.int({ min: 50, max: 300 }),
    fill
  }));
}

