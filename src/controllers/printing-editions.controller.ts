import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { PrintingEditionService } from 'src/services/printing-editions.service';
import { PrintingEdition } from 'src/entity/printing-edition.entity';
import { CreatePrintingEditionModel } from 'src/models/create-printing-edition.model';
import { UpdatePrintingEditionModel } from 'src/models/update-priting-edition.model';

@Controller('printingEdition')
export class PrintingEditionsController {

    constructor(
        private printingEditionService: PrintingEditionService,
        ) { }

    @Get(':id')
    get(@Param() params) {
        const printingEdition = this.printingEditionService.getPrintingEditionsById(params.id);
        return printingEdition;
    }

    @Get()
    getAll() {
    const printingEdition = this.printingEditionService.getPrintingEditions();
    return printingEdition;
  }

    @Post()
    create(@Body() printingEdition: CreatePrintingEditionModel) {
        const createEdition = this.printingEditionService.createPrintingEdition(printingEdition);
        return createEdition;
    }

    @Put()
    update(@Body() printingEdition: UpdatePrintingEditionModel) {
        const updateEdition = this.printingEditionService.updatePrintingEdition(printingEdition);
        return updateEdition;
    }

    @Delete(':id')
    delete(@Param() params) {
        return this.printingEditionService.deletePrintingEdition(params.id);
    }
}
