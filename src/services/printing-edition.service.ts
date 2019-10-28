import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { PrintingEdition } from 'src/entity';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel, PrintingEditionFilterModel, PrintingEditionErrorModel } from 'src/models';
import { UuidHelper } from 'src/common';

@Injectable()
export class PrintingEditionService {

    constructor(
        @Inject('PrintingEditionRepository') private readonly printingEditionRepository: typeof PrintingEdition,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
    ) { }

    public async getPrintingEditions(): Promise<PrintingEdition[]> {
        const getEditions: PrintingEdition[] = await this.printingEditionRepository.findAll<PrintingEdition>();

        return getEditions;
    }

    public async getPrintingEditionsById(id: string): Promise<PrintingEdition> {
        const edition = new UpdatePrintingEditionModel();
        edition.id = id;

        const foundPrintingEdition: PrintingEdition = await this.printingEditionRepository.findOne({
            where: { id: edition.id },
        });

        return foundPrintingEdition;
    }

    public async getFiltered(name: string, status: string, priceMin: number, priceMax: number) {
        const printingEdition = new PrintingEditionFilterModel();
        printingEdition.name = name;
        printingEdition.status = status;
        printingEdition.priceMin = priceMin;
        printingEdition.priceMax = priceMax;

        // tslint:disable-next-line: max-line-length
        let query: string = 'SELECT `id`, `name`, `description`, `price`, `isRemoved`, `status`, `currency`, `type` FROM `PrintingEditions` AS `PrintingEdition` WHERE';

        if (printingEdition.name && (printingEdition.priceMax || printingEdition.priceMin || printingEdition.status)) {
            query += ' `PrintingEdition`.`name` = \'' + printingEdition.name + '\' AND';
        }
        if (!printingEdition.priceMax && !printingEdition.priceMin && !printingEdition.status && printingEdition.name) {
            query += ' `PrintingEdition`.`name` = \'' + printingEdition.name + '\'';
        }
        if (printingEdition.status && (printingEdition.priceMax || printingEdition.priceMin)) {
            query += ' `PrintingEdition`.`status` = \'' + printingEdition.status + '\' AND';
        }
        if (!printingEdition.priceMax && !printingEdition.priceMin && printingEdition.status) {
            query += ' `PrintingEdition`.`status` = \'' + printingEdition.status + '\'';
        }
        if (printingEdition.priceMin && printingEdition.priceMax) {
            query += ' `PrintingEdition`.`price` > ' + printingEdition.priceMin + ' AND';
        }
        if (printingEdition.priceMin && !printingEdition.priceMax) {
            query += ' `PrintingEdition`.`price` > ' + printingEdition.priceMin;
        }
        if (printingEdition.priceMax) {
            query += ' `PrintingEdition`.`price` < ' + printingEdition.priceMax;
        }

        const foundPrintingEdition = await this.printingEditionRepository.sequelize.query(query);

        return foundPrintingEdition;
    }

    public async getPaging(take: number, skip: number): Promise<PrintingEditionErrorModel> {
        if (isNaN(+take) || isNaN(+skip)) {
            const error = new PrintingEditionErrorModel();
            error.message = 'You entered incorrect data, please enter take, skip (numbers)';

            return error;
        }

        const printingEditions: PrintingEdition[] = await PrintingEdition.findAll({
            limit: +take,
            offset: +skip,
        });
        const printingEditionModel = new PrintingEditionErrorModel();
        printingEditionModel.printingEdition = printingEditions;

        return printingEditionModel;
    }

    public async createPrintingEdition(createPrintingEdition: CreatePrintingEditionModel): Promise<PrintingEdition> {
        const edition = new PrintingEdition();
        edition.name = createPrintingEdition.name;
        edition.description = createPrintingEdition.description;
        edition.price = createPrintingEdition.price;
        edition.status = createPrintingEdition.status;
        edition.currency = createPrintingEdition.currency;
        edition.type = createPrintingEdition.type;
        edition.id = this.uuidHelper.uuidv4();

        const savedEdition: PrintingEdition = await edition.save();

        return savedEdition;
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

        const toUpdate: PrintingEdition = await this.getPrintingEditionsById(edition.id);
        toUpdate.name = edition.name;
        toUpdate.description = edition.description;
        toUpdate.price = edition.price;
        toUpdate.isRemoved = edition.isRemoved;
        toUpdate.status = edition.status;
        toUpdate.currency = edition.currency;
        toUpdate.type = edition.type;

        const savedEdition: PrintingEdition = await toUpdate.save();

        return savedEdition;
    }

    public async deletePrintingEdition(printingEditionId: string): Promise<number> {
        const result: number = await this.printingEditionRepository.destroy({
            where: { id: printingEditionId },
        });

        return result;
    }
}
