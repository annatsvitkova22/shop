import { Injectable } from '@nestjs/common';
import { PrintingEdition } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PrintingEditionRepository {
    constructor(@InjectRepository(PrintingEdition) private printingEditionRepository: Repository<PrintingEdition>) { }

    public async createPrintingEdition(createEdition: PrintingEdition) {
        const edition = await this.printingEditionRepository.save(createEdition);
        return edition;
    }

    public async getPrintinEditions() {
        const getEdition = await this.printingEditionRepository.find();
        return getEdition;
    }

    public async getPrintingEditionById(editionId: PrintingEdition) {
        const findPrintingEdition = await this.printingEditionRepository.find({
            select: ['name', 'description', 'price', 'isRemoved', 'status', 'currency', 'type'],
            where: [{ id: editionId.id }],
        });
        return findPrintingEdition;
    }

    public async getEditionById(getEdition: PrintingEdition) {
        const findEdition = await this.printingEditionRepository.findOne(getEdition.id);
        return findEdition;
    }

    public async deletePrintingEdition(printingEdition: PrintingEdition) {
        const result = this.printingEditionRepository.delete(printingEdition);
        return result;
    }
}
