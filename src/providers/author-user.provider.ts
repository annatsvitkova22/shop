import { AuthorInBooks } from 'src/entity';

export const authorInBooksProviders = [
    {
        provide: 'AuthorInBooksRepository',
        useValue: AuthorInBooks,
    },
];
