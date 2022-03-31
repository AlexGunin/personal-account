import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './models/token.model';
import { UserTokenDto } from '../users/dto/user-token.dto';
import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

@Injectable()
export class TokenService {
  accessSecret = this.configService.get('JWT_ACCESS_SECRET');
  refreshSecret = this.configService.get('JWT_REFRESH_SECRET');

  constructor(
    @InjectModel(Token) private tokenModel: typeof Token,
    private configService: ConfigService,
  ) {}

  generateToken(payload: UserTokenDto): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(payload, this.accessSecret, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, this.refreshSecret, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string) {
    try {
      const data = jwt.verify(token, this.accessSecret);
      return data;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const data = jwt.verify(token, this.accessSecret);
      return data;
    } catch (err) {
      return null;
    }
  }

  async getRefreshToken(refresh: string): Promise<Token> {
    const token = await this.tokenModel.findOne({ where: { refresh } });
    return token;
  }

  async saveToken(user_id: number, refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ where: { user_id } });
    if (tokenData) {
      const newToken = await this.tokenModel.update(
        { refresh: refreshToken },
        { where: { user_id } },
      );
      return newToken;
    }
    const token = await this.tokenModel.create({
      user_id,
      refresh: refreshToken,
    });
    return token;
  }

  async removeToken(refresh: string): Promise<number> {
    const tokenData = await this.tokenModel.destroy({ where: { refresh } });
    return tokenData;
  }
}
