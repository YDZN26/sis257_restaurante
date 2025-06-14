import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlatillosService } from './platillos.service';
import { CreatePlatilloDto } from './dto/create-platillo.dto';
import { UpdatePlatilloDto } from './dto/update-platillo.dto';

@Controller('platillos')
export class PlatillosController {
  constructor(private readonly platillosService: PlatillosService) {}

  @Post()
  create(@Body() createPlatilloDto: CreatePlatilloDto) {
    console.log('Body recibido:', createPlatilloDto);
    return this.platillosService.create(createPlatilloDto);
  }

  @Get()
  findAll() {
    return this.platillosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platillosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlatilloDto: UpdatePlatilloDto,
  ) {
    return this.platillosService.update(+id, updatePlatilloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platillosService.remove(+id);
  }
}
