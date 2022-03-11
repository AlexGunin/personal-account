import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { Contact } from './models/contact.model';
import { ContactSocial } from './models/contact_social.model';
import { Social } from './models/social.model';
import { ContactCategory } from './models/contact_category.model';
import { Category } from './models/category.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Contact,
      ContactSocial,
      Social,
      ContactCategory,
      Category,
    ]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
