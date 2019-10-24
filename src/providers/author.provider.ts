import { Author } from 'src/entity';

export const authorsProviders = [
    {
        provide: 'AuthorRepository',
        useValue: Author,
    },
];
