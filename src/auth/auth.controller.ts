/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthResponse } from 'src/documentation/auth.response';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @ApiCreatedResponse({
    type: AuthResponse
  }
  )
  @Post('login')
  async login(
    @Req() req: any,
    @Body() body: AuthResponse) {
    return await this.authService.login(body);
  }
}
