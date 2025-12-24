import { PrismaClient } from '@prisma/client';
import { PROPERTIES } from './property.constant';
import { Logger } from '@nestjs/common';

const logger = new Logger('PropertySeeder');

export async function seedProperties(prisma: PrismaClient) {
  await prisma.property.deleteMany();

  logger.log('Seeding properties...');
  const created = await prisma.property.createMany({
    data: PROPERTIES,
  });
}
