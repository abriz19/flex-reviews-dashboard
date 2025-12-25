import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { FindManyReviewsDto } from '../dtos';
import { paginator } from 'src/common';
import { filterBy, orderBy, searchBy } from 'src/common/helpers';
import { Prisma, Review } from '@prisma/client';
import { PaginatedResult } from 'src/common/interfaces/pagination-result';

const SEARCHABLE_FIELDS = ['guestName', 'publicReview'];

// Type for Review with property relation
type ReviewWithProperty = Prisma.ReviewGetPayload<{
  include: { property: true };
}>;

@Injectable()
export class ReviewsService {
  constructor(private prismaService: PrismaService) {}

  async getNormalizedReviews(
    params: FindManyReviewsDto,
  ): Promise<PaginatedResult<any>> {
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

    // Normalize the reviews: flatten categories, ensure overallRating is calculated
    const normalizedItems = (paginatedResult.items as ReviewWithProperty[]).map(
      (review) => {
        // Calculate overallRating from categories if missing
        let overallRating = review.overallRating;
        if (!overallRating && review.reviewCategory) {
          const categories = review.reviewCategory as {
            category: string;
            rating: number;
          }[];
          if (categories.length > 0) {
            const sum = categories.reduce((acc, cat) => acc + cat.rating, 0);
            overallRating = sum / categories.length;
          }
        }

        const channel = review.channel || 'Hostaway';

        return {
          id: review.id,
          propertyId: review.propertyId,
          property: review.property,
          guestName: review.guestName,
          publicReview: review.publicReview,
          reviewCategory: review.reviewCategory,
          categories: this.flattenCategories(
            review.reviewCategory as { category: string; rating: number }[],
          ),
          overallRating: overallRating,
          rating: overallRating, // Alias for frontend compatibility
          type: review.type,
          channel: channel,
          isApproved: review.isApproved,
          status: review.isApproved ? 'published' : 'pending', // Map to frontend status
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          submittedAt: review.createdAt.toISOString(), // Alias for frontend compatibility
          listingName: review.property.listingName,
          listingId: review.property.id, // Use property ID as listingId
        };
      },
    );

    return {
      ...paginatedResult,
      items: normalizedItems,
    };
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

    return (reviews as ReviewWithProperty[]).map((review) => {
      // Calculate overallRating from categories if missing
      let overallRating = review.overallRating;
      if (!overallRating && review.reviewCategory) {
        const categories = review.reviewCategory as {
          category: string;
          rating: number;
        }[];
        if (categories.length > 0) {
          const sum = categories.reduce((acc, cat) => acc + cat.rating, 0);
          overallRating = sum / categories.length;
        }
      }

      // Infer channel if missing
      const channel = review.channel || 'Hostaway';

      return {
        id: review.id,
        propertyId: review.propertyId,
        property: review.property,
        guestName: review.guestName,
        publicReview: review.publicReview,
        reviewCategory: review.reviewCategory,
        categories: this.flattenCategories(
          review.reviewCategory as { category: string; rating: number }[],
        ),
        overallRating: overallRating,
        rating: overallRating, // Alias for frontend compatibility
        type: review.type,
        channel: channel,
        isApproved: review.isApproved,
        status: review.isApproved ? 'published' : 'pending', // Map to frontend status
        createdAt: review.createdAt.toISOString(),
        updatedAt: review.updatedAt.toISOString(),
        submittedAt: review.createdAt.toISOString(), // Alias for frontend compatibility
        listingName: review.property.listingName,
        listingId: review.property.id, // Use property ID as listingId
      };
    });
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
