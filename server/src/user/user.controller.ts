import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserValidator } from './user.validator';
import { LoginValidator } from './login.validator';
import { JwtHelper } from '../helpers/jwt.helper';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async getUserRecords() {
    const users = await this.userService.findAll();
    return {data: users};
    }

    @Post()
    async createUserRecord(@Body() createBody: UserValidator) {
        try {
            const { email } = createBody;
            const existingUser = await this.userService.findOne(email);
            if (existingUser) {
                throw new HttpException(`Email ${email} already taken`, 400);
            }
            const {confirmPassword, password } = createBody;
            if (confirmPassword !== password) {
                throw new HttpException('Password and confirmPassword must match', HttpStatus.BAD_REQUEST);
            }
            const user = await this.userService.createUser(createBody);
            return {user};
        } catch (error) {
            return {error: error.message || 'Couldnot create user'};
        }

    }

    @Post('login')
    async loginUser(@Body() loginBody: LoginValidator) {
        const {email, password} = loginBody;
        const user =  await this.userService.loginUser(email, password);
        const token = await JwtHelper.createToken(user);
        return {user, token};
    }
}
