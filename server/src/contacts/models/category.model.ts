import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Contact } from './contact.model';
import { ContactCategory } from './contact_category.model';

@Table
export class Category extends Model {
  @Column
  title: string;

  @BelongsToMany(() => Contact, () => ContactCategory)
  contacts: Contact[];
}
