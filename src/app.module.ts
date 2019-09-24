import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ControllersController } from 'src/controllers/requests.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from 'src/common/jwt.strategy';
import { LocalStrategy } from 'src/common/local.strategy';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: '60s' },
    })],
  controllers: [AppController, ControllersController],
  providers: [AppService, UsersService, LocalStrategy, JwtStrategy],
  exports: [AuthService, UsersService],
})
export class AppModule { }

