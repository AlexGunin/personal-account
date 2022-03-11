import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Contact } from '../../contacts/models/contact.model';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  password: string;

  @Column
  email: string;

  @HasMany(() => Contact)
  contact: Contact[];
}
