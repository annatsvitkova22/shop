import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { PaymentService } from 'src/services';
import { CreatePaymentModel, UpdatePaymentModel } from 'src/models';

@ApiUseTags('Users table')
@Controller('user')
export class PaymentsController {

    constructor(
        private paymentService: PaymentService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search payment by id'})
    get(@Param() params) {
        const payment = this.paymentService.getUPaymentById(params.id);

        return payment;
    }

    @Get()
    @ApiOperation({ title: 'Search all payments'})
    getAll() {
        const payment = this.paymentService.getPayments();

        return payment;
    }

    @Post()
    @ApiOperation({ title: 'Create payment by id'})
    create(@Body() payment: CreatePaymentModel) {
        const createPayment = this.paymentService.createPayment(payment);

        return createPayment;
    }

    @Put()
    @ApiOperation({ title: 'Update payment by id'})
    update(@Body() payment: UpdatePaymentModel) {
        const updatePayment = this.paymentService.updatePayment(payment);

        return updatePayment;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete payment by id'})
    delete(@Param() params) {

        return this.paymentService.deletePayment(params.id);
    }
}
