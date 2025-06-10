import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsDateString, Min } from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  @Min(1)
  @ApiProperty()
  cantidad: number;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  total: number;

  @IsDateString()
  @ApiProperty()
  fechaPedido: string;

  @IsInt()
  @ApiProperty()
  id_repartidor: number;

  @IsInt()
  @ApiProperty()
  id_cliente: number;

  @IsInt()
  @ApiProperty()
  id_direccion: number;
}
