import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model';
import { UserModule } from './users/user.module';
import { ContactModule } from './contacts/contact.module';
import { Contact } from './contacts/models/contact.model';
import { Social } from './contacts/models/social.model';
import { ContactSocial } from './contacts/models/contact_social.model';
import { ContactCategory } from './contacts/models/contact_category.model';
import { Category } from './contacts/models/category.model';
import { TokenModule } from './token/token.module';
import { Token } from './token/models/token.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthMiddleware } from './middlewares/authmiddleware';
import { TokenService } from './token/token.service';
import { AuthModule } from './middlewares/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'iwaannafly@gmail.com',
          pass: 'ayqqmppufpwpfwkl',
        },
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'alex',
      password: '12345',
      database: 'personal_account',
      models: [
        User,
        Contact,
        ContactSocial,
        Social,
        ContactCategory,
        Category,
        Token,
      ],
    }),
    UserModule,
    ContactModule,
    AuthModule,
    ConfigModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, TokenService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}
