import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { PaymentService } from 'src/services';
import { CreatePaymentModel, UpdatePaymentModel } from 'src/models';
import { Payment } from 'src/entity';

@ApiUseTags('Payment')
@Controller('payment')
export class PaymentsController {

    constructor(private paymentService: PaymentService) { }

    @Get()
    @ApiOperation({ title: 'Search all payments'})
    public async getAll(): Promise<Payment[]> {
        const payment: Payment[] = await this.paymentService.getPayments();

        return payment;
    }

    @Get(':id')
    @ApiOperation({ title: 'Search payment by id'})
    public async get(@Param() params): Promise<Payment> {
        const payment: Payment = await this.paymentService.getUPaymentById(params.id);

        return payment;
    }

    @Post()
    @ApiOperation({ title: 'Create payment by id'})
    public async create(@Body() createPayment: CreatePaymentModel): Promise<Payment> {
        const payment: Payment = await this.paymentService.createPayment(createPayment);

        return payment;
    }

    @Put()
    @ApiOperation({ title: 'Update payment by id'})
    public update(@Body() updatePayment: UpdatePaymentModel): Promise<Payment> {
        const payment: Promise<Payment> = this.paymentService.updatePayment(updatePayment);

        return payment;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete payment by id'})
    public async delete(@Param() params): Promise<number>  {
        const deleted: number  = await this.paymentService.deletePayment(params.id);

        return deleted;
    }
}
