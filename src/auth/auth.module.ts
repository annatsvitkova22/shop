import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from  'src/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/contants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
