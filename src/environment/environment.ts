import { environmentDev } from 'src/environment/environment.dev'
import { environmentProd } from 'src/environment/environment.prod'

export interface Env {
    production?: boolean,
    name?: string,
    secret: string,
    refreshTokenSecret: string,
    port: number,
    tokenLife: number,
    refreshTokenLife: number,
}

export const getEnv = (): Env => {
    let environment: Env;
    environment = environmentDev;

    if (process.env.NODE_ENV == 'production') {
        environment = environmentProd;
    }
    return environment;
}
