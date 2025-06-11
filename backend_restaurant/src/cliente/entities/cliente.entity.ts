import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar',{length:10})x
    nombreCliente: string;

    @Column('integer',{name: 'carnetIdentidad'})
    carnetIdentidad: number;

    @Column('integer',{name:'celular'})
    celular:number;

    @CreateDateColumn({name:'fecha_creacion'})
    fechaCreacion:Date;
}
