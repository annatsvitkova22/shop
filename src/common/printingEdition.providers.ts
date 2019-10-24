import { PrintingEdition } from 'src/entity';

export const printingEditionsProviders = [
    {
        provide: 'PrintingEditionRepository',
        useValue: PrintingEdition,
    },
];
