import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateDireccioneDto {
  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  piso: string;

  @IsNotEmpty()
  @IsString()
  indicaciones: string;

  @IsNotEmpty()
  @IsBoolean()
  estado: boolean;

  @IsNotEmpty()
  @IsDateString()
  fecha_registro: string;

  @IsNotEmpty()
  @IsNumber()
  idCliente: number; // este es el FK, debe coincidir con el JoinColumn
}
