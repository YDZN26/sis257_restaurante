import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre_completo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cedula_identidad: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  celular?: string;
}
