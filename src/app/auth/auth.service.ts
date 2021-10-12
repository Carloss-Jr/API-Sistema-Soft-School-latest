/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import { CompanyEntity } from '../company/entities/company.entity';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: CompanyService,
    private readonly jwtService: JwtService,
  ) { }

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: CompanyEntity;
    try {
      user = await this.usersService.findOneOrFail({ email });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }
}