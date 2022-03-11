import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Contact } from './contact.model';
import { ContactSocial } from './contact_social.model';

@Table
export class Social extends Model {
  @Column
  title: string;
  @Column
  link: string;

  @BelongsToMany(() => Contact, () => ContactSocial)
  contacts: Contact[];
}
