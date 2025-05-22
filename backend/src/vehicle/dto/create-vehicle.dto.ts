import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty()
  manufacturer: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  fuelType: string;

  @ApiProperty()
  transmission: string;

  @ApiProperty({ type: [String] })
  features: string[];

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty({ required: false })
  description?: string;
}