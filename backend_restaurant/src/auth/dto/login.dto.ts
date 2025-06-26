import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  usuario_login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  clave: string;
}
