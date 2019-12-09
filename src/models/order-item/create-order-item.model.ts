import { ApiModelProperty } from '@nestjs/swagger';
import { PrintingEditionCartModel } from 'src/models/book/printing-edition-cart.model';

export class CreateOrderItemModel {
    @ApiModelProperty()
    printingEdition: PrintingEditionCartModel[];
    @ApiModelProperty()
    orderId: string;
}
