import {IsEmail, IsNotEmpty} from 'class-validator';

export class UserValidator {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmPassword: string;
}
