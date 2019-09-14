import { Controller, Get, Post, Body, Req, Patch, Delete, Param, HttpException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { NewPostValidator } from './validators/new.post.validator';
import { IRequest } from 'src/interfaces/request.type';
import { UpdatePost } from './validators/update.post.validator';
import { IPost } from './posts.schema';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postService: PostsService,
    ) {

    }
    @Get()
    async findRecords(@Req() request: IRequest) {
        const posts = await this.postService.findAll({});
        const newPosts: IPost[] = [];
        posts.forEach((post: any) => {
            const newPost: any = {};
            newPost.user = {};
            newPost._id = post._id;
            newPost.image = post.image;
            newPost.title = post.title;
            newPost.description = post.description;
            newPost.body = post.body;
            newPost.user._id = post.userId._id;
            newPost.user.image = post.userId.image;
            newPost.user.name = post.userId.name;
            newPost.isOwner = request.user && request.user.data._id === post.userId ? true : false;
            return newPosts.push(newPost);
        });
        return {data: newPosts};
    }

    @Post()
    async createPost(
        @Body() postBody: NewPostValidator,
        @Req() request: IRequest,
        ) {
        const { user: { data: { _id } } } = request;
        const body = {...postBody, userId: _id };
        const post = await this.postService.createPost(body);
        return {data: post};
    }

    @Get(':id')
    async getOnePost(@Param('id') id: string) {
        const post = await this.postService.findOne(id);
        return {post};
    }

    @Patch(':id')
    async updatePost(
        @Param('id') id: string,
        @Body() body: UpdatePost,
        ) {
        const { nModified } = await this.postService.updatePost(id, {...body});
        if (nModified) {
            return {message: 'Successfully updated'};
        }
        throw new HttpException('Not updated', 200);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        const deleted = this.postService.deleteOne(id);
        return {message: 'succesfully deleted', post: deleted};
    }

}
