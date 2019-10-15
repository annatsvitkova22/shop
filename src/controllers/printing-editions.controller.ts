import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { PrintingEditionService } from 'src/services';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel } from 'src/models';

@ApiUseTags('Printing editions table')
@Controller('printingEdition')
export class PrintingEditionsController {

    constructor(
        private printingEditionService: PrintingEditionService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search printing edition by id'})
    get(@Param() params) {
        const printingEdition = this.printingEditionService.getPrintingEditionsById(params.id);

        return printingEdition;
    }

    @Get()
    @ApiOperation({ title: 'Search all printing editions'})
    getAll() {
        const printingEdition = this.printingEditionService.getPrintingEditions();

        return printingEdition;
    }

    @Post()
    @ApiOperation({ title: 'Create printing edition'})
    create(@Body() printingEdition: CreatePrintingEditionModel) {
        const createEdition = this.printingEditionService.createPrintingEdition(printingEdition);

        return createEdition;
    }

    @Put()
    @ApiOperation({ title: 'Update printing edition by id'})
    update(@Body() printingEdition: UpdatePrintingEditionModel) {
        const updateEdition = this.printingEditionService.updatePrintingEdition(printingEdition);

        return updateEdition;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete printing edition by id'})
    delete(@Param() params) {

        return this.printingEditionService.deletePrintingEdition(params.id);
    }
}
