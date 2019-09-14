import * as mongoose from 'mongoose';
import { IUser } from '../user/user.schema';

export const postSchema: mongoose.Schema = new mongoose.Schema({
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
        ref: 'User',
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
    user?: IUser;
}
