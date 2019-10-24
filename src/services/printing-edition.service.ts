import { Injectable, Inject } from '@nestjs/common';

import { PrintingEdition } from 'src/entity';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel, PrintingEditionFilterModel } from 'src/models';

@Injectable()
export class PrintingEditionService {

    constructor(@Inject('PrintingEditionRepository') private readonly printingEditionRepository: typeof PrintingEdition,
    ) { }

    public async getPrintingEditions(): Promise<PrintingEdition[]> {
        const getEditions: PrintingEdition[] = await this.printingEditionRepository.findAll<PrintingEdition>();

        return getEditions;
    }

    public async getPrintingEditionsById(id: string): Promise<PrintingEdition> {
        const edition = new UpdatePrintingEditionModel();
        edition.id = id;

        const foundPrintingEdition: PrintingEdition = await this.printingEditionRepository.findOne({
            where: {id: edition.id},
          });

        return foundPrintingEdition;
    }

    // public async getFiltered(printingEdition: PrintingEditionFilterModel): Promise<PrintingEdition[]> {
    //     let query: string = 'SELECT * FROM printing_edition WHERE';

    //     if (printingEdition.name && (printingEdition.priceMax || printingEdition.priceMin || printingEdition.status)) {
    //         query += ' name = \'' + printingEdition.name + '\' AND';
    //     }
    //     if (!printingEdition.priceMax && !printingEdition.priceMin && !printingEdition.status && printingEdition.name) {
    //         query += ' name = \'' + printingEdition.name + '\'';
    //     }
    //     if ( printingEdition.status  && (printingEdition.priceMax || printingEdition.priceMin)) {
    //         query += ' status = \'' + printingEdition.status + '\' AND';
    //     }
    //     if (!printingEdition.priceMax && !printingEdition.priceMin && printingEdition.status ) {
    //         query += ' status = \'' + printingEdition.status + '\'';
    //     }
    //     if (printingEdition.priceMin && printingEdition.priceMax ) {
    //         query += ' price > ' + printingEdition.priceMin + ' AND';
    //     }
    //     if (printingEdition.priceMin && !printingEdition.priceMax ) {
    //         query += ' price > ' + printingEdition.priceMin ;
    //     }
    //     if (printingEdition.priceMax ) {
    //         query += ' price < ' + printingEdition.priceMax ;
    //     }

    //     const foundPrintingEdition: Promise<PrintingEdition[]> = await this.printingEditionRepository.query(query);

    //     return foundPrintingEdition;
    // }

    // public async getPaging(take: number, skip: number) {
    //     const printingEditions = await this.printingEditionRepository.find({
    //         take,
    //         skip,
    //     });

    //     return printingEditions;
    // }

    public async createPrintingEdition(createPrintingEdition: CreatePrintingEditionModel): Promise<string> {
        const edition = new PrintingEdition();
        edition.name = createPrintingEdition.name;
        edition.description = createPrintingEdition.description;
        edition.price = createPrintingEdition.price;
        edition.isRemoved = createPrintingEdition.isRemoved;
        edition.status = createPrintingEdition.status;
        edition.currency = createPrintingEdition.currency;
        edition.type = createPrintingEdition.type;
        console.log(createPrintingEdition);
        console.log(edition);
        const savedEdition: PrintingEdition = await this.printingEditionRepository.create<PrintingEdition>(edition);

        return (savedEdition.id);
    }

    // public async updatePrintingEdition(updatePrintingEdition: UpdatePrintingEditionModel): Promise<PrintingEdition> {
    //     const edition: PrintingEdition = {} as PrintingEdition;
    //     edition.id = updatePrintingEdition.id;
    //     edition.name = updatePrintingEdition.name;
    //     edition.description = updatePrintingEdition.description;
    //     edition.price = updatePrintingEdition.price;
    //     edition.isRemoved = updatePrintingEdition.isRemoved;
    //     edition.status = updatePrintingEdition.status;
    //     edition.currency = updatePrintingEdition.currency;
    //     edition.type = updatePrintingEdition.type;

    //     const toUpdate: PrintingEdition = await this.printingEditionRepository.findOne(edition.id);
    //     toUpdate.name = edition.name;
    //     toUpdate.description = edition.description;
    //     toUpdate.price = edition.price;
    //     toUpdate.isRemoved = edition.isRemoved;
    //     toUpdate.status = edition.status;
    //     toUpdate.currency = edition.currency;
    //     toUpdate.type = edition.type;

    //     const savedEdition: PrintingEdition = await this.printingEditionRepository.save(toUpdate);

    //     return savedEdition;
    // }

    public async deletePrintingEdition(printingEditionId: string): Promise<number> {
        const result: number = await this.printingEditionRepository.destroy({
            where: { id: printingEditionId },
          });

        return result;
    }
}
