import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { LowdbService } from '../../lowdb/lowdb.service';

@Injectable()
export class AnimalsService {
  constructor(private readonly lowdbService: LowdbService) {}
  create(createAnimalDto: CreateAnimalDto) {
    return 'This action adds a new animal';
  }

  public async findAll() {
    const listOfAnimals = await this.lowdbService.findAll('data');
    console.log('LIST', listOfAnimals);
    return listOfAnimals;
  }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
