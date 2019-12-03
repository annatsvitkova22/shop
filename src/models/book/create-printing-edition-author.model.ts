import { AuthorModel, CreatePrintingEditionModel } from 'src/models';

export interface CreatePrintingEditionWithAuthorModel {
    printingEdition?: CreatePrintingEditionModel;
    authors?: AuthorModel[];
}
