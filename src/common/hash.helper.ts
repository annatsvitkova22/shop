import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashHelper {
    public saltRounds = 10;

    public async getRandomSalt(): Promise<string> {
        const randomSalt: string = await bcrypt.genSalt(this.saltRounds);

        return randomSalt;
    }

    public async getHash(password: string, randomSalt: string): Promise<string> {
        const result = bcrypt.hash(password, randomSalt);

        return result;
    }

    public async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
        const result = bcrypt.compare(password, hash);

        return result;
      }
}
