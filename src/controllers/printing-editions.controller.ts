import { Controller, Post, Body, Get, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common';
import { AuthGuard } from '@nestjs/passport';

import { PrintingEditionService } from 'src/services';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel, PrintingEditionInfoModel, PrintingEditionFilterModel } from 'src/models';
import { PrintingEdition } from 'src/entity';
import { PrintingEditionWithAuthorModel } from 'src/models/book/printing-edition-author.model';

@ApiUseTags('Printing edition')
@Controller('printingEdition')
export class PrintingEditionsController {

    constructor(private printingEditionService: PrintingEditionService) { }

    @Get('all')
    @ApiOperation({ title: 'Search all printing editions' })
    public async getAll(): Promise<PrintingEdition[]> {
        const printingEdition: PrintingEdition[] = await this.printingEditionService.getPrintingEditions();

        return printingEdition;
    }

    @Get('isRemoved')
    @ApiOperation({ title: 'Search all printing editions by IsRemoved' })
    public async getAllByIsRemoved(): Promise<PrintingEdition[]> {
        const printingEdition: PrintingEdition[] = await this.printingEditionService.getPrintingEditionsByIsRemoved();

        return printingEdition;
    }

    @Get('author/:id')
    @ApiOperation({ title: 'Search all printing editions by IsRemoved' })
    public async getByIdWithAuthor(@Param() params): Promise<PrintingEditionWithAuthorModel> {
        const printingEdition: PrintingEditionWithAuthorModel = await this.printingEditionService.getPrintingEditionByIdWithAuthor(params.id);

        return printingEdition;
    }

    @Get('id/:id')
    @ApiOperation({ title: 'Search printing edition by id' })
    public async getById(@Param() params): Promise<PrintingEdition> {
        const printingEdition: PrintingEdition = await this.printingEditionService.getPrintingEditionById(params.id);

        return printingEdition;
    }

    @Get('pagination/:limit/:offset')
    @ApiOperation({ title: 'Search printing edition by take and skip for pagination' })
    public async getPaging(@Param('limit') limit: number, @Param('offset') offset: number): Promise<PrintingEditionInfoModel> {
        const printingEdition: PrintingEditionInfoModel = await this.printingEditionService.getPaging(limit, offset);

        return printingEdition;
    }

    @Get('filter')
    @ApiOperation({ title: 'Filter by name, status, price' })
    // tslint:disable-next-line: max-line-length
    public async filter(@Query() params: PrintingEditionFilterModel): Promise<PrintingEdition[]> {
        const filteredEdition: PrintingEdition[] = await this.printingEditionService.getFiltered(params);

        return filteredEdition;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @Roles('admin')
    @ApiOperation({ title: 'Create printing edition' })
    public async create(@Body() createEdition: CreatePrintingEditionModel): Promise<PrintingEdition> {
        const edition: PrintingEdition = await this.printingEditionService.createPrintingEdition(createEdition);

        return edition;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @Roles('admin')
    @ApiOperation({ title: 'Update printing edition by id' })
    public async update(@Body() updateEdition: PrintingEditionWithAuthorModel): Promise<PrintingEdition> {
        const edition: PrintingEdition = await this.printingEditionService.updatePrintingEdition(updateEdition);

        return edition;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @Roles('admin')
    @ApiOperation({ title: 'Delete printing edition by id' })
    public async remove(@Param() params): Promise<PrintingEdition> {
        const removed: PrintingEdition = await this.printingEditionService.removePrintingEdition(params.id);

        return removed;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('admin')
    @ApiOperation({ title: 'Delete printing edition by id' })
    public async delete(@Param() params): Promise<number> {
        const deleted: number = await this.printingEditionService.deletePrintingEdition(params.id);

        return deleted;
    }
}
