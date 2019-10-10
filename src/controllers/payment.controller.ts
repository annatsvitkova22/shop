import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { PaymentService } from 'src/services';
import { CreatePaymentModel, UpdatePaymentModel } from 'src/models';

@Controller('user')
export class PaymentsController {

    constructor(
        private paymentService: PaymentService,
        ) { }

    @Get(':id')
    get(@Param() params) {
        const payment = this.paymentService.getUPaymentById(params.id);

        return payment;
    }

    @Get()
    getAll() {
        const payment = this.paymentService.getPayments();

        return payment;
    }

    @Post()
    create(@Body() payment: CreatePaymentModel) {
        const createPayment = this.paymentService.createPayment(payment);

        return createPayment;
    }

    @Put()
    update(@Body() payment: UpdatePaymentModel) {
        const updatePayment = this.paymentService.updatePayment(payment);

        return updatePayment;
    }

    @Delete(':id')
    delete(@Param() params) {

        return this.paymentService.deletePayment(params.id);
    }
}
