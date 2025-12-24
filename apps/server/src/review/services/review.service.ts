import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { FindManyReviewsDto } from '../dtos';
import { paginator } from 'src/common';
import { filterBy, orderBy, searchBy } from 'src/common/helpers';
import { Prisma, Review } from '@prisma/client';
import { PaginatedResult } from 'src/common/interfaces/pagination-result';

const SEARCHABLE_FIELDS = ['guestName', 'publicReview'];
@Injectable()
export class ReviewsService {
  constructor(private prismaService: PrismaService) {}

  async getNormalizedReviews(
    params: FindManyReviewsDto,
  ): Promise<PaginatedResult<Review>> {
    const paginatedResult = await paginator(this.prismaService.review, {
      include: { property: true },
      where: {
        AND: [
          { OR: searchBy(SEARCHABLE_FIELDS, params.search) },
          filterBy<Prisma.ReviewWhereInput>(params.filterBy),
        ],
      },
      orderBy: orderBy(params?.orderBy),
      page: params.page,
      pageSize: params.pageSize,
    });
    return paginatedResult;
  }

  async getPublicReviews(propertyId?: string) {
    const where = {
      isApproved: true,
      ...(propertyId && { propertyId }),
    };

    const reviews = await this.prismaService.review.findMany({
      where,
      include: { property: true },
      orderBy: { createdAt: 'desc' },
    });

    return reviews.map((review) => ({
      id: review.id,
      listingName: review.property.listingName,
      guestName: review.guestName,
      publicReview: review.publicReview,
      overallRating: review.overallRating,
      categories: this.flattenCategories(review.reviewCategory as any[]),
      channel: review.channel,
      date: review.createdAt.toISOString().split('T')[0],
    }));
  }

  async setApproval(id: string, approved: boolean) {
    return this.prismaService.review.update({
      where: { id },
      data: { isApproved: approved },
      include: { property: true },
    });
  }

  private flattenCategories(
    categories: { category: string; rating: number }[] | null,
  ) {
    if (!categories) return {};
    return categories.reduce(
      (obj, cat) => {
        obj[cat.category] = cat.rating;
        return obj;
      },
      {} as Record<string, number>,
    );
  }
}
