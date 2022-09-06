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

// - Delete User by ID
/**
 * Method to delete user by ID
 */
export const deleteUserByID = async(id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        //Delete user by ID
        return await userModel.findByIdAndDelete(id);
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting user by ID: ${error}`);
    }
}

// - Create New User
/**
 * Method to create new User
 */
export const createUser = async(user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        //Create new user
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM ERROR]: Creating new user: ${error}`);
    }
}

// - Update User by ID
/**
 * Method to update user
 */
export const updateUser = async(id: string, user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        //Update user
        return await userModel.findByIdAndUpdate(id, user);
    } catch (error) {
        LogError(`[ORM ERROR]: Updating user ${id}: ${error}`);
    }
}

//TODO:
// - Get User by Email