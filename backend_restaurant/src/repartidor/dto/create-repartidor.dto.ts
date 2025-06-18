import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateRepartidorDto {
  @IsNotEmpty()
  @IsString()
  nombreRepartidor: string;

  @IsNotEmpty()
  @IsString()
  carnetIdentidad: string;

  @IsNotEmpty()
  @IsDateString()
  fechaEdad: string;

  @IsNotEmpty()
  @IsDateString()
  fechaIngreso: string;
}
