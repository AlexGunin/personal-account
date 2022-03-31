import { Module } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from '../token/models/token.model';
import { TokenModule } from '../token/token.module';
import { AuthMiddleware } from './authmiddleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([Token]), TokenModule, ConfigModule],
  providers: [AuthMiddleware, TokenService, ConfigService],
  controllers: [],
})
export class AuthModule {}
