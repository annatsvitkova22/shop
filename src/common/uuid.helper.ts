import { Injectable } from '@nestjs/common';

@Injectable()
export class UuidHelper {
    public uuidv4(): string {
        const generateUuidv: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            const uuidv4: string = v.toString(16);

            return uuidv4;
        });

        return generateUuidv;
    }
}
