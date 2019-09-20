import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ControllersController } from 'src/controllers/controllers.controller';
import { ServicesService } from 'src/services/services.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, ControllersController],
  providers: [AppService, ServicesService],
})
export class AppModule { }

