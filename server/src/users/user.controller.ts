import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { Response, Request } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async registration(@Res() response: Response, @Body() dto: CreateUserDto) {
    try {
      const data = await this.userService.create(dto);
      response.cookie('refreshToken', data.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      return response.json({ user: data.user, accessToken: data.accessToken });
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Post('/signin')
  async login(
    @Res() response: Response,
    @Body() dto: { email: string; password: string },
  ) {
    try {
      const data = await this.userService.login(dto);
      response.cookie('refreshToken', data.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      return response.json({ user: data.user, accessToken: data.accessToken });
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Get('/activate/:link')
  @Redirect('http://localhost:3000', 301)
  async activate(@Param('link') link: string) {
    try {
      await this.userService.activate(link);
      return;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Get('/logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    try {
      const { refreshToken } = request.cookies;
      const token = await this.userService.logout(refreshToken);
      response.clearCookie('refreshToken');
      return response.sendStatus(200);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Get('/refresh')
  refresh(@Body() dto) {
    try {
    } catch (err) {}
  }

  @Get('/users')
  getAll(): Promise<User[]> | [] {
    return this.userService.getAll();
  }

  @Get('/users/:id')
  getOne(@Param('id') id: string): Promise<User> | null {
    return this.userService.getOne(id);
  }
}
