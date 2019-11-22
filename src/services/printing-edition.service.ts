import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { PrintingEdition } from 'src/entity';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel, PrintingEditionFilterModel, PrintingEditionInfoModel } from 'src/models';
import { UuidHelper } from 'src/common';
import { PrintingEditionRepository } from 'src/repositories';

@Injectable()
export class PrintingEditionService {

    constructor(
        private readonly printingEditionRepository: PrintingEditionRepository,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
    ) { }

    public async getPrintingEditions(): Promise<PrintingEdition[]> {
        const getEditions: PrintingEdition[] = await this.printingEditionRepository.getPrintingEditions();

        return getEditions;
    }

    public async getPrintingEditionsById(id: string): Promise<PrintingEdition> {
        const foundPrintingEdition: PrintingEdition = await this.printingEditionRepository.getPrintingEditionrById(id);

        return foundPrintingEdition;
    }

    public async getFiltered(params: PrintingEditionFilterModel): Promise<PrintingEdition[]> {
        const printingEdition: PrintingEditionFilterModel = new PrintingEditionFilterModel();
        printingEdition.name = params.name;
        printingEdition.status = params.status;
        printingEdition.priceMin = params.priceMin;
        printingEdition.priceMax = params.priceMax;

        let query: string = 'SELECT `id`, `name`, `description`, `price`, `isRemoved`, `status`, `currency`, `type` FROM `PrintingEditions` WHERE';

        if (printingEdition.name && (printingEdition.priceMax || printingEdition.priceMin || printingEdition.status)) {
            query += ' `name` = \'' + printingEdition.name + '\' AND';
        }
        if (!printingEdition.priceMax && !printingEdition.priceMin && !printingEdition.status && printingEdition.name) {
            query += ' `name` = \'' + printingEdition.name + '\'';
        }
        if (printingEdition.status && (printingEdition.priceMax || printingEdition.priceMin)) {
            query += ' `status` = \'' + printingEdition.status + '\' AND';
        }
        if (!printingEdition.priceMax && !printingEdition.priceMin && printingEdition.status) {
            query += ' `status` = \'' + printingEdition.status + '\'';
        }
        if (printingEdition.priceMin && printingEdition.priceMax) {
            query += ' `price` > ' + printingEdition.priceMin + ' AND';
        }
        if (printingEdition.priceMin && !printingEdition.priceMax) {
            query += ' `price` > ' + printingEdition.priceMin;
        }
        if (printingEdition.priceMax) {
            query += ' `price` < ' + printingEdition.priceMax;
        }

        const foundPrintingEdition: PrintingEdition[] = await this.printingEditionRepository.getFiltrationPrintingEdition(query);

        return foundPrintingEdition;
    }

    public async getPaging(take: number, skip: number): Promise<PrintingEditionInfoModel> {
        if (isNaN(+take) || isNaN(+skip)) {
            const error: PrintingEditionInfoModel = new PrintingEditionInfoModel();
            error.message = 'You entered incorrect data, please enter take, skip (numbers)';

            return error;
        }

        const printingEditions: PrintingEdition[] = await this.printingEditionRepository.getPaginationPrintingEdition(take, skip);
        const printingEditionModel: PrintingEditionInfoModel = new PrintingEditionInfoModel();
        printingEditionModel.printingEdition = printingEditions;

        return printingEditionModel;
    }

    public async createPrintingEdition(createPrintingEdition: CreatePrintingEditionModel): Promise<PrintingEdition> {
        const edition: PrintingEdition = new PrintingEdition();
        edition.name = createPrintingEdition.name;
        edition.description = createPrintingEdition.description;
        edition.price = createPrintingEdition.price;
        edition.status = createPrintingEdition.status;
        edition.currency = createPrintingEdition.currency;
        edition.type = createPrintingEdition.type;
        edition.id = this.uuidHelper.uuidv4();

        const savedEdition: PrintingEdition = await this.printingEditionRepository.createPrintingEdition(edition);

        return savedEdition;
    }

    public async updatePrintingEdition(updatePrintingEdition: UpdatePrintingEditionModel): Promise<PrintingEdition> {
        const edition: UpdatePrintingEditionModel = new UpdatePrintingEditionModel();
        edition.id = updatePrintingEdition.id;
        edition.name = updatePrintingEdition.name;
        edition.description = updatePrintingEdition.description;
        edition.price = updatePrintingEdition.price;
        edition.isRemoved = updatePrintingEdition.isRemoved;
        edition.status = updatePrintingEdition.status;
        edition.currency = updatePrintingEdition.currency;
        edition.type = updatePrintingEdition.type;

        const toUpdate: PrintingEdition = await this.printingEditionRepository.getPrintingEditionrById(edition.id);
        toUpdate.name = edition.name;
        toUpdate.description = edition.description;
        toUpdate.price = edition.price;
        toUpdate.isRemoved = edition.isRemoved;
        toUpdate.status = edition.status;
        toUpdate.currency = edition.currency;
        toUpdate.type = edition.type;

        const savedEdition: PrintingEdition = await this.printingEditionRepository.createPrintingEdition(toUpdate);

        return savedEdition;
    }

    public async removePrintingEdition(printingEditionId: string): Promise<PrintingEdition> {
        const removed: PrintingEdition = await this.printingEditionRepository.getPrintingEditionrById(printingEditionId);
        removed.isRemoved = true;

        const removedEdition: PrintingEdition = await this.printingEditionRepository.createPrintingEdition(removed);

        return removedEdition;
    }

    public async deletePrintingEdition(printingEditionId: string): Promise<number> {
        const result: number = await this.printingEditionRepository.deletePrintingEdition(printingEditionId);

        return result;
    }
}
