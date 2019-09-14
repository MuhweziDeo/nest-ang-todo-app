import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { IRequest } from './interfaces/request.type';
import { PostsService } from './posts/posts.service';

@Injectable()
export class IsOwnerMiddleware implements NestMiddleware {
  constructor(private readonly service: PostsService) {}
  async use(req: IRequest, res: any, next: () => void) {
    const {params: {id}, user: {data: {_id}}} = req;
    const post = await this.service.findOne(id);
    if (post.userId !== _id) {
      throw new HttpException('Permission Denied', 403);
    }
    next();
  }
}
