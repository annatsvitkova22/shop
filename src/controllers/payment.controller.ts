import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common';

import { PaymentService } from 'src/services';
import { CreatePaymentModel, UpdatePaymentModel } from 'src/models';
import { Payment } from 'src/entity';

@ApiUseTags('Payment')
@Controller('payment')
export class PaymentsController {

    constructor(private paymentService: PaymentService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @Roles('admin')
    @ApiOperation({ title: 'Search all payments'})
    public async getAll(): Promise<Payment[]> {
        const payment: Payment[] = await this.paymentService.getPayments();

        return payment;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('admin')
    @ApiOperation({ title: 'Search payment by id'})
    public async get(@Param() params): Promise<Payment> {
        const payment: Payment = await this.paymentService.getUPaymentById(params.id);

        return payment;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @Roles('user')
    @ApiOperation({ title: 'Create payment'})
    public async create(@Body() createPayment: CreatePaymentModel): Promise<Payment> {
        const payment: Payment = await this.paymentService.createPayment(createPayment);

        return payment;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @Roles('admin')
    @ApiOperation({ title: 'Update payment by id'})
    public update(@Body() updatePayment: UpdatePaymentModel): Promise<Payment> {
        const payment: Promise<Payment> = this.paymentService.updatePayment(updatePayment);

        return payment;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('admin')
    @ApiOperation({ title: 'Delete payment by id'})
    public async delete(@Param() params): Promise<number>  {
        const deleted: number  = await this.paymentService.deletePayment(params.id);

        return deleted;
    }
}
