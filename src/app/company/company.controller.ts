/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyResponse } from '../../documentation/user.company.response';

@Controller('api/v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @ApiCreatedResponse()
  @Post()
  async create(@Body() body: CreateCompanyDto) {
    return this.companyService.create(body);
  }

  @ApiOkResponse({
    type: CompanyResponse
  })
  @Get()
  async findAll() {
    return this.companyService.findAll();
  }

  @ApiOkResponse({
    type: CompanyResponse
  })
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: string) {
    return await this.companyService.findOneOrFail({ id: +id });
  }

  @ApiOkResponse({
    type: UpdateCompanyDto
  })
  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() body: UpdateCompanyDto,
  ) {
    return this.companyService.update(+id, body);
  }

  @ApiOkResponse({

  })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.companyService.remove(+id);
  }
}
