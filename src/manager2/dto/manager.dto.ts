import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class ManagerDTO {
    id: number;
    @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
    @IsNotEmpty()
    fullname: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    phone: string
    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    filenames: string;
}

export class ManagerLoginDTO {
    // @IsNotEmpty()
    email: string;
    // @IsNotEmpty()
    password: string;
}
export class ManagerUpdateDTO {
    
    id: number;
    
    fullname: string;
    
    email: string;
    
    phone: string;
    
    password: string;
    
    filenames: string;
}

// export class UserDTO {

//     id: number;

//     @IsNotEmpty()
//     @IsString({ message: "Please enter a valid username" })
//     // @Matches(/^[A-Za-z]+$/, { message: "Please enter a valid name" })
//     username: string;
    
//     @IsNotEmpty()
//     @IsString({ message: "Please enter a valid name" })
//     // @Matches(/^[A-Za-z]+$/, { message: "Please enter a valid name" })
//     fullName: string;

    
//     isActive: boolean;
// }
