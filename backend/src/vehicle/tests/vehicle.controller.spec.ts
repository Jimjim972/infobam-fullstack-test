import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from '../vehicle.controller';
import { VehicleService } from '../vehicle.service';

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

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([vehicleMock]),
            findOne: jest.fn().mockResolvedValue(vehicleMock),
            create: jest.fn().mockResolvedValue(vehicleMock),
            update: jest.fn().mockResolvedValue(vehicleMock),
            remove: jest.fn().mockResolvedValue(vehicleMock),
          },
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of vehicles', async () => {
    expect(await controller.findAll()).toEqual([vehicleMock]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a vehicle by id', async () => {
    expect(await controller.findOne('1')).toEqual(vehicleMock);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a vehicle', async () => {
    expect(await controller.create(vehicleMock as any)).toEqual(vehicleMock);
    expect(service.create).toHaveBeenCalledWith(vehicleMock);
  });

  it('should update a vehicle', async () => {
    expect(await controller.update('1', { model: 'X6' } as any)).toEqual(vehicleMock);
    expect(service.update).toHaveBeenCalledWith(1, { model: 'X6' });
  });

  it('should remove a vehicle', async () => {
    expect(await controller.remove('1')).toEqual(vehicleMock);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
    it('should handle errors', async () => {
        jest.spyOn(service, 'findOne').mockRejectedValue(new Error('Error'));
        await expect(controller.findOne('1')).rejects.toThrow('Error');
        expect(service.findOne).toHaveBeenCalledWith(1);
    });
    it('should handle errors on create', async () => {
        jest.spyOn(service, 'create').mockRejectedValue(new Error('Error'));
        await expect(controller.create(vehicleMock as any)).rejects.toThrow('Error');
        expect(service.create).toHaveBeenCalledWith(vehicleMock);
    });
    it('should handle errors on update', async () => {
        jest.spyOn(service, 'update').mockRejectedValue(new Error('Error'));
        await expect(controller.update('1', { model: 'X6' } as any)).rejects.toThrow('Error');
        expect(service.update).toHaveBeenCalledWith(1, { model: 'X6' });
    });
    it('should handle errors on remove', async () => {
        jest.spyOn(service, 'remove').mockRejectedValue(new Error('Error'));
        await expect(controller.remove('1')).rejects.toThrow('Error');
        expect(service.remove).toHaveBeenCalledWith(1);
    });
    it('should handle errors on findAll', async () => {
        jest.spyOn(service, 'findAll').mockRejectedValue(new Error('Error'));
        await expect(controller.findAll()).rejects.toThrow('Error');
        expect(service.findAll).toHaveBeenCalled();
    });
});