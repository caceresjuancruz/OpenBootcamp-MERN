import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

//ORM
import { getAllUsers, getUserByID, deleteUserByID, createUser, updateUser } from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    
    /**
     * Endpoint to get all users from database or user by id
     * @param {string} id Id of user to retrieve (optional)
     * @returns All users or user found by ID
     */
    @Get("/")
    public async getUsers(@Query()id?: string): Promise<any> {
        
        let response: any = "";
        if(id){
            LogSuccess(`[/api/users] Get user by ID: ${id}`);
            response = await getUserByID(id);
        } else {
            LogSuccess('[/api/users] Get all users Request');
            response = await getAllUsers();
        }
        return response;
    }

    /**
     * Endpoint to delete user by ID
     * @param {string} id Id of user to delete (optional)
     * @returns Message informing if deletion was correct
     */
    @Delete("/")
    public async deleteUser(@Query()id?: string): Promise<any> {
        
        let response: any = "";
        if(id){
            LogSuccess(`[/api/users] Delete user by ID: ${id}`);
            await deleteUserByID(id).then((r) =>{
                response = {
                    message: `User with id ${id} successfully deteled!`
                }
            });
        } else {
            LogWarning(`[/api/users] Delete user without ID!`);
            response = {
                message: "Provide User ID to delete!"
            };
        }
        return response;
    }

    /**
     * Endpoint to update an user by ID
     * @param {string} id Id of user to update (optional)
     * @returns message informing if update of user was correct 
     */
    @Put("/")
    public async updateUser(@Query()id:string, user:any): Promise<any> {
        let response: any = "";
        if(id){
            await updateUser(id, user)
            .then((r) => {
                LogSuccess(`[/api/users] Update user ${id} with: ${user}`);
                response = {
                    message: `User ${id} successfully updated!`
                }
            })
            .catch((err) => {
                LogError(`[CONTROLLER ERROR]: ${err}`); 
            })
        } else {
            LogWarning(`[/api/users] Update user without ID!`);
            response = {
                message: "Provide User ID to update!"
            };
        }
        
        return response;
    }
        
}