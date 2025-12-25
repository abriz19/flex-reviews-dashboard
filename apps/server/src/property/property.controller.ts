import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async getAllProperties() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  async getProperty(@Param('id') id: string) {
    // Try to find by ID first (UUID)
    let property = await this.propertyService.findOne(id);

    // If not found by ID, try to find by slug
    if (!property) {
      property = await this.propertyService.findBySlug(id);
    }

    if (!property) {
      throw new NotFoundException(`Property with id or slug '${id}' not found`);
    }

    return property;
  }
}
