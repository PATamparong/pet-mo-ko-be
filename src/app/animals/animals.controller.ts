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
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @ApiBody({ type: CreateAnimalDto })
  @Post('/add-animal')
  async create(@Body() data: CreateAnimalDto) {
    const createdAnimal = await this.animalsService.insertAnimal(data);

    return createdAnimal;
  }

  @Get('/get-all-animals-information')
  async findAllAnimals() {
    const listOfAnimals = await this.animalsService.findAllAnimals();

    return listOfAnimals;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.updateAnimalData(id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(+id);
  }
}
