import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlatilloDto {
  @IsNotEmpty()
  @IsString()
  idPlatillo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsString()
  tiempoPreparacion: string;

  @IsNotEmpty()
  @IsNumber()
  disponibilidad: number;
}
