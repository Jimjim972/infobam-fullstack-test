import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.services';
import { Vehicle, Prisma } from '@prisma/client';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    manufacturer?: string;
    type?: string;
    fuelType?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }): Promise<Vehicle[]> {
    const { manufacturer, type, fuelType, sortBy, order, page = 1, limit = 10 } = params;

    const where: any = {};
    if (manufacturer) where.manufacturer = manufacturer;
    if (type) where.type = type;
    if (fuelType) where.fuelType = fuelType;

    try {
      return await this.prisma.vehicle.findMany({
        where,
        orderBy: sortBy ? { [sortBy]: order || 'asc' } : undefined,
        skip: (page - 1) * limit,
        take: limit,
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des véhicules');
    }
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`Véhicule avec l'id ${id} non trouvé`);
    }
    return vehicle;
  }

  async create(data: Prisma.VehicleCreateInput): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.create({ data });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création du véhicule');
    }
  }

  async update(id: number, data: Prisma.VehicleUpdateInput): Promise<Vehicle> {
    try {
      const vehicle = await this.prisma.vehicle.update({ where: { id }, data });
      return vehicle;
    } catch (error) {
      throw new NotFoundException(`Impossible de mettre à jour le véhicule avec l'id ${id}`);
    }
  }

  async remove(id: number): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Impossible de supprimer le véhicule avec l'id ${id}`);
    }
  }
}