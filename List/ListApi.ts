// import { Request, Response } from 'express';
// import ListServices from './listService';
// import DBConnect from '../utils/db-connect';
// import ListDal from "./listDal";
// const dbConn = new DBConnect();
// await dbConn.init();
// const listDal = new ListDal(dbConn);
// const listServices = new ListServices(listDal);

// class ListController {
//     public async getLists(req: Request, res: Response): Promise<void> {
//         try {
//             const filter = req.query || {};
//             const lists = await listServices.getLists(filter);
//             res.status(200).json(lists);
//         } catch (error) {
//             console.error('Error fetching lists:', error);
//             res.status(500).json({ message: 'Internal Server Error' });
//         }
//     }
// }

// export default new ListController();
import {List} from '../utils/type';
import listService from './listService';
import {Router,Request,Response} from 'express';
export default class ListApi{
    public router:Router;
    constructor(private listService: listService) {
        this.router = Router();
        this.setRoutes();
    }
    private setRoutes()
    {
        this.router.get ('/',async(req:Request,res:Response)=>{
            try{
                let results=Array<List>;
                //TODO GET ALL SORRY BUT YOU DIDNT IMPLEMENT IT IN A CORRECT WAY
            }
        catch (err: any) {
            return res.status(500).send(err.message); // Internal Server Error
        }
        }) ;
    }
   
}
