import { Column, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Contact } from '../../contacts/models/contact.model';
import { Token } from '../../token/models/token.model';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  password: string;

  @Column
  email: string;

  @Column
  isActivated: boolean;

  @Column
  activationLink: string;

  @HasOne(() => Token)
  refresh: Token;
  @HasMany(() => Contact)
  contact: Contact[];
}
