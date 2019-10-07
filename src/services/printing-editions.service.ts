import { Injectable } from '@nestjs/common';
import { PrintingEdition } from 'src/entity';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel } from 'src/models';
import { PrintingEditionRepository } from 'src/repositories/printing-edition.repository';

@Injectable()
export class PrintingEditionService {

    constructor( private printingEditionRepository: PrintingEditionRepository) { }

    async getPrintingEditions(): Promise<PrintingEdition[]> {
        const getEdition = await this.printingEditionRepository.getPrintinEditions();
        return getEdition;
    }

    async getPrintingEditionsById(id: number) {
        const EditionId: UpdatePrintingEditionModel = {};
        EditionId.id = id;
        const printingEdition = await this.printingEditionRepository.getPrintingEditionById(EditionId);
        return printingEdition;
    }

    async createPrintingEdition(createPrintingEdition: CreatePrintingEditionModel) {
        const getEdition: PrintingEdition = {};
        getEdition.name = createPrintingEdition.name;
        getEdition.description = createPrintingEdition.description;
        getEdition.price = createPrintingEdition.price;
        getEdition.isRemoved = createPrintingEdition.isRemoved;
        getEdition.status = createPrintingEdition.status;
        getEdition.currency = createPrintingEdition.currency;
        getEdition.type = createPrintingEdition.type;
        const edition = await this.printingEditionRepository.createPrintingEdition(getEdition);
        return(edition.id);
    }

    async updatePrintingEdition(updatePrintingEdition: UpdatePrintingEditionModel): Promise<PrintingEdition> {
        const getEdition: PrintingEdition = {};
        getEdition.id = updatePrintingEdition.id;
        getEdition.name = updatePrintingEdition.name;
        getEdition.description = updatePrintingEdition.description;
        getEdition.price = updatePrintingEdition.price;
        getEdition.isRemoved = updatePrintingEdition.isRemoved;
        getEdition.status = updatePrintingEdition.status;
        getEdition.currency = updatePrintingEdition.currency;
        getEdition.type = updatePrintingEdition.type;
        const toUpdate = await this.printingEditionRepository.getEditionById(getEdition);
        delete toUpdate.name;
        delete toUpdate.description;
        delete toUpdate.price;
        delete toUpdate.isRemoved;
        delete toUpdate.status;
        delete toUpdate.currency;
        delete toUpdate.type;
        delete getEdition.id;
        const updated = Object.assign(toUpdate, getEdition);
        const edition = await this.printingEditionRepository.createPrintingEdition(updated);
        return edition;
      }

    async deletePrintingEdition(printingEditionId: number) {
        const printingEdition: PrintingEdition = {};
        printingEdition.id = printingEditionId;
        const result = this.printingEditionRepository.deletePrintingEdition(printingEdition);
        return result;
    }
}
