import { Controller, Post, Body, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { PrintingEditionService } from 'src/services';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel, PrintingEditionFilterModel } from 'src/models';
import { PrintingEdition } from 'src/entity';

@ApiUseTags('Printing edition')
@Controller('printingEdition')
export class PrintingEditionsController {

    constructor(private printingEditionService: PrintingEditionService) { }

    @Get(':id')
    @ApiOperation({ title: 'Search printing edition by id' })
    public async get(@Param() params): Promise<PrintingEdition> {
        const printingEdition: PrintingEdition = await this.printingEditionService.getPrintingEditionsById(params.id);

        return printingEdition;
    }

    // @Get('pagination')
    // @ApiOperation({ title: 'Search printing edition by take and skip for pagination' })
    // public getPaging(@Query('take') take: number, @Query('skip') skip: number): Promise<PrintingEdition[]> {
    //     const printingEdition: Promise<PrintingEdition[]> = this.printingEditionService.getPaging(take, skip);

    //     return printingEdition;
    // }

    @Get()
    @ApiOperation({ title: 'Search all printing editions' })
    public async getAll(): Promise<PrintingEdition[]> {
        const printingEdition: PrintingEdition[] = await this.printingEditionService.getPrintingEditions();

        return printingEdition;
    }

    @Post()
    @ApiOperation({ title: 'Create printing edition' })
    public async create(@Body() printingEdition: CreatePrintingEditionModel): Promise<string> {
        const createEdition: string = await this.printingEditionService.createPrintingEdition(printingEdition);

        return createEdition;
    }

    // @Post('filter')
    // @ApiOperation({ title: 'Filter by name, status, price' })
    // public filter(@Body() printingEdition: PrintingEditionFilterModel): Promise<PrintingEdition[]> {
    //     const filteredEdition = this.printingEditionService.getFiltered(printingEdition);

    //     return filteredEdition;
    // }

    // @Put()
    // @ApiOperation({ title: 'Update printing edition by id' })
    // public update(@Body() printingEdition: UpdatePrintingEditionModel): Promise<PrintingEdition> {
    //     const updateEdition: Promise<PrintingEdition> = this.printingEditionService.updatePrintingEdition(printingEdition);

    //     return updateEdition;
    // }

    @Delete(':id')
    @ApiOperation({ title: 'Delete printing edition by id' })
    public async delete(@Param() params): Promise<number> {
        const deleted: number = await this.printingEditionService.deletePrintingEdition(params.id);

        return deleted;
    }
}
