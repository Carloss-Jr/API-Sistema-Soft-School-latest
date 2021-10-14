/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CompanyService } from '../app/company/company.service';
import { CompanyEntity } from '../entities/company.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmployerService } from 'src/app/employer/employer.service';
import { EmployerEntity } from '../entities/employer.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly employerService: EmployerService,
    private readonly jwtService: JwtService,
  ) { }

  async login(user) {
    const payload = { sub: user.id, email: user.email, provider: user.provider };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateProvider(provider: boolean) {
    if (provider === true) {
      let user: CompanyEntity
      return user
    } else {
      let user: EmployerEntity
      return user
    }
  }

  async useService(provider: boolean) {
    if (provider === true) {
      return this.companyService
    } else {
      return this.employerService
    }
  }

  async validate(email: string, password: string, provider: boolean) {
    let user = await this.validateProvider(provider)
    try {
      user = await (await this.useService(provider)).findOneOrFail({ email });
    } catch (error) {
      return console.log(user);
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    console.log(user)
    return user;
  }

}