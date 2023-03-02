import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { LowdbService } from '../../lowdb/lowdb.service';

@Injectable()
export class AnimalsService {
  constructor(private readonly lowdbService: LowdbService) {}
  public async insertAnimal(data: CreateAnimalDto) {
    // const isAnimalExist = await this.lowdbService.find(createAnimalDto, 'data');

    // if (isAnimalExist) {
    //   throw new HttpException(
    //     'You pet is already on the list',
    //     HttpStatus.NOT_ACCEPTABLE,
    //   );
    // }

    const createdAnimal = await this.lowdbService.insert(data, 'data');

    return createdAnimal;
  }

  public async findAllAnimals() {
    const listOfAnimals = await this.lowdbService.findAll('data');

    return listOfAnimals;
  }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  async updateAnimalData(id: string, updateAnimalDto: UpdateAnimalDto) {
    const updateAnimal = await this.lowdbService.update(
      id,
      'data',
      updateAnimalDto,
    );

    return updateAnimal;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
