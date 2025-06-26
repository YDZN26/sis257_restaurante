import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDireccionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_cliente: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  direccion: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  piso?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  indicaciones?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  estado: string;
}
