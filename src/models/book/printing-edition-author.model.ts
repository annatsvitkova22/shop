import { ApiModelProperty } from '@nestjs/swagger';
import { PrintingEdition, Author } from 'src/entity';

export class PrintingEditionWithAuthorModel {
    @ApiModelProperty()
    printingEdition: PrintingEdition;
    @ApiModelProperty()
    authors: Author[];
}
