import { BasicResponse } from "@/controller/types";
import express, { Request, Response } from "express";
import { HelloController } from "../controller/HelloController";
import { LogInfo } from "../utils/logger";

let helloRouter = express.Router();

//http://localhost:8000/api/hello?name=NOMBRE/
helloRouter.route('/')
    //GET:
    .get(async (req: Request, res: Response) => {
        let name: any = req?.query?.name;
        LogInfo(`Query param: ${name}`);

        //Controller instance to execute method
        const controller: HelloController = new HelloController();
        const response: BasicResponse = await controller.getMessage(name);

        //Send response to the client
        return res.send(response);
    })

//Export Hello Router
export default helloRouter;