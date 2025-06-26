import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmpleadoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  primer_apellido: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  segundo_apellido: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cedula_identidad: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  celular: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cargo: string;
}
