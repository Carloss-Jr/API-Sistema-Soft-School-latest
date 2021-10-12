import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from 'src/helpers/regex.helper';
import { MessagesHelper } from '../../../helpers/messages.helper';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;
}
