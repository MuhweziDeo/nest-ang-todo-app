import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { JwtHelper } from './helpers/jwt.helper';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class IsAuthenticatedOrReadOnlyMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    try {
      const {headers: {authorization}} = req;
      if (!authorization) {
      next();
      }
      const user = await JwtHelper.decodeToken(authorization);
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        next();
      }
    }

  }
}
