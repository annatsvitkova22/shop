import { UserInRoles } from 'src/entity';

export const userInRolesProviders = [
    {
        provide: 'UserInRolesRepository',
        useValue: UserInRoles,
    },
];
