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
        const result: string = await bcrypt.hash(password, randomSalt);

        return result;
    }

    public async compareHash(password: string, hash: string): Promise<boolean> {
        const result: boolean = await bcrypt.compare(password, hash);

        return result;
      }
}
