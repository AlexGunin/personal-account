import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => TokenService))
    private tokenService: TokenService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return next(new HttpException('Пользователь не авторизован', 401));
      }
      const accessToken = authHeader.split(' ')[1];
      if (!accessToken) {
        return next(new HttpException('Пользователь не авторизован', 401));
      }
      const userData = next();
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
