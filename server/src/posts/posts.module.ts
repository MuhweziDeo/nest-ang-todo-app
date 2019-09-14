import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { postSchema } from './posts.schema';

const models: Model[] = [
  {name: 'Post', schema: postSchema},
]
@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [MongooseModule.forFeature(models)],
  exports: [PostsService],
})
export class PostsModule {}
