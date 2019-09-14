import * as bcrypt from 'bcrypt';

const saltRounds = 10;
export class PasswordHelper {
    static async hashPassword(password: string): Promise<string> {
        const hashed = await bcrypt.hash(password, saltRounds);
        return hashed;
    }

    static async verifyHash(hashedPassword: string,
                            plainPassword: string): Promise<boolean> {
        const verifyPassword = await bcrypt.compare(plainPassword, hashedPassword);
        return verifyPassword;
    }
}
