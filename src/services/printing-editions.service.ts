import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { PrintingEdition } from 'src/entity';
import { CreatePrintingEditionModel, UpdatePrintingEditionModel, PrintingEditionFilterModel } from 'src/models';
import { throwStatement } from '@babel/types';

@Injectable()
export class PrintingEditionService {

    constructor(@InjectRepository(PrintingEdition) private printingEditionRepository: Repository<PrintingEdition>) { }

    public async getPrintingEditions(): Promise<PrintingEdition[]> {
        const getEditions: PrintingEdition[] = await this.printingEditionRepository.find();

        return getEditions;
    }

    public async getPrintingEditionsById(id: number): Promise<PrintingEdition[]> {
        const edition: UpdatePrintingEditionModel = {};
        edition.id = id;
        const foundPrintingEdition: PrintingEdition[] = await this.printingEditionRepository.find({
            select: ['name', 'description', 'price', 'isRemoved', 'status', 'currency', 'type'],
            where: [{ id: edition.id }],
        });

        return foundPrintingEdition;
    }

    public async printingEditionsFilter(printingEdition: PrintingEditionFilterModel): Promise<PrintingEdition[]> {
        let foundPrintingEdition;
        console.log(printingEdition);
        if (printingEdition.name == null && printingEdition.status != null && printingEdition.priceMin != null && printingEdition.priceMax != null) {
            foundPrintingEdition = await this.printingEditionRepository.query(
                'SELECT * FROM printing_edition WHERE status = ? AND price > ? AND price < ?',
                [printingEdition.status, printingEdition.priceMin, printingEdition.priceMax]);
        }
        if (printingEdition.name != null && printingEdition.status == null && printingEdition.priceMin != null && printingEdition.priceMax != null) {
            foundPrintingEdition = await this.printingEditionRepository.query(
                'SELECT * FROM printing_edition WHERE name = ? AND price > ? AND price < ?',
                [printingEdition.name, printingEdition.priceMin, printingEdition.priceMax]);
        }
        if (printingEdition.name != null && printingEdition.status != null && printingEdition.priceMin != null && printingEdition.priceMax == null) {
            foundPrintingEdition = await this.printingEditionRepository.query(
                'SELECT * FROM printing_edition WHERE name = ? AND status = ? AND price > ?',
                [printingEdition.name, printingEdition.status, printingEdition.priceMin]);
        }
        if (printingEdition.name != null && printingEdition.status != null && printingEdition.priceMin == null && printingEdition.priceMax != null) {
            foundPrintingEdition = await this.printingEditionRepository.query(
                'SELECT * FROM printing_edition WHERE name = ? AND status = ? AND price < ?',
                [printingEdition.name, printingEdition.status, printingEdition.priceMax]);
        }
        if (printingEdition.name == null && printingEdition.status == null && printingEdition.priceMin != null && printingEdition.priceMax != null) {
            foundPrintingEdition = await this.printingEditionRepository.query(
                'SELECT * FROM printing_edition WHERE price > ? AND price < ?',
                [printingEdition.priceMin, printingEdition.priceMax]);
        }
        if (printingEdition.name != null && printingEdition.status != null && printingEdition.priceMin == null && printingEdition.priceMax == null) {
            foundPrintingEdition = await this.printingEditionRepository.query(
                'SELECT * FROM printing_edition WHERE name = ? AND status = ?',
                [printingEdition.name, printingEdition.status]);
        }
        if (printingEdition.name != null && printingEdition.status != null && printingEdition.priceMin != null && printingEdition.priceMax != null) {
            foundPrintingEdition = await this.printingEditionRepository.query(
                'SELECT * FROM printing_edition WHERE name = ? AND status = ? AND price > ? AND price < ?',
                [printingEdition.name, printingEdition.status, printingEdition.priceMin, printingEdition.priceMax]);
        }

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
        const savedEdition: PrintingEdition = await this.printingEditionRepository.save(edition);

        return (savedEdition.id);
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

        const toUpdate: PrintingEdition = await this.printingEditionRepository.findOne(edition.id);
        toUpdate.name = edition.name;
        toUpdate.description = edition.description;
        toUpdate.price = edition.price;
        toUpdate.isRemoved = edition.isRemoved;
        toUpdate.status = edition.status;
        toUpdate.currency = edition.currency;
        toUpdate.type = edition.type;

        const savedEdition: PrintingEdition = await this.printingEditionRepository.save(toUpdate);

        return savedEdition;
    }

    public async deletePrintingEdition(printingEditionId: number): Promise<DeleteResult> {
        const printingEdition: PrintingEdition = {} as PrintingEdition;
        printingEdition.id = printingEditionId;
        const result: Promise<DeleteResult> = this.printingEditionRepository.delete(printingEdition);

        return result;
    }
}
