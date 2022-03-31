import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../token/mail.service';
import { TokenService } from '../token/token.service';
import { UserTokenDto } from './dto/user-token.dto';
import { ConfigService } from '@nestjs/config';
import { Token } from '../token/models/token.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @Inject(forwardRef(() => TokenService))
    private tokenService: TokenService,
    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async create(dto: CreateUserDto) {
    const { email, password, name } = dto;
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      const hashPassword = await bcrypt.hash(password, 5);
      const activationLink = uuidv4();

      const user = await this.userModel.create({
        ...dto,
        password: hashPassword,
        activationLink,
      });

      await this.mailService.sendActivationMail(
        email,
        `${this.configService.get('SERVER_URL')}/activate/` + activationLink,
      );

      const userDto = new UserTokenDto(user);

      const tokens = this.tokenService.generateToken({ ...userDto });
      await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      };
    } else {
      throw new HttpException('Пользователь с таким email уже существует', 422);
    }
  }

  async login(dto: LoginUserDto) {
    const { email, password } = dto;
    const user = await this.userModel.findOne({
      where: { email },
      include: [Token],
    });
    if (!user) {
      throw new HttpException('Пользователь с таким email не существует', 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Неверный пароль', 400);
    }
    const userDto = new UserTokenDto(user);
    const tokens = this.tokenService.generateToken({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    const user = await this.userModel.findOne({ where: { activationLink } });
    if (!user) {
      throw new HttpException('Некорректная ссылка для активации', 400);
    }
    return await user.update(
      { isActivated: true },
      { where: { activationLink } },
    );
  }

  async logout(refreshToken) {
    const token = await this.tokenService.removeToken(refreshToken);
    return;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new HttpException('Пользователь не авторизован', 401);
    }
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const token = await this.tokenService.getRefreshToken(refreshToken);

    if (!userData || !token) {
      throw new HttpException('Пользователь не авторизован', 401);
    }
    const user = await this.userModel.findByPk(userData.id);
    const userDto = new UserTokenDto(user);
    const tokens = this.tokenService.generateToken({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async getOne(id: string): Promise<User> {
    return await this.userModel.findByPk(id);
  }

  async delete(id: string): Promise<number> {
    return await this.userModel.destroy({ where: { id } });
  }
}
