import { PrismaClient } from '@prisma/client';
import { REVIEWS } from './review.constant';
import { Logger } from '@nestjs/common';

const logger = new Logger('ReviewSeeder');

export async function seedReviews(prisma: PrismaClient) {
  await prisma.review.deleteMany();

  logger.log('Seeding reviews...');
  for (const review of REVIEWS) {
    await prisma.review.create({
      data: review,
    });
  }
}
