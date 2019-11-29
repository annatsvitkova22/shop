import { ApiModelProperty } from '@nestjs/swagger';
import { UpdateAuthorModel, UpdatePrintingEditionModel } from 'src/models';

export class UpdatePrintingEditionWithAuthorModel {
    @ApiModelProperty()
    printingEdition: UpdatePrintingEditionModel;
    @ApiModelProperty()
    authors: UpdateAuthorModel[];
}
