import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CustomerDTO {
    
    @IsNotEmpty()
    @IsString({ message: "Please enter a valid name" })
    @Matches(/^[A-Za-z]+$/, { message: "Please enter a valid name" })
    name: string;

    @IsNotEmpty()
    @IsNumber()
    id: number;
    
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string
}
export class CustomerUpdateDTO{
    @IsEmail()
    "username" :string;
    "address":string;
}

export class UserDTO {

    id: number;

    @IsNotEmpty()
    @IsString({ message: "Please enter a valid username" })
    // @Matches(/^[A-Za-z]+$/, { message: "Please enter a valid name" })
    username: string;
    
    @IsNotEmpty()
    @IsString({ message: "Please enter a valid name" })
    // @Matches(/^[A-Za-z]+$/, { message: "Please enter a valid name" })
    fullName: string;

    
    isActive: boolean;
}
