import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactHelperService } from './contact-helper.service';
import { Category } from './models/category.model';
import { Social } from './models/social.model';
import { Contact } from './models/contact.model';
import { SocialInterface } from './interfaces/social';
import { CategoryInterface } from './interfaces/category';

@Controller('contact')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly contactHelperService: ContactHelperService,
  ) {}

  @Get(':user_id')
  getAllUserContact(@Param('user_id') user_id: string): Promise<Contact[]> {
    return this.contactService.getAll(user_id);
  }

  @Post('category')
  createCategory(@Body() dto: CategoryInterface): Promise<Category> {
    return this.contactHelperService.createCategory(dto);
  }

  @Post()
  async create(@Body() dto: CreateContactDto): Promise<Contact> {
    const contact = await this.contactService.create(dto);
    await this.contactHelperService.createContactSocials({
      contact_id: contact.id,
      socials: dto.socials,
    });
    await this.contactHelperService.createContactCategories({
      contact_id: contact.id,
      categories: dto.categories,
    });
    return contact;
  }

  @Post('social')
  createSocial(@Body() dto: SocialInterface): Promise<Social> {
    return this.contactHelperService.createSocial(dto);
  }
}
