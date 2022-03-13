import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from './models/contact.model';
import { CreateContactDto } from './dto/create-contact.dto';
import { Category } from './models/category.model';
import { Social } from './models/social.model';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact)
    private contactModel: typeof Contact,
  ) {}

  async create(dto: CreateContactDto): Promise<Contact> {
    const contact = await this.contactModel.create({ ...dto });
    return contact;
  }

  async getAll(user_id: string): Promise<Contact[]> {
    return await this.contactModel.findAll({
      where: { user_id },
      include: [Category, Social],
    });
  }

  async getOne(id: string): Promise<Contact> {
    return await this.contactModel.findByPk(id);
  }

  async delete(id: string): Promise<number> {
    return await this.contactModel.destroy({ where: { id } });
  }
}
