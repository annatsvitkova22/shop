import { ApiModelProperty } from '@nestjs/swagger';
import { UpdateAuthorModel, CreatePrintingEditionModel } from 'src/models';

export class CreatePrintingEditionWithAuthorModel {
    @ApiModelProperty()
    printingEdition: CreatePrintingEditionModel;
    @ApiModelProperty()
    authors: UpdateAuthorModel[];
}
