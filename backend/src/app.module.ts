import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VehicleController } from './vehicle/vehicle.controller';
import { VehicleService } from './vehicle/vehicle.service';
import { PrismaService } from '../prisma/prisma.services';

@Module({
  imports: [],
  controllers: [AppController, VehicleController],
  providers: [VehicleService, PrismaService],
})
export class AppModule {}
