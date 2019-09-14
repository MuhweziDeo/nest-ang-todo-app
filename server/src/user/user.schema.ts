import * as mongoose from 'mongoose';

export const userSchema: IUser = new mongoose.Schema({
name: {
    type: String,
    required: true,
},
createdAt: {
    type: String,
    default: Date.now(),
},
updatedAt: {
    type: String,
},
email: {
    type: String,
    required: true,
},
password: {
    type: String,
    required: true,
},
image: {
    type: String,
    required: true,
},
});

export interface IUser {
    name: string;
    email: string;
    password: string;
    _id?: string;
    image: string;
}
