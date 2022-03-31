import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

@Table
export class Token extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  refresh: string;

  @BelongsTo(() => User)
  user: User;
}
