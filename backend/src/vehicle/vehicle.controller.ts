import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle, Prisma } from '@prisma/client';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll(
    @Query('manufacturer') manufacturer?: string,
    @Query('type') type?: string,
    @Query('fuelType') fuelType?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '9',
  ) {
    return this.vehicleService.findAll({
      manufacturer,
      type,
      fuelType,
      sortBy,
      order,
      page: Number(page),
      limit: Number(limit),
    });
  }

 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(Number(id));
  }


  @Post()
  create(@Body() data: CreateVehicleDto) {
    return this.vehicleService.create(data);
  }

 
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateVehicleDto) {
    return this.vehicleService.update(Number(id), data);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(Number(id));
  }
}