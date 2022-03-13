import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'alex',
      password: '12345',
      database: 'personal_account',
      models: [User, Contact, ContactSocial, Social, ContactCategory, Category],
    }),
    UserModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
