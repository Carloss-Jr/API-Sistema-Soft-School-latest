import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) { }

  @Post()
  async create(@Body() body: CreateEmployerDto) {
    return this.employerService.create(body);
  }

  @Get()
  async findAll() {
    return this.employerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.employerService.findOneOrFail({ id: +id });
  }

  @Put(':id')
  async update(@Param('id', new ParseIntPipe()) id: string, @Body() body: UpdateEmployerDto) {
    return this.employerService.update(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.employerService.remove(+id);
  }
}
