import { IUser } from "../../domain/interfaces/IUser.interface";
import { IAuth } from "../../domain/interfaces/IAuth.interface";
import { BasicResponse } from "../types";


export interface IHelloController{
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController{

    //Read all users from database || get user by ID
    getUsers(id?: string): Promise<any>
    //Delete User by ID
    deleteUser(id?: string): Promise<any>
    //Update user by ID
    updateUser(id: string, user:any): Promise<any>
}

export interface IAuthController {
    //Register user
    registerUser(user: IUser): Promise<any>
    //Login user
    loginUser(auth: IAuth): Promise<any>
    //Logout user
    logoutUser(): Promise<any>
}