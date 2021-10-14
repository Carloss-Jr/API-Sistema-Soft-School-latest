import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { EmployerEntity } from 'src/entities/employer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EmployerEntity])],
  controllers: [EmployerController],
  providers: [EmployerService],
  exports: [EmployerService]
})
export class EmployerModule { }
