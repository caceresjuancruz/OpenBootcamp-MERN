import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";

//CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {

    try {
        let userModel = userEntity();

        //Search all Users
        return await userModel.find({ isDelete: false });

    } catch (error) {
        LogError(`[ORM ERROR]: Getting all Users: ${error}`);
    }
};

// - Get User by ID
/**
 * Method to obtain User by ID
 */
 export const getUserByID = async (id: string): Promise<any | undefined> => {

    try {
        let userModel = userEntity();

        //Search User by ID
        return await userModel.findById(id,{ isDelete: false });

    } catch (error) {
        LogError(`[ORM ERROR]: Getting User by ID: ${error}`);
    }
};

//TODO:
// - Get User by Email
// - Delete User by ID
// - Create New User
// - Update User by ID