import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { FindOperator } from 'typeorm';

export class CreateDetalleDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre Cliente no de ser vacío' })
  @IsString({ message: 'El campo nombre Cliente debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre Cliente no debe ser mayor a 15 caracteres',
  })
  private readonly _nombreCliente: string;
  direccionEstado: any;
  puntuacion: any;
  credibilidad: any;
  amabilidad: any;
  idPedido: number | FindOperator<number> | undefined;
  idCliente: number | FindOperator<number> | undefined;
  public get nombreCliente(): string {
    return this._nombreCliente;
  }

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo carnet de Identidad no debe ser vacío' })
  @IsString({
    message: 'El campo carnet de Identidad  debe ser de tipo cadena',
  })
  @MaxLength(100, {
    message: 'El campo carnet de Identidad  no debe ser mayor a 100 caracteres',
  })
  readonly carnetIdentidad: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Edad debe estar definido' })
  @IsDateString({}, { message: 'El campo Edad debe ser de tipo fecha' })
  readonly fechaEdad: Date;

  @ApiProperty()
  @IsDefined({ message: 'El campo número debe estar definido' })
  @IsNumber({}, { message: 'El campo número debe ser de tipo numérico' })
  readonly celular: number;
}
