import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { LowdbService } from '../../lowdb/lowdb.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Animals')
@Controller('Animals')
export class AnimalsController {
  constructor(
    private readonly animalsService: AnimalsService,
    private readonly lowdbService: LowdbService,
  ) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Get('/animals')
  async findAllAnimals() {
    const listOfAnimals = await this.animalsService.findAll();

    return listOfAnimals;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(+id);
  }
}
