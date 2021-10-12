import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(RegExHelper.emailInvalid, {
    message: MessagesHelper.EMAIL_NOT_EMPTY,
  })
  email: string;
}
