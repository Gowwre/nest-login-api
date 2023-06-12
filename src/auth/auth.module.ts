import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthResolver],
})
export class AuthModule {
  constructor() {
    console.log(process.env.JWT_SECRET);
  }
}
