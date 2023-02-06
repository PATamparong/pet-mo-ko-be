import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as uuid from 'uuid';

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

  public async findByKey(
    key: number,
    value: string | string,
    collctionName: CollctionName,
  ): Promise<any> {
    const values = this.db.get(collctionName).value();

    let result;

    values.map((user) => {
      if (user[key] !== value) return result;
      if (user[key] === value) {
        return result;
      }
    });

    return result;
  }

  public async update(
    key: string,
    value: string | string,
    collctionName: string,
    dataUpdate: any,
  ): Promise<any> {
    const listUsers = await this.db.get(collctionName).value();
    let out;

    const listData = listUsers.map((user) => {
      if (user[key] !== value) return user;
      if (user[key] === value) {
        out = Object.assign(user, dataUpdate);

        return out;
      }
    });

    await this.db.set(collctionName, listData).write();

    return out;
  }

  public async insert(record: any, collctionName: CollctionName): Promise<any> {
    const listData = await this.db.get(collctionName).value();
    record.id = uuid.v1();
    listData.push(record);
    await this.db.set(collctionName, listData).write();

    return record;
  }
}
