import { Controller, Get, Param } from '@nestjs/common';
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
    return this.propertyService.findOne(id);
  }
}

