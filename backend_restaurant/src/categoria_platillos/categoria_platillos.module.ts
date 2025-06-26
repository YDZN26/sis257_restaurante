import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaPlatillosService } from './categoria_platillos.service';
import { CategoriaPlatillosController } from './categoria_platillos.controller';
import { CategoriaPlatillo } from './entities/categoria_platillo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaPlatillo])],
  controllers: [CategoriaPlatillosController],
  providers: [CategoriaPlatillosService],
})
export class CategoriaPlatillosModule {}
