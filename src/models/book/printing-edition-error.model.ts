import { ApiModelProperty } from '@nestjs/swagger';
import { PrintingEdition } from 'src/entity';

export class PrintingEditionErrorModel {
    @ApiModelProperty()
    printingEdition?: PrintingEdition[];
    @ApiModelProperty()
    message?: string;
}
