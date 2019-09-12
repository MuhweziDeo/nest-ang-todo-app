import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.schema';
import { PasswordHelper } from '../helpers/password.helper';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>) {

    }

    async findAll(): Promise<IUser[]> {
        return await this.userModel.find({}, { pasword: 0 }).exec();
    }

    async createUser(data: IUser) {
        try {
            const {password} = data;
            const hashedPassword = await PasswordHelper.hashPassword(password);
            data.password = hashedPassword;
            const user = await this.userModel.create({...data});
            return user;
        } catch (error) {
            return error;
        }
    }

    async findOne(email: string) {
        return await this.userModel.findOne({email});
    }

    async loginUser(email: string, password: string) {
        try {
            const user = await this.findOne(email) as IUser;
            if (!user) {
                throw new NotFoundException('Couldnot find user');
            }
            const verifyPassword = await PasswordHelper.verifyHash(user.password, password);
            if (!verifyPassword) {
            throw new HttpException('Couldnot verify password', HttpStatus.BAD_REQUEST);
        }
            return user;
        } catch (error) {

            return {error: error.message || 'Something went wrong'};
        }

    }
}
