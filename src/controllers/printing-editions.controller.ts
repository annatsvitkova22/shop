import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { DeleteResult } from 'typeorm';

import { PrintingEditionService } from 'src/services';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel, PrintingEditionFilterModel } from 'src/models';
import { PrintingEdition } from 'src/entity';

@ApiUseTags('Printing editions table')
@Controller('printingEdition')
export class PrintingEditionsController {

    constructor(
        private printingEditionService: PrintingEditionService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search printing edition by id'})
    public get(@Param() params): Promise<PrintingEdition[]> {
        const printingEdition: Promise<PrintingEdition[]> = this.printingEditionService.getPrintingEditionsById(params.id);

        return printingEdition;
    }

    @Get()
    @ApiOperation({ title: 'Search all printing editions'})
    public getAll(): Promise<PrintingEdition[]> {
        const printingEdition: Promise<PrintingEdition[]> = this.printingEditionService.getPrintingEditions();

        return printingEdition;
    }

    @Post()
    @ApiOperation({ title: 'Create printing edition'})
    public create(@Body() printingEdition: CreatePrintingEditionModel): Promise<number> {
        const createEdition: Promise<number> = this.printingEditionService.createPrintingEdition(printingEdition);

        return createEdition;
    }

    @Post('filter')
    @ApiOperation({ title: 'Filter by name, status, price'})
    public filter(@Body() printingEdition: PrintingEditionFilterModel): Promise<PrintingEdition[]> {
        const filteredEdition = this.printingEditionService.printingEditionsFilter(printingEdition);

        return filteredEdition;
    }

    @Put()
    @ApiOperation({ title: 'Update printing edition by id'})
    public update(@Body() printingEdition: UpdatePrintingEditionModel): Promise<PrintingEdition> {
        const updateEdition: Promise<PrintingEdition> = this.printingEditionService.updatePrintingEdition(printingEdition);

        return updateEdition;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete printing edition by id'})
    public delete(@Param() params): Promise<DeleteResult> {
        const deleted: Promise<DeleteResult> = this.printingEditionService.deletePrintingEdition(params.id);

        return deleted;
    }
}
