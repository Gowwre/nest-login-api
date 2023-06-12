import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import LoginUserDto from 'src/user/dto/login-user.dto';
import { User } from 'src/user/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(()=>User)
  signIn(@Args('loginCredentials') signInDto: LoginUserDto) {
    const loggedInUser = this.authService.signInThatReturnsAUserObject(
      signInDto.email,
      signInDto.password,
    );
    return loggedInUser;
  }
}
