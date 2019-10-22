import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { PaymentService } from 'src/services';
import { CreatePaymentModel, UpdatePaymentModel } from 'src/models';
import { Payment } from 'src/entity';

@ApiUseTags('Users table')
@Controller('payment')
export class PaymentsController {

    constructor(private paymentService: PaymentService) { }

    @Get(':id')
    @ApiOperation({ title: 'Search payment by id'})
    public get(id: string): Promise<Payment> {
        const payment: Promise<Payment> = this.paymentService.getUPaymentById(id);

        return payment;
    }

    @Get()
    @ApiOperation({ title: 'Search all payments'})
    public getAll(): Promise<Payment[]> {
        const payment: Promise<Payment[]> = this.paymentService.getPayments();

        return payment;
    }

    @Post()
    @ApiOperation({ title: 'Create payment by id'})
    public create(@Body() payment: CreatePaymentModel): Promise<string> {
        const createPayment: Promise<string> = this.paymentService.createPayment(payment);

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
    public delete(@Param() params): Promise<boolean|string>  {
        const deleted: Promise<boolean|string>  = this.paymentService.deletePayment(params.id);

        return deleted;
    }
}
