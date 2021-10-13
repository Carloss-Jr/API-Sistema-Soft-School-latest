/* eslint-disable prettier/prettier */
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthResponse } from 'src/documentation/auth.response';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOkResponse({
    type: AuthResponse
  }
  )
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
