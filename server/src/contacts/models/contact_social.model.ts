import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Contact } from './contact.model';
import { Social } from './social.model';

@Table
export class ContactSocial extends Model {
  @ForeignKey(() => Contact)
  @Column
  contact_id: number;

  @ForeignKey(() => Social)
  @Column
  social_id: number;

  @Column
  link: string;
}
