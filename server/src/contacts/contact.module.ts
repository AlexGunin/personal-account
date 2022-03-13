import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { Contact } from './models/contact.model';
import { ContactSocial } from './models/contact_social.model';
import { Social } from './models/social.model';
import { ContactCategory } from './models/contact_category.model';
import { Category } from './models/category.model';
import { ContactHelperService } from './contact-helper.service';

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
  controllers: [ContactController],
  providers: [ContactService, ContactHelperService],
})
export class ContactModule {}
