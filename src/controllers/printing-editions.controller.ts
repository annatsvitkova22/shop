import { Controller, Post, Body, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { PrintingEditionService } from 'src/services';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel, PrintingEditionFilterModel } from 'src/models';
import { PrintingEdition } from 'src/entity';

@ApiUseTags('Printing edition')
@Controller('printingEdition')
export class PrintingEditionsController {

    constructor(private printingEditionService: PrintingEditionService) { }

    @Get('id/:id')
    @ApiOperation({ title: 'Search printing edition by id' })
    public get(id: string) {
        const printingEdition: Promise<PrintingEdition> = this.printingEditionService.getPrintingEditionsById(id);

        return printingEdition;
    }

    @Get('pagination')
    @ApiOperation({ title: 'Search printing edition by take and skip for pagination' })
    public getPaging(@Query('take') take: number, @Query('skip') skip: number): Promise<PrintingEdition[]> {
        const printingEdition: Promise<PrintingEdition[]> = this.printingEditionService.getPaging(take, skip);

        return printingEdition;
    }

    @Get('all')
    @ApiOperation({ title: 'Search all printing editions' })
    public getAll(): Promise<PrintingEdition[]> {
        const printingEdition: Promise<PrintingEdition[]> = this.printingEditionService.getPrintingEditions();

        return printingEdition;
    }

    @Post()
    @ApiOperation({ title: 'Create printing edition' })
    public create(@Body() printingEdition: CreatePrintingEditionModel): Promise<string> {
        const createEdition: Promise<string> = this.printingEditionService.createPrintingEdition(printingEdition);

        return createEdition;
    }

    @Post('filter')
    @ApiOperation({ title: 'Filter by name, status, price' })
    public filter(@Body() printingEdition: PrintingEditionFilterModel): Promise<PrintingEdition[]> {
        const filteredEdition = this.printingEditionService.getFiltered(printingEdition);

        return filteredEdition;
    }

    @Put()
    @ApiOperation({ title: 'Update printing edition by id' })
    public update(@Body() printingEdition: UpdatePrintingEditionModel): Promise<PrintingEdition> {
        const updateEdition: Promise<PrintingEdition> = this.printingEditionService.updatePrintingEdition(printingEdition);

        return updateEdition;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete printing edition by id' })
    public delete(@Param() params): Promise<boolean | string> {
        const deleted: Promise<boolean | string> = this.printingEditionService.deletePrintingEdition(params.id);

        return deleted;
    }
}
