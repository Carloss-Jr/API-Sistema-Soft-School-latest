/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { CompanyModule } from './app/company/company.module';

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
      entities: [__dirname + '/**/**/*.entity{.js,.ts}'],
      // migrations: [__dirname + '/database/migrations/*.js,.ts'],
      // cli: {
      //   migrationsDir: __dirname + '/database/migrations',
      // },
    } as TypeOrmModuleOptions),
    CompanyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
