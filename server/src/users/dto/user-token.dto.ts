export class UserTokenDto {
  email: string;
  id: number;
  isActivated: boolean;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }
}
