import { Controller, Post, Body, Get, Put, Delete, Param, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { PrintingEditionService } from 'src/services';
import {
    CreatePrintingEditionWithAuthorModel, UpdatePrintingEditionWithAuthorModel, PrintingEditionInfoModel,
    PrintingEditionFilterModel, CreatePrintingEditionModel,
} from 'src/models';
import { PrintingEdition } from 'src/entity';

@ApiUseTags('Printing edition')
@Controller('printingEdition')
export class PrintingEditionsController {

    constructor(private printingEditionService: PrintingEditionService) { }

    @Get('all/:limit/:offset')
    @ApiOperation({ title: 'Search all printing editions by limit and offset for pagination' })
    public async getAll(@Param('limit') limit: number, @Param('offset') offset: number): Promise<PrintingEdition[]> {
        const printingEdition: PrintingEdition[] = await this.printingEditionService.getPrintingEditions(limit, offset);

        return printingEdition;
    }

    @Get('countByIsRemoved')
    @ApiOperation({ title: 'Get count all printing editions' })
    public async getCountByIsRemoved(): Promise<number> {
        const countPrintingEdition: number = await this.printingEditionService.getCountPrintingEditionByIsRemoved();

        return countPrintingEdition;
    }

    @Get('count')
    @ApiOperation({ title: 'Get count all printing editions' })
    public async getCount(): Promise<number> {
        const countPrintingEdition: number = await this.printingEditionService.getCountPrintingEdition();

        return countPrintingEdition;
    }

    @Get('isRemoved/:limit/:offset')
    @ApiOperation({ title: 'Search all printing editions by IsRemoved and by limit and offset for pagination' })
    public async getAllByIsRemoved(@Param('limit') limit: number, @Param('offset') offset: number): Promise<PrintingEdition[]> {
        const printingEdition: PrintingEdition[] = await this.printingEditionService.getPrintingEditionsByIsRemoved(limit, offset);

        return printingEdition;
    }

    @Get('author/:id')
    @ApiOperation({ title: 'Search all printing editions by IsRemoved' })
    public async getByIdWithAuthor(@Param() params): Promise<UpdatePrintingEditionWithAuthorModel> {
        const printingEdition: UpdatePrintingEditionWithAuthorModel = await this.printingEditionService.getPrintingEditionByIdWithAuthor(params.id);

        return printingEdition;
    }

    @Get('id/:id')
    @ApiOperation({ title: 'Search printing edition by id' })
    public async getById(@Param() params): Promise<PrintingEdition> {
        const printingEdition: PrintingEdition = await this.printingEditionService.getPrintingEditionById(params.id);

        return printingEdition;
    }

    @Get('filter')
    @ApiOperation({ title: 'Filter by name, status, price' })
    public async filter(@Query() params: PrintingEditionFilterModel): Promise<PrintingEdition[]> {
        const filteredEdition: PrintingEdition[] = await this.printingEditionService.getFiltered(params);

        return filteredEdition;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @Roles('admin')
    @ApiOperation({ title: 'Create printing edition' })
    public async create(@Body() createEdition: CreatePrintingEditionWithAuthorModel): Promise<PrintingEdition> {
        const edition: PrintingEdition = await this.printingEditionService.createPrintingEdition(createEdition);

        return edition;
    }

    @Post('file')
    @UseInterceptors(FileInterceptor('image'))
    public async uploadedFile(@UploadedFile() file, @Body() createBook: CreatePrintingEditionModel): Promise<PrintingEdition> {
        const edition: PrintingEdition = await this.printingEditionService.createPrintingEditionn(createBook, file);

        return edition;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @Roles('admin')
    @ApiOperation({ title: 'Update printing edition by id' })
    public async update(@Body() updateEdition: UpdatePrintingEditionWithAuthorModel): Promise<PrintingEdition> {
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
