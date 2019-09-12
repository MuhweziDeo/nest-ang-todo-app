import { Module } from '@nestjs/common';
import {Model} from 'mongoose';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.schema';
import { UserController } from './user.controller';

const models: Model[] = [
{name: 'User', schema: userSchema},
];
@Module({
    imports: [MongooseModule.forFeature(models)],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
