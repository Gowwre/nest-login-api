import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserController } from './user.controller';
import { DateScalar } from 'config/graphql/scalar/date.scalar';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver, DateScalar],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
