import {Request} from 'express';
import { IUser } from 'src/user/user.schema';

export interface IRequest extends Request {
    user: { data: IUser };
}
