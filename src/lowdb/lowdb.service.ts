import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';

type CollctionName = 'data';

@Injectable()
export class LowdbService {
  private db: lowdb.LowdbAsync<any>;

  constructor() {
    this.initDatabase('data');
  }

  private async initDatabase(collctionName: CollctionName) {
    const adapter = new FileAsync('db.json');
    this.db = await lowdb(adapter);

    const listOfAnimals = await this.db.get(collctionName).value();

    if (!listOfAnimals) {
      await this.db
        .set(collctionName, {
          data: {
            animals: [
              { id: 1, name: 'gucci' },
              { id: 2, name: 'lyla' },
              { id: 3, name: 'zilong' },
            ],
          },
        })
        .write();
    }

    await this.db.read();
  }

  public async findAll(collctionName: CollctionName): Promise<any> {
    const listOfAnimals = await this.db.get(collctionName).value();

    return listOfAnimals;
  }

  public async update(
    key: string,
    collctionName: string,
    dataUpdate: any,
  ): Promise<any> {
    const listUsers = await this.db.get(collctionName).value();
    let out;

    const listData = listUsers?.animals?.map((animals) => {
      if (animals.id === key) {
        out = Object.assign(animals, dataUpdate);

        return out;
      } else {
        return animals;
      }
    });

    await this.db.set(collctionName, { animals: listData }).write();

    return out;
  }

  public async insert(record: any, collctionName: CollctionName): Promise<any> {
    const listData = await this.db.get(collctionName).value();
    record.id = Math.floor((1 + Math.random()) * 0x10).toString();
    listData?.animals?.push(record);

    this.db.set(collctionName, listData).write();

    return record;
  }

  public async delete(key: string, collctionName: CollctionName): Promise<any> {
    const listUsers = await this.db.get(collctionName).value();

    let out;

    const listData = listUsers?.animals?.map((animals) => {
      if (animals.id === key) {
        out = Object.assign(animals, { ...animals, status: 'deleted' });

        return out;
      } else {
        return animals;
      }
    });

    await this.db.set(collctionName, { animals: listData }).write();

    return out;
  }
}
