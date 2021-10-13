import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}