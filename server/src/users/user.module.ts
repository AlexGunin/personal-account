import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { MailService } from '../token/mail.service';
import { TokenService } from '../token/token.service';
import { Token } from '../token/models/token.model';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([User, Token]), ConfigModule],
  controllers: [UserController],
  providers: [UserService, MailService, TokenService, ConfigService],
})
export class UserModule {}
