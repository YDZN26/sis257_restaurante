import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class DetalleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  platillo_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cantidad: number;
}

export class CreatePedidoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_cliente: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  id_direccion?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  fecha?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  estado: string;

  @ApiProperty({ type: [DetalleDto] })
  @ValidateNested({ each: true })
  @Type(() => DetalleDto)
  @ArrayMinSize(1)
  detalles: DetalleDto[];
}
