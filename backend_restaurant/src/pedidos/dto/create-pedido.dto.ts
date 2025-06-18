import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsDateString()
  fechaPedido: string;

  @IsNotEmpty()
  @IsNumber()
  idRepartidor: number;

  @IsNotEmpty()
  @IsNumber()
  idCliente: number;

  @IsNotEmpty()
  @IsNumber()
  idDireccion: number;

  @IsNotEmpty()
  @IsNumber()
  idPlatillo: number;
}
