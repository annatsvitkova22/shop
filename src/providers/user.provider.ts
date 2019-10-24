import { User } from 'src/entity';

export const usersProviders = [
    {
        provide: 'UserRepository',
        useValue: User,
    },
];
