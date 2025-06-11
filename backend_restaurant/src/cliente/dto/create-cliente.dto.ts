import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre Cliente no de ser vacío' })
    @IsString({ message: 'El campo nombre Cliente debe ser de tipo cadena' })
    @MaxLength(15 , {message: 'El campo nombre Cliente no debe ser mayor a 15 caracteres',
    })
    readonly nombreCliente: string;


    @ApiProperty()
    @IsNotEmpty({ message: 'El campo carnet de Identidad no debe ser vacío' })
    @IsString({ message: 'El campo carnet de Identidad  debe ser de tipo cadena'})
    @MaxLength(10 , {message: 'El campo carnet de Identidad  no debe ser mayor a 10 caracteres'})
    readonly carnetIdentidad: string;

    @ApiProperty()
    @IsDefined({ message: 'El campo número debe estar definido' })
    @IsNumber({}, { message: 'El campo número debe ser de tipo numérico' })
    readonly celular: number;

}
