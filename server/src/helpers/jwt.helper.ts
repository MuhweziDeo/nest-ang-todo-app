import * as jwt from 'jsonwebtoken';

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
        } catch (error) {
            return error;
        }
    }
}
