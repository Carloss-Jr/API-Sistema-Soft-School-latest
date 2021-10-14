import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployerEntity } from 'src/entities/employer.entity';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@Injectable()
export class EmployerService {

  constructor(
    @InjectRepository(EmployerEntity)
    private readonly employerRepository: Repository<EmployerEntity>,
  ) { }

  async create(data: CreateEmployerDto) {
    const user = this.employerRepository.create(data);
    return await this.employerRepository.save(user);
  }

  async findAll() {
    return await this.employerRepository.find({
      select: ['id', 'name', 'email', 'provider'],
    });
  }

  async findOneOrFail(
    conditions: FindConditions<EmployerEntity>,
    options?: FindOneOptions<EmployerEntity>,
  ) {
    try {
      return await this.employerRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    };
  }

  async update(id: number, data: UpdateEmployerDto) {
    const user = await this.findOneOrFail({ id });
    this.employerRepository.merge(user, data);
    return await this.employerRepository.save(user)
  }

  async remove(id: number) {
    await this.employerRepository.findOneOrFail({ id });
    this.employerRepository.softDelete({ id });
  }
}
