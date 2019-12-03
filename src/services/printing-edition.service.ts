import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { PrintingEdition, Author, AuthorInBooks } from 'src/entity';
import { UpdatePrintingEditionModel, PrintingEditionFilterModel, PrintingEditionInfoModel, UpdatePrintingEditionWithAuthorModel,
    CreatePrintingEditionWithAuthorModel } from 'src/models';
import { UuidHelper } from 'src/common';
import { PrintingEditionRepository, AuthorInBookRepository, AuthorRepository } from 'src/repositories';

@Injectable()
export class PrintingEditionService {

    constructor(
        private readonly authorInBookRepository: AuthorInBookRepository,
        private readonly authorRepository: AuthorRepository,
        private readonly printingEditionRepository: PrintingEditionRepository,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
    ) { }

    public async getPrintingEditions(): Promise<PrintingEdition[]> {
        const getEditions: PrintingEdition[] = await this.printingEditionRepository.getPrintingEditions();

        return getEditions;
    }

    public async getPrintingEditionsByIsRemoved(): Promise<PrintingEdition[]> {
        const getEditions: PrintingEdition[] = await this.printingEditionRepository.getPrintingEditionsByIsRemomed();

        return getEditions;
    }

    public async getPrintingEditionByIdWithAuthor(id: string): Promise<UpdatePrintingEditionWithAuthorModel> {
        // tslint:disable-next-line: max-line-length
        let authorQuery: string = 'SELECT `authors`.`id`, `authors`.`name`, `authors`.`isRemoved` FROM `authorinbooks` INNER JOIN `authors` ON `authorinbooks`.`authorId` = `authors`.`id` INNER JOIN `printingeditions` ON `authorinbooks`.`bookId` = `printingeditions`.`id` WHERE `printingeditions`.`id` = \'';
        authorQuery += id + '\'';
        const foundAuthorByPrintingEditionId: Author[] = await this.printingEditionRepository.getAuthroByPrintingEditionrId(authorQuery);
        // tslint:disable-next-line: max-line-length
        let printingEditionQuery = 'SELECT `printingeditions`.`id`, `printingeditions`.`name`, `printingeditions`.`description`, `printingeditions`.`price`, `printingeditions`.`isRemoved`, `printingeditions`.`status`, `printingeditions`.`currency`, `printingeditions`.`type` FROM `authorinbooks` INNER JOIN `authors` ON `authorinbooks`.`authorId` = `authors`.`id` INNER JOIN `printingeditions` ON `authorinbooks`.`bookId` = `printingeditions`.`id` WHERE `printingeditions`.`id` = \'';
        printingEditionQuery += id + '\'';
        const foundPrintingEditionById: PrintingEdition[] = await this.printingEditionRepository.getPrintingEditionById(printingEditionQuery);
        const foundPrintingEditionByIdWithAuthors: UpdatePrintingEditionWithAuthorModel = {};
        foundPrintingEditionByIdWithAuthors.printingEdition = foundPrintingEditionById[0];
        foundPrintingEditionByIdWithAuthors.authors = foundAuthorByPrintingEditionId;

        return foundPrintingEditionByIdWithAuthors;
    }

    public async getPrintingEditionById(id: string): Promise<PrintingEdition> {
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

    public async createPrintingEdition(createPrintingEdition: CreatePrintingEditionWithAuthorModel): Promise<PrintingEdition> {
        const edition: PrintingEdition = new PrintingEdition();
        edition.id = this.uuidHelper.uuidv4();
        edition.name = createPrintingEdition.printingEdition.name;
        edition.description = createPrintingEdition.printingEdition.description;
        edition.price = createPrintingEdition.printingEdition.price;
        edition.status = createPrintingEdition.printingEdition.status;
        edition.currency = createPrintingEdition.printingEdition.currency;
        edition.type = createPrintingEdition.printingEdition.type;

        const foundPrintingEdition: PrintingEdition = await this.printingEditionRepository.getPrintingEditionrByName(edition.name);
        if (foundPrintingEdition) {
            foundPrintingEdition.isRemoved = false;
            const updatedPrintingEdition: PrintingEdition = await this.printingEditionRepository.createPrintingEdition(foundPrintingEdition);

            return updatedPrintingEdition;
        }

        const savedPrintingEdition: PrintingEdition = await this.printingEditionRepository.createPrintingEdition(edition);

        let query: string = 'INSERT INTO `AuthorInBooks` (`id`, `authorId`, `bookId`) VALUES';
        const count: number = createPrintingEdition.authors.length;
        let i: number = 1;

        if (createPrintingEdition.authors) {
            for (const author of createPrintingEdition.authors) {
                const generatedId: string = this.uuidHelper.uuidv4();
                // tslint:disable-next-line: max-line-length
                query += ' (\'' + generatedId + '\', \'' + author.id + '\', \'' + edition.id + '\')';
                if (i < count) {
                    query += ', ';
                }
                if (i === count) {
                    query += ';';
                }
                i++;
            }
        }
        if (createPrintingEdition.authors && !createPrintingEdition.authors.length) {
            const author: Author = await this.authorRepository.getAuthorIByName('Unknown');
            const generatedId: string = this.uuidHelper.uuidv4();
            query += ' (\'' + generatedId + '\', \'' + author.id + '\', \'' + edition.id + '\')';
        }

        const authors: AuthorInBooks[] = await this.authorInBookRepository.createAuthorInBook(query);
        if (!authors || !savedPrintingEdition) {
            return null;
        }

        return savedPrintingEdition;
    }

    public async updatePrintingEdition(updatePrintingEdition: UpdatePrintingEditionWithAuthorModel): Promise<PrintingEdition> {
        const edition: UpdatePrintingEditionModel = new UpdatePrintingEditionModel();
        edition.id = updatePrintingEdition.printingEdition.id;
        edition.name = updatePrintingEdition.printingEdition.name;
        edition.description = updatePrintingEdition.printingEdition.description;
        edition.price = updatePrintingEdition.printingEdition.price;
        edition.status = updatePrintingEdition.printingEdition.status;
        edition.currency = updatePrintingEdition.printingEdition.currency;
        edition.type = updatePrintingEdition.printingEdition.type;

        const toUpdate: PrintingEdition = await this.printingEditionRepository.getPrintingEditionrById(edition.id);
        toUpdate.name = edition.name;
        toUpdate.description = edition.description;
        toUpdate.price = edition.price;
        toUpdate.status = edition.status;
        toUpdate.currency = edition.currency;
        toUpdate.type = edition.type;

        const savedPrintingEdition: PrintingEdition = await this.printingEditionRepository.createPrintingEdition(toUpdate);
        const deletedAuthors: number = await this.authorInBookRepository.deleteAuthorInBook(toUpdate.id);

        let query: string = 'INSERT INTO `AuthorInBooks` (`id`, `authorId`, `bookId`) VALUES';
        const count: number = updatePrintingEdition.authors.length;
        let i: number = 1;
        for (const author of updatePrintingEdition.authors) {
            const generatedId: string = this.uuidHelper.uuidv4();
            // tslint:disable-next-line: max-line-length
            query += ' (\'' + generatedId + '\', \'' + author.id + '\', \'' + updatePrintingEdition.printingEdition.id + '\')';
            if (i < count) {
                query += ', ';
            }
            if (i === count) {
                query += ';';
            }
            i++;
        }
        if (updatePrintingEdition.authors && !updatePrintingEdition.authors.length) {
            const author: Author = await this.authorRepository.getAuthorIByName('Unknown');
            const generatedId: string = this.uuidHelper.uuidv4();
            query += ' (\'' + generatedId + '\', \'' + author.id + '\', \'' + edition.id + '\')';
        }

        const authors: any = await this.authorInBookRepository.createAuthorInBook(query);

        if (!authors || !savedPrintingEdition || deletedAuthors) {
            return null;
        }

        return savedPrintingEdition;
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
