import { IsNotEmpty } from 'class-validator';

export class NewPostValidator {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    body: string;
}
