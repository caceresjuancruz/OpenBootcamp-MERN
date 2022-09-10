import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { LogInfo, LogError } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

//BCRYPT for passwords
import bcrypt from 'bcrypt';

//MiddleWare
import { verifyToken } from '../middlewares/verifyToken.middleware';

//BodyParser (Read JSON from body in requests)
import bodyParser from 'body-parser';
let jsonParser = bodyParser.json(); // Middleware to read json in BODY

let authRouter = express.Router();

authRouter.route('/register')
    .post(jsonParser, async(req:Request, res:Response) => {
        
        let {name, email, age, password} = req?.body;

        if(name && email && age && password ){
            
            //Obtain the password in the request and cypher
            let hashedPassword = bcrypt.hashSync(req.body.password, 8);

            let user: IUser = {
                name,
                email,
                age,
                password: hashedPassword
            };

            const controller: AuthController = new AuthController();
            const response: any = await controller.registerUser(user);
            return res.status(200).send(response);
        } else {
            res.status(400).send({
                message: '[ERROR User data missing]: No user can be registered'
            });
        }
    })


authRouter.route('/login')
    .post(jsonParser, async(req:Request, res:Response) => {
        
        let {email, password} = req?.body;

        if(email && password ){
            
            let auth: IAuth = {
                email: email,
                password: password
            };
            
            const controller: AuthController = new AuthController();
            const response: any = await controller.loginUser(auth);
            return res.status(200).send(response);
        } else {
            res.status(400).send({
                message: '[ERROR User data missing]: No user can be logged in'
            });
        }
        

    })
    
//Route protected by VERIFY TOKEN Middleware
authRouter.route('/me')
    .get(verifyToken, async(req:Request, res:Response) => {
        
        //Obtain ID of user
        let id: any = req?.query?.id;

        if(id){

            const controller: AuthController = new AuthController();
            const response: any = await controller.userData(id);

            //If user is authorised:
            return res.status(200).send(response);
 
        } else {
            return res.status(404).send({
                message: 'You are not authorised to perform this action'
            })
        }



    })

authRouter.route('/logout')
    .post(async(req:Request, res:Response) => {
        
    })


//Export Auth Router
export default authRouter;