import { Role } from 'src/entity';

export const rolesProviders = [
    {
        provide: 'RoleRepository',
        useValue: Role,
    },
];
