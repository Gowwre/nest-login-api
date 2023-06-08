/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginUserDto from 'src/user/dto/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto) {
    const loggedInUser = this.authService.signInThatReturnsAUserObject(
      signInDto.email,
      signInDto.password,
    );
    return loggedInUser;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
