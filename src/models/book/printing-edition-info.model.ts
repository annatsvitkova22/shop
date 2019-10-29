import { ApiModelProperty } from '@nestjs/swagger';
import { PrintingEdition } from 'src/entity';

export class PrintingEditionInfoModel {
    @ApiModelProperty()
    printingEdition?: PrintingEdition[];
    @ApiModelProperty()
    message?: string;
}
