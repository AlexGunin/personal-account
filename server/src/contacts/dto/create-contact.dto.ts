import { CategoryInterface } from '../interfaces/category';
import { SocialInterface } from '../interfaces/social';

export class CreateContactDto {
  readonly user_id: number;
  readonly name: string;
  readonly photo: string;
  readonly phone: string;
  readonly notion: string;
  readonly categories: CategoryInterface[];
  readonly socials: SocialInterface[];
}
