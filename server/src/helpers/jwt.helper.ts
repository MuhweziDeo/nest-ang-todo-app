import * as jwt from 'jsonwebtoken';
import { HttpException } from '@nestjs/common';

export class JwtHelper {

    static async createToken(payload: any) {
        const token =  jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: payload,
        }, 'secret');
        return token;
    }

    static async decodeToken(token: string) {
        try {
            const decoded = jwt.verify(token, 'secret');
            return decoded;
        } catch (error) {
            throw new HttpException(error.message || 'Couldnot decode the token', 500);
        }
    }
}
