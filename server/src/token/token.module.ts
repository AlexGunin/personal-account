import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './models/token.model';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([Token]), ConfigModule],
  providers: [TokenService, MailService, ConfigService],
  controllers: [TokenController],
})
export class TokenModule {}
