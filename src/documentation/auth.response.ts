import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {

  id: number
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string

  provider: boolean
}