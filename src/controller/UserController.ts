import { Get, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError } from "../utils/logger";

//ORM
import { getAllUsers } from "../domain/orm/User.orm";
import { getUserByID } from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {

    /**
     * Endpoint to get all users from database or user by id
     */
    @Get("/")
    public async getUsers(@Query()id?: string): Promise<any> {
        
        let response: any = "";
        if(id){
            LogSuccess(`[/api/users/id] Get user by ID: ${id}`);
            response = await getUserByID(id);
        } else {
            LogSuccess('[/api/users] Get all users Request');
            response = await getAllUsers();
        }
        return response;
    }

}