import * as mongoose from 'mongoose';

export const postSchema: IPost = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});

export interface IPost {
    userId: string;
    title: string;
    description: string;
    image: string;
    body: string;
    isOwner?: boolean;
    _id?: string;
}
