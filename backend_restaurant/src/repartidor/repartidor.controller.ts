import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RepartidorService } from './repartidor.service';
import { CreateRepartidorDto } from './dto/create-repartidor.dto';
import { UpdateRepartidorDto } from './dto/update-repartidor.dto';

@Controller('repartidor')
export class RepartidorController {
  constructor(private readonly repartidorService: RepartidorService) {}

  @Post()
  create(@Body() dto: CreateRepartidorDto) {
    return this.repartidorService.create(dto);
  }

  @Get()
  findAll() {
    return this.repartidorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.repartidorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRepartidorDto,
  ) {
    return this.repartidorService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.repartidorService.remove(id);
  }
}
