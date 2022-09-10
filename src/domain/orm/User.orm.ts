import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.SECRET || 'MYSECRET';

//BCRYPT
import bcrypt from 'bcrypt';

//JWT
import jwt from 'jsonwebtoken';
import e, { response } from "express";

//CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {

    try {
        let userModel = userEntity();

        //Search all Users
        const response: any[] = await userModel.find({ isDelete: false });
        response.forEach( (e) => { e.password = '' } );
        return response;
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
        const response = await userModel.findById(id,{ isDelete: false });
        response.password = ''
        return response;
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

//Register User
export const registerUser = async(user: IUser): Promise<any | undefined> => {
    createUser(user);
}

//Login User
export const loginUser = async(auth: IAuth): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        let userFound: IUser | undefined = undefined;
        let token: string | undefined = undefined;

        await userModel.findOne({email: auth.email}).then((user: IUser) => {
            userFound = user;
        })
        .catch((error) => {
            console.error(`[ERROR in ORM]: User Not Found`);
            throw new Error(`[ERROR in ORM]: User Not Found`);
        })

        let validPassword = bcrypt.compareSync(auth.password, userFound!.password);
        if(!validPassword){
            //return error 401 NOT AUTHORISED
            return {
                error:`[ERROR in ORM]: Password not valid`,
                message: `[ERROR in ORM]: Password not valid`
            }
        }

        //Create JWT
        //'SECRET' must be in .env
        token = jwt.sign({email: userFound!.email}, secret, {
            expiresIn: "2h"
        });

        return {
            token: token,
            user: userFound
        }
    } catch (error) {
        LogError(`[ORM ERROR]: Loggin user: ${error}`);
    }
}

//Logout User
export const logoutUser = async(): Promise<any | undefined> => {

}

