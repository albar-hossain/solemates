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
