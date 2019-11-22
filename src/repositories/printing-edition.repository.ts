import { Injectable } from '@nestjs/common';
import { PrintingEdition } from 'src/entity';
import sequelize = require('sequelize');

import db = require('src/entity/printing-edition.entity');

@Injectable()
export class PrintingEditionRepository {

    public async getPrintingEditions(): Promise<PrintingEdition[]> {
        const getPrintingEditions: PrintingEdition[] = await db.PrintingEdition.findAll();

        return getPrintingEditions;
    }

    public async getPrintingEditionrById(printingEditionId: string): Promise<PrintingEdition> {
        const printingEdition: PrintingEdition = await db.PrintingEdition.findOne({
            where: { id: printingEditionId },
        });

        return printingEdition;
    }

    public async getPaginationPrintingEdition(take: number, skip: number): Promise<PrintingEdition[]> {
        const printingEditions: PrintingEdition[] = await db.PrintingEdition.findAll({
            limit: +take,
            offset: +skip,
        });

        return printingEditions;
    }

    public async getFiltrationPrintingEdition(query: string): Promise<PrintingEdition[]> {
        const printingEditions: PrintingEdition[] = await db.PrintingEdition.sequelize.query(query, {
            plain: false,
            raw: false,
            type: sequelize.QueryTypes.SELECT,
        });

        return printingEditions;
    }

    public async createPrintingEdition(createPrintingEdition: PrintingEdition): Promise<PrintingEdition> {
        const printingEdition: PrintingEdition = await createPrintingEdition.save();

        return printingEdition;
    }

    public async deletePrintingEdition(printingEditionId: string): Promise<number> {
        const deleted: number = await db.PrintingEdition.destroy({
            where: { id: printingEditionId },
        });

        return deleted;
    }
}
