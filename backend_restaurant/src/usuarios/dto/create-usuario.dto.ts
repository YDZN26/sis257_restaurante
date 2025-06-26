import { IsNotEmpty, IsString, IsIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_empleado: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  usuario_login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  clave: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['administrador', 'cajero', 'repartidor'])
  rol: string;
}
