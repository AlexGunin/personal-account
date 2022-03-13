import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.model';
import { ContactCategory } from './contact_category.model';
import { User } from '../../users/models/user.model';
import { Social } from './social.model';
import { ContactSocial } from './contact_social.model';

@Table
export class Contact extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;
  @Column
  name: string;
  @Column
  photo: string;
  @Column
  phone: string;
  @Column
  notion: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Category, () => ContactCategory)
  categories: Category[];

  @BelongsToMany(() => Social, () => ContactSocial)
  socials: Social[];
}
