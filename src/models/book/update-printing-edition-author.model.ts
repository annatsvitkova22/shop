import { AuthorModel, UpdatePrintingEditionModel } from 'src/models';

export interface UpdatePrintingEditionWithAuthorModel {
    printingEdition?: UpdatePrintingEditionModel;
    authors?: AuthorModel[];
}
