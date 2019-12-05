import { Controller, Post, Body, Get, Put, Delete, Param, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common';
import { AuthGuard } from '@nestjs/passport';

import { PrintingEditionService } from 'src/services';
import {
    CreatePrintingEditionWithAuthorModel, UpdatePrintingEditionWithAuthorModel, PrintingEditionInfoModel,
    PrintingEditionFilterModel,
    CreatePrintingEditionModel
} from 'src/models';
import { PrintingEdition } from 'src/entity';

import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};

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

    @Get('pagination/:limit/:offset')
    @ApiOperation({ title: 'Search printing edition by take and skip for pagination' })
    public async getPaging(@Param('limit') limit: number, @Param('offset') offset: number): Promise<PrintingEditionInfoModel> {
        const printingEdition: PrintingEditionInfoModel = await this.printingEditionService.getPaging(limit, offset);

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
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: 'src/image',
                filename: editFileName,
            }),
        }),
    )
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
