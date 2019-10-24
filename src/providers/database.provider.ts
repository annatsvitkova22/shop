import { Sequelize } from 'sequelize-typescript';
import { Author, AuthorInBooks, PrintingEdition, Payment, User, Role, UserInRoles, Order, OrderItem } from 'src/entity';
import { Enviroment, getEnv } from 'src/environment/environment';

const myEnvitonment: Enviroment = getEnv();

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: myEnvitonment.databaseHost,
                port: myEnvitonment.databasePort,
                username: myEnvitonment.databaseUsername,
                password: myEnvitonment.databasePassword,
                database: myEnvitonment.database,
            });
            sequelize.addModels([Author, AuthorInBooks, PrintingEdition, Payment, Role, User, UserInRoles, Order, OrderItem]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
