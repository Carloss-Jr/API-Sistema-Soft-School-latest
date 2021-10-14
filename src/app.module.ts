/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './app/company/company.module';
import { CompanyController } from './app/company/company.controller';
import { EmployerModule } from './app/employer/employer.module';
import * as path from 'path'
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: false,
      extra: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      entities: [path.resolve(__dirname + '/entities/*.entity{.js,.ts}')],
      migrations: [path.resolve(__dirname + '/database/migrations/*.js,.ts')],
      cli: [
        { migrationsDir: [path.resolve(__dirname + '/database/migrations')] },
      ],
    } as TypeOrmModuleOptions),
    CompanyModule,
    EmployerModule,
    AuthModule,
    EmployerModule,
  ],
  controllers: [AppController, CompanyController],
  providers: [AppService],
})
export class AppModule { }
