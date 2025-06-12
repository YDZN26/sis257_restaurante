import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePlatilloDto {
  @IsOptional()
  @IsString()
  idPlatillo?: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  tiempoPreparacion: number;

  @IsNotEmpty()
  @IsNumber()
  disponibilidad: number;
}
