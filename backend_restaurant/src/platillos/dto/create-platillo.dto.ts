import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlatilloDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  precio: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tiempo_preparacion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_categoria: number;
}
