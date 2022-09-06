import { BasicResponse } from "../types";

export interface IHelloController{
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController{

    //Read all users from database || get user by ID
    getUsers(id?: string): Promise<any>
    //Delete User by ID
    deleteUser(id?: string): Promise<any>
    //Create new User
    createUser(user: any): Promise<any>
    //Update user by ID
    updateUser(id: string, user:any): Promise<any>
}