import { Module } from '@nestjs/common';
import { CustomersController } from './stripe.controller';
import { CustomersService } from './stripe.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class StripeModule {}
