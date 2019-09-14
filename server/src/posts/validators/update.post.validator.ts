import { IsString, IsEmpty, IsOptional } from 'class-validator';

export class UpdatePost {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    image: string;

    @IsOptional()
    @IsString()
    body: string;
}
