import { PrismaClient } from '@prisma/client';
import { seedProperties } from './property/property.seeder';
import { seedReviews } from './review/review.seeder';
import { Logger } from '@nestjs/common';

const prisma = new PrismaClient();
const logger = new Logger('PrismaSeeder');

async function main() {
  logger.log('Starting seeding...');

  // Seed in order: properties first, then reviews
  await seedProperties(prisma);
  await seedReviews(prisma);

  logger.log('Seeding completed successfully! 🎉');
}

main()
  .catch((e) => {
    logger.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
