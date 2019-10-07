import { Injectable } from '@nestjs/common';
import { PrintingEdition } from 'src/entity';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PrintingEditionService {

    constructor( @InjectRepository(PrintingEdition) private printingEditionRepository: Repository<PrintingEdition>) { }

    async getPrintingEditions(): Promise<PrintingEdition[]> {
        const getEdition = await this.printingEditionRepository.find();
        return getEdition;
    }

    async getPrintingEditionsById(id: number) {
        const editionId: UpdatePrintingEditionModel = {};
        editionId.id = id;
        const printingEdition = await this.printingEditionRepository.find({
            select: ['name', 'description', 'price', 'isRemoved', 'status', 'currency', 'type'],
            where: [{ id: editionId.id }],
        });
        return printingEdition;
    }

    async createPrintingEdition(createPrintingEdition: CreatePrintingEditionModel) {
        const getEdition: PrintingEdition = {} as PrintingEdition;
        getEdition.name = createPrintingEdition.name;
        getEdition.description = createPrintingEdition.description;
        getEdition.price = createPrintingEdition.price;
        getEdition.isRemoved = createPrintingEdition.isRemoved;
        getEdition.status = createPrintingEdition.status;
        getEdition.currency = createPrintingEdition.currency;
        getEdition.type = createPrintingEdition.type;
        const edition = await this.printingEditionRepository.save(getEdition);
        return(edition.id);
    }

    async updatePrintingEdition(updatePrintingEdition: UpdatePrintingEditionModel): Promise<PrintingEdition> {
        const getEdition: PrintingEdition = {} as PrintingEdition;
        getEdition.id = updatePrintingEdition.id;
        getEdition.name = updatePrintingEdition.name;
        getEdition.description = updatePrintingEdition.description;
        getEdition.price = updatePrintingEdition.price;
        getEdition.isRemoved = updatePrintingEdition.isRemoved;
        getEdition.status = updatePrintingEdition.status;
        getEdition.currency = updatePrintingEdition.currency;
        getEdition.type = updatePrintingEdition.type;
        const toUpdate = await this.printingEditionRepository.findOne(getEdition.id);
        delete toUpdate.name;
        delete toUpdate.description;
        delete toUpdate.price;
        delete toUpdate.isRemoved;
        delete toUpdate.status;
        delete toUpdate.currency;
        delete toUpdate.type;
        delete getEdition.id;
        const updated = Object.assign(toUpdate, getEdition);
        const edition = await this.printingEditionRepository.save(updated);
        return edition;
      }

    async deletePrintingEdition(printingEditionId: number) {
        const printingEdition: PrintingEdition = {} as PrintingEdition;
        printingEdition.id = printingEditionId;
        const result = this.printingEditionRepository.delete(printingEdition);
        return result;
    }
}
