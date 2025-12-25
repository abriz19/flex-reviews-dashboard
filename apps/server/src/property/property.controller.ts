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

    // If still not found and id looks like a number (legacy ID from mock data),
    // try to find by listingName by matching with the old mock data mapping
    if (!property && /^\d+$/.test(id)) {
      // Map old numeric IDs to listing names (from mock data)
      const idToNameMap: Record<string, string> = {
        '253094': 'Central Flat in Spitalfields',
        '253095': 'Immaculate 2 Bed Balcony Flat in Fulham',
        '253096': 'Lovely and Relaxing Room in the Heart of Morden',
        '253097': 'Bright Flat in Camberwell',
        '253098': 'Charming 2 Bed Flat in the Heart of Camden',
        '253099': 'Cosy 2 Bed Apartment in Ealing',
      };

      const listingName = idToNameMap[id];
      if (listingName) {
        property = await this.propertyService.findByListingName(listingName);
      }
    }

    if (!property) {
      throw new NotFoundException(
        `Property with id, slug, or listing name '${id}' not found`,
      );
    }

    return property;
  }
}
