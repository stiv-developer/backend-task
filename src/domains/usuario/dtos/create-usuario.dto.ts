import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { TaskEntity } from "src/domains/task/entities/task.entity";


export class CreateUsuarioDto {

    @IsEmail()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    password: string;


    @IsOptional()
    @IsString()
    token?: string;
}