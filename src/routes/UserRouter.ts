import express, { Request, Response } from "express";
import { UserController } from "../controller/UserController";
import { LogInfo, LogError } from "../utils/logger";

//BodyParser to read body from request
import bodyParser from 'body-parser';
let jsonParser = bodyParser.json();

let userRouter = express.Router();


//http://localhost:8000/api/users?id=631102aa73998ad3ee8a7ae5
userRouter.route('/')

    //GET:
    .get(async(req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query param: ${id}`);

        LogInfo('Getting users from database ...');
        //Controller instance to execute method
        const controller: UserController = new UserController();
        const response: any = await controller.getUsers(id);

        //Send response to the client
        return res.send(response);
    })
    //DELETE:
    .delete(async(req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query param: ${id}`);

        const controller: UserController = new UserController();
        const response: any = await controller.deleteUser(id);

        return res.send(response);
    })
    //PUT
    .put(async(req:Request, res:Response) => {
        let id: any = req?.query?.id;
        let name: any = req?.query?.name;
        let email: any = req?.query?.email;
        let age: any = req?.query?.age;

        let user = {
            name: name,
            email: email,
            age: age
        };

        const controller: UserController = new UserController();
        const response: any = await controller.updateUser(id, user);
        return res.send(response);
    })

//Export User Router
export default userRouter;