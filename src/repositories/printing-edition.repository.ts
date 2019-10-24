// import { Injectable } from '@nestjs/common';
// import { PrintingEdition } from 'src/entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, DeleteResult } from 'typeorm';

// @Injectable()
// export class PrintingEditionRepository {
//     constructor(@InjectRepository(PrintingEdition) private printingEditionRepository: Repository<PrintingEdition>) { }

//     public async createPrintingEdition(createEdition: PrintingEdition): Promise<PrintingEdition> {
//         const edition: PrintingEdition = await this.printingEditionRepository.save(createEdition);

//         return edition;
//     }

//     public async getPrintinEditions(): Promise<PrintingEdition[]> {
//         const getEdition: PrintingEdition[] = await this.printingEditionRepository.find();

//         return getEdition;
//     }

//     public async getPrintingEditionById(editionId: PrintingEdition): Promise<PrintingEdition[]> {
//         const findPrintingEdition: PrintingEdition[] = await this.printingEditionRepository.find({
//             select: ['name', 'description', 'price', 'isRemoved', 'status', 'currency', 'type'],
//             where: [{ id: editionId.id }],
//         });

//         return findPrintingEdition;
//     }

//     public async getEditionById(getEdition: PrintingEdition): Promise<PrintingEdition> {
//         const findEdition: PrintingEdition = await this.printingEditionRepository.findOne(getEdition.id);

//         return findEdition;
//     }

//     public async deletePrintingEdition(printingEdition: PrintingEdition): Promise<DeleteResult> {
//         const result: Promise<DeleteResult> = this.printingEditionRepository.delete(printingEdition);

//         return result;
//     }
// }
