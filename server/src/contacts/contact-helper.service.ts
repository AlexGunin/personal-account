import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Social } from './models/social.model';
import { Category } from './models/category.model';
import { ContactCategory } from './models/contact_category.model';
import { ContactSocial } from './models/contact_social.model';
import { CreateSocialsDto } from './dto/create-socials.dto';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { SocialInterface } from './interfaces/social';
import { CategoryInterface } from './interfaces/category';

@Injectable()
export class ContactHelperService {
  constructor(
    @InjectModel(Social)
    private socialModel: typeof Social,
    @InjectModel(Category)
    private categoryModel: typeof Category,
    @InjectModel(ContactCategory)
    private contactCategoryModel: typeof ContactCategory,
    @InjectModel(ContactSocial)
    private contactSocialModel: typeof ContactSocial,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryModel.findAll();
  }

  async getAllSocials(): Promise<Social[]> {
    return await this.socialModel.findAll();
  }

  async getCategoryId(title: string): Promise<number> {
    const category = await this.categoryModel.findOne({ where: { title } });
    return category.id;
  }

  async createSocial(dto: SocialInterface): Promise<Social> {
    return await this.socialModel.create({ ...dto });
  }

  async createCategory(dto: CategoryInterface): Promise<Category> {
    return await this.categoryModel.create({ ...dto });
  }

  async getSocialId(title: string): Promise<number> {
    const social = await this.socialModel.findOne({ where: { title } });
    return social.id;
  }

  async createContactSocials(dto: CreateSocialsDto) {
    const { socials, contact_id } = dto;
    const allSocials = await Promise.allSettled(
      socials.map((social) => ({
        id: this.getSocialId(social.title),
        link: social.link,
      })),
    );
    console.log('All socials', allSocials);
    const createLinks = allSocials.map((promise) => {
      console.log('PROMISE INTO MAP', promise);
      if (promise.status === 'fulfilled') {
        console.log('PROMISE FULLFILED, value', promise.value);
        return this.contactSocialModel.create({
          contact_id,
          social_id: promise.value.id,
          link: promise.value.link,
        });
      }
    });
    console.log('promise all link', createLinks);
    return await Promise.allSettled(createLinks);
  }

  async createContactCategories(dto: CreateCategoriesDto) {
    const { categories, contact_id } = dto;
  }
}
