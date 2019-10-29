import { Controller, Post, Body, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { PrintingEditionService } from 'src/services';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel, PrintingEditionInfoModel, PrintingEditionFilterModel } from 'src/models';
import { PrintingEdition } from 'src/entity';

@ApiUseTags('Printing edition')
@Controller('printingEdition')
export class PrintingEditionsController {

    constructor(private printingEditionService: PrintingEditionService) { }

    @Get('id/:id')
    @ApiOperation({ title: 'Search printing edition by id' })
    public async get(@Param() params): Promise<PrintingEdition> {
        const printingEdition: PrintingEdition = await this.printingEditionService.getPrintingEditionsById(params.id);

        return printingEdition;
    }

    @Get('pagination/:limit/:offset')
    @ApiOperation({ title: 'Search printing edition by take and skip for pagination' })
    public async getPaging(@Param('limit') limit: number, @Param('offset') offset: number): Promise<PrintingEditionInfoModel> {
        const printingEdition: PrintingEditionInfoModel = await this.printingEditionService.getPaging(limit, offset);

        return printingEdition;
    }

    @Get('all')
    @ApiOperation({ title: 'Search all printing editions' })
    public async getAll(): Promise<PrintingEdition[]> {
        const printingEdition: PrintingEdition[] = await this.printingEditionService.getPrintingEditions();

        return printingEdition;
    }

    @Get('filter')
    @ApiOperation({ title: 'Filter by name, status, price' })
    // tslint:disable-next-line: max-line-length
    public async filter(@Query() params: PrintingEditionFilterModel) {
        const filteredEdition = await this.printingEditionService.getFiltered(params);

        return filteredEdition;
    }

    @Post()
    @ApiOperation({ title: 'Create printing edition' })
    public async create(@Body() printingEdition: CreatePrintingEditionModel): Promise<PrintingEdition> {
        const createEdition: PrintingEdition = await this.printingEditionService.createPrintingEdition(printingEdition);

        return createEdition;
    }

    @Put()
    @ApiOperation({ title: 'Update printing edition by id' })
    public update(@Body() printingEdition: UpdatePrintingEditionModel): Promise<PrintingEdition> {
        const updateEdition: Promise<PrintingEdition> = this.printingEditionService.updatePrintingEdition(printingEdition);

        return updateEdition;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete printing edition by id' })
    public async delete(@Param() params): Promise<number> {
        const deleted: number = await this.printingEditionService.deletePrintingEdition(params.id);

        return deleted;
    }
}
