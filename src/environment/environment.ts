import { environmentDev } from 'src/environment/environment.dev'
import { environmentProd } from 'src/environment/environment.prod'

export class Enviroment {
    production?: boolean;
    name?: string;
    tokenSecret: string;
    port: number;
    tokenLife: number;
    refreshTokenLife: number;
}

export const getEnv = (): Enviroment => {
    let environment: Enviroment;
    environment = environmentDev;

    if (process.env.NODE_ENV == 'production') {
        environment = environmentProd;
    }
    return environment;
}
