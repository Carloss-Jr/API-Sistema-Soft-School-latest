/* eslint-disable prettier/prettier */
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from '../../entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) { }

  async create(data: CreateCompanyDto) {
    const user = this.companyRepository.create(data);
    return await this.companyRepository.save(user);
  }

  async findAll() {
    return await this.companyRepository.find({
      select: ['id', 'name', 'email', 'provider'],
    });
  }

  async findOneOrFail(
    conditions: FindConditions<CompanyEntity>,
    options?: FindOneOptions<CompanyEntity>,
  ) {
    try {
      return await this.companyRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async update(id: number, data: UpdateCompanyDto) {
    const user = await this.findOneOrFail({ id });
    this.companyRepository.merge(user, data);
    return await this.companyRepository.save(user);
  }

  async remove(id: number) {
    await this.companyRepository.findOneOrFail({ id });
    this.companyRepository.softDelete({ id });
  }
}
