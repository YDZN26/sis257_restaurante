import { Module } from '@nestjs/common';
import { ClientesService as ClientesService } from './cliente.service';
import { ClienteController as ClientesController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
