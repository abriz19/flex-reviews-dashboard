import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}
  create() {
    return 'This action adds a new review';
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update() {
    return `This action updates a review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
