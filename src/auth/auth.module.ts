import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy],
})
export class AuthModule {
  constructor() {
    console.log(process.env.JWT_SECRET);
  }
}
