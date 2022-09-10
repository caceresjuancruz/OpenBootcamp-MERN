import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

//ORM
import { registerUser, loginUser, logoutUser, getUserByID } from "../domain/orm/User.orm";
import { IUser } from "../domain/interfaces/IUser.interface";
import { AuthResponse, ErrorResponse } from "./types";
import { IAuth } from "../domain/interfaces/IAuth.interface";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
    
    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {
        let response: AuthResponse | ErrorResponse | undefined;

        if(user){
            LogSuccess(`[/api/auth/register] Register user: ${user}`);
            await registerUser(user)
            .then((r) => {
                LogSuccess(`[/api/users] Create user: ${user}`);
                response = {
                    message: `User ${user.name} successfully created!`,
                    token: r.token
                }
            })
            .catch((err) => {
                LogError(`[CONTROLLER ERROR]: ${err}`); 
            })
        } else {
            LogError('[/api/auth/register] Register needs user entity');
            response = {
                error: '[AUTH ERROR]: Register needs user entity',
                message: 'Please, provide a user to register'
            }
        }
        return response;

    }

    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {
        let response: AuthResponse | ErrorResponse | undefined;

        if(auth){
            LogSuccess(`[/api/auth/login] Login User: ${auth.email} `);
            let data = await loginUser(auth);
            if(data.token != undefined){
                response = {
                    token: data.token,
                    message: `Welcome, ${data.user.name}`
                }
            } else {
                response = {
                    error: data.error,
                    message: data.message
                }
            }
        } else {
            LogError('[/api/auth/login] Login needs auth entity');
            response = {
                error: '[AUTH ERROR]: Need email and password to log in',
                message: 'Please, provide an email and password to login',
            }
        }
        return response;
    }

    @Post("/me")
    public async userData(@Query()id: string): Promise<any> {
        let response: any;

        if(id){
            LogSuccess(`[/api/auth/me] Get user by ID: ${id}`);
            response = await getUserByID(id);
            response.password = '';
        } else {
            LogWarning('User not found');
            response = {
                error: 'User not found',
                message: 'User not found'
            }
        }
        return response;
    }

    @Post("/logout")
    public async logoutUser(): Promise<any> {
        let response: AuthResponse | ErrorResponse | undefined;
    }
    
}