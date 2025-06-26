import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetalleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_pedido: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_platillo: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  precio_unitario: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subtotal: number;
}
