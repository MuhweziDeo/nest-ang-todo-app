import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPost } from './posts.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Post') private readonly postModel: Model<IPost>,
    ) {}

    async findAll(options: any): Promise<IPost[]> {
        const posts = await this.postModel.find(options).exec();
        return posts;
    }

    async createPost(data: IPost): Promise<any> {
        const post = await this.postModel.create({...data});
        return post;
    }

    async findOne(id: string): Promise<IPost> {
        const post = await this.postModel.findOne({_id: id});
        if (!post) {
            throw new NotFoundException();
        }
        return post;
    }

    async updatePost(id: string, updateBody: any) {
        const updated = this.postModel.updateOne({_id: id}, {...updateBody});
        return updated;
    }

    async deleteOne(id: string) {
        const deleted = await this.postModel.findByIdAndDelete(id);
        return deleted;
    }
}
