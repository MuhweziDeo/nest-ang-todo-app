import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { JwtHelper } from './helpers/jwt.helper';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
      const {headers: {authorization}} = req;
      if (!authorization) {
      throw new HttpException('Missing Authorization header', 401);
      }
      const user = await JwtHelper.decodeToken(authorization);
      req.user = user;
      next();
  }
}
