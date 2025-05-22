import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from '../vehicle.service';
import { PrismaService } from '../../../prisma/prisma.services';


const vehicleMock = {
  id: 1,
  manufacturer: 'BMW',
  model: 'X5',
  year: 2022,
  type: 'SUV',
  price: 60000,
  fuelType: 'GASOLINE',
  transmission: 'AUTO',
  features: [],
  images: [],
  description: 'SUV de luxe',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('VehicleService', () => {
  let service: VehicleService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: PrismaService,
          useValue: {
            vehicle: {
              findMany: jest.fn().mockResolvedValue([vehicleMock]),
              findUnique: jest.fn().mockResolvedValue(vehicleMock),
              create: jest.fn().mockResolvedValue(vehicleMock),
              update: jest.fn().mockResolvedValue(vehicleMock),
              delete: jest.fn().mockResolvedValue(vehicleMock),
            },
          },
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return vehicles', async () => {
    const result = await service.findAll({});
    expect(result).toEqual([vehicleMock]);
    expect(prisma.vehicle.findMany).toHaveBeenCalled();
  });

  it('findOne should return a vehicle', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(vehicleMock);
    expect(prisma.vehicle.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('create should create and return a vehicle', async () => {
    const result = await service.create(vehicleMock as any);
    expect(result).toEqual(vehicleMock);
    expect(prisma.vehicle.create).toHaveBeenCalledWith({ data: vehicleMock });
  });

  it('update should update and return a vehicle', async () => {
    const result = await service.update(1, { model: 'X6' } as any);
    expect(result).toEqual(vehicleMock);
    expect(prisma.vehicle.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { model: 'X6' } });
  });

  it('remove should delete and return a vehicle', async () => {
    const result = await service.remove(1);
    expect(result).toEqual(vehicleMock);
    expect(prisma.vehicle.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
    it('findAll should handle errors', async () => {
        jest.spyOn(prisma.vehicle, 'findMany').mockRejectedValue(new Error('Database error'));
        await expect(service.findAll({})).rejects.toThrow('Erreur lors de la récupération des véhicules');
    });
    it('create should handle errors', async () => {
        jest.spyOn(prisma.vehicle, 'create').mockRejectedValue(new Error('Database error'));
        await expect(service.create(vehicleMock as any)).rejects.toThrow('Erreur lors de la création du véhicule');
    });
    it('update should handle errors', async () => {
        jest.spyOn(prisma.vehicle, 'update').mockRejectedValue(new Error('Database error'));
        await expect(service.update(1, { model: 'X6' } as any)).rejects.toThrow('Impossible de mettre à jour le véhicule avec l\'id 1');
    });
    it('remove should handle errors', async () => {
        jest.spyOn(prisma.vehicle, 'delete').mockRejectedValue(new Error('Database error'));
        await expect(service.remove(1)).rejects.toThrow('Impossible de supprimer le véhicule avec l\'id 1');
    });    
});