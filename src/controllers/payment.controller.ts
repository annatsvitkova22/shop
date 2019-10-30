import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { PaymentService } from 'src/services';
import { CreatePaymentModel, UpdatePaymentModel } from 'src/models';
import { Payment } from 'src/entity';

@ApiUseTags('Payment')
@Controller('payment')
export class PaymentsController {

    constructor(private paymentService: PaymentService) { }

    @Get(':id')
    @ApiOperation({ title: 'Search payment by id'})
    public async get(@Param() params): Promise<Payment> {
        const payment: Payment = await this.paymentService.getUPaymentById(params.id);

        return payment;
    }

    @Get()
    @ApiOperation({ title: 'Search all payments'})
    public async getAll(): Promise<Payment[]> {
        const payment: Payment[] = await this.paymentService.getPayments();

        return payment;
    }

    @Post()
    @ApiOperation({ title: 'Create payment by id'})
    public async create(@Body() payment: CreatePaymentModel): Promise<Payment> {
        const createPayment: Payment = await this.paymentService.createPayment(payment);

        return createPayment;
    }

    @Put()
    @ApiOperation({ title: 'Update payment by id'})
    public update(@Body() payment: UpdatePaymentModel): Promise<Payment> {
        const updatePayment: Promise<Payment> = this.paymentService.updatePayment(payment);

        return updatePayment;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete payment by id'})
    public async delete(@Param() params): Promise<number>  {
        const deleted: number  = await this.paymentService.deletePayment(params.id);

        return deleted;
    }
}
