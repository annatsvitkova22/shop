import { Injectable } from '@nestjs/common';
import { PrintingEdition } from 'src/entity';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class PrintingEditionService {

    constructor( @InjectRepository(PrintingEdition) private printingEditionRepository: Repository<PrintingEdition>) { }

    public async getPrintingEditions(): Promise<PrintingEdition[]> {
        const getEditions = await this.printingEditionRepository.find();

        return getEditions;
    }

    public async getPrintingEditionsById(id: number): Promise<PrintingEdition[]> {
        const edition: UpdatePrintingEditionModel = {};
        edition.id = id;
        const foundPrintingEdition = await this.printingEditionRepository.find({
            select: ['name', 'description', 'price', 'isRemoved', 'status', 'currency', 'type'],
            where: [{ id: edition.id }],
        });

        return foundPrintingEdition;
    }

    public async createPrintingEdition(createPrintingEdition: CreatePrintingEditionModel): Promise<number> {
        const edition: PrintingEdition = {} as PrintingEdition;
        edition.name = createPrintingEdition.name;
        edition.description = createPrintingEdition.description;
        edition.price = createPrintingEdition.price;
        edition.isRemoved = createPrintingEdition.isRemoved;
        edition.status = createPrintingEdition.status;
        edition.currency = createPrintingEdition.currency;
        edition.type = createPrintingEdition.type;
        const savedEdition = await this.printingEditionRepository.save(edition);

        return(savedEdition.id);
    }

    public async updatePrintingEdition(updatePrintingEdition: UpdatePrintingEditionModel): Promise<PrintingEdition> {
        const edition: PrintingEdition = {} as PrintingEdition;
        edition.id = updatePrintingEdition.id;
        edition.name = updatePrintingEdition.name;
        edition.description = updatePrintingEdition.description;
        edition.price = updatePrintingEdition.price;
        edition.isRemoved = updatePrintingEdition.isRemoved;
        edition.status = updatePrintingEdition.status;
        edition.currency = updatePrintingEdition.currency;
        edition.type = updatePrintingEdition.type;

        const toUpdate = await this.printingEditionRepository.findOne(edition.id);
        toUpdate.name = edition.name;
        toUpdate.description = edition.description;
        toUpdate.price = edition.price;
        toUpdate.isRemoved = edition.isRemoved;
        toUpdate.status = edition.status;
        toUpdate.currency = edition.currency;
        toUpdate.type = edition.type;

        const savedEdition = await this.printingEditionRepository.save(toUpdate);

        return savedEdition;
      }

    public async deletePrintingEdition(printingEditionId: number): Promise<DeleteResult> {
        const printingEdition: PrintingEdition = {} as PrintingEdition;
        printingEdition.id = printingEditionId;
        const result = this.printingEditionRepository.delete(printingEdition);

        return result;
    }
}
