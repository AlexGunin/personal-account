import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.model';
import { Contact } from './contact.model';

@Table
export class ContactCategory extends Model {
  @ForeignKey(() => Contact)
  @Column
  contact_id: number;

  @ForeignKey(() => Category)
  @Column
  category_id: number;
}
