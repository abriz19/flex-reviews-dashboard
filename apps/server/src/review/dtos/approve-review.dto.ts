import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ApproveReviewDto {
  @ApiProperty({
    description: 'Whether to approve (publish) or reject the review',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  approved: boolean;
}

