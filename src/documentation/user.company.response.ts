import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CompanyResponse {

  @ApiProperty()
  id: number

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  provider: boolean
}