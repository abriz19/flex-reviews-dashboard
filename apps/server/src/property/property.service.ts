import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { Property } from '@prisma/client';

@Injectable()
export class PropertyService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Property[]> {
    return this.prismaService.property.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Property | null> {
    return this.prismaService.property.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findBySlug(slug: string): Promise<Property | null> {
    return this.prismaService.property.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
    });
  }
}

