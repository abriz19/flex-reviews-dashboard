import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ReviewsService {
  constructor(private prismaService: PrismaService) {}

  async getNormalizedReviews() {
    const reviews = await this.prismaService.review.findMany({
      include: { property: true },
      orderBy: { createdAt: 'desc' },
    });

    return reviews.map((review) => ({
      id: review.id,
      propertyId: review.propertyId,
      listingName: review.property.listingName,
      guestName: review.guestName,
      publicReview: review.publicReview,
      overallRating: review.overallRating,
      categories: this.flattenCategories(review.reviewCategory as any[]),
      channel: review.channel,
      type: review.type,
      date: review.createdAt.toISOString().split('T')[0],
      createdAt: review.createdAt.toISOString().split('T')[0],
      isApproved: review.isApproved,
    }));
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
