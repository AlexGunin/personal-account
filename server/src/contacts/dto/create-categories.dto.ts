import { CategoryInterface } from '../interfaces/category';

export class CreateCategoriesDto {
  categories: CategoryInterface[];
  contact_id: number;
}
