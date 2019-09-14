import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LoginMiddleware } from './login.middleware';
import { PostsModule } from './posts/posts.module';
import { IsOwnerMiddleware } from './is-owner.middleware';
import { IsAuthenticatedOrReadOnlyMiddleware } from './is-authenticated-or-read-only.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoginMiddleware)
    .forRoutes(
      { path: 'user', method: RequestMethod.GET },
      {path: 'user/posts', method: RequestMethod.GET},
      {path: 'posts/:id', method: RequestMethod.PATCH},
      {path: 'posts/:id', method: RequestMethod.DELETE},
      );
    consumer
    .apply(IsOwnerMiddleware)
    .forRoutes({path: 'posts/:id', method: RequestMethod.PATCH},
    {path: 'posts/:id', method: RequestMethod.DELETE});
    consumer
    .apply(IsAuthenticatedOrReadOnlyMiddleware)
    .forRoutes(
      {path: 'posts', method: RequestMethod.GET},
    );
}
}
