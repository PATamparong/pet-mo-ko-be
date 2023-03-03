import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
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
    try {
      const createdAnimal = await this.animalsService.insertAnimal(data);

      return createdAnimal;
    } catch (err) {
      throw err;
    }
  }

  @Get('/get-all-animals-information')
  async findAllAnimals() {
    try {
      const listOfAnimals = await this.animalsService.findAllAnimals();

      return listOfAnimals;
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Put('/edit-animal/:id')
  @ApiBody({ type: UpdateAnimalDto })
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    try {
      return this.animalsService.updateAnimalData(id, updateAnimalDto);
    } catch (err) {
      throw err;
    }
  }

  @Delete('/delete-animal/:id')
  remove(@Param('id') id: string) {
    try {
      return this.animalsService.remove(id);
    } catch (err) {
      throw err;
    }
  }
}
