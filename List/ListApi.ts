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
        // this.router.get ('/',async(req:Request,res:Response)=>{
        //     try{
        //         let results=Array<List>;
        //         //TODO GET ALL SORRY BUT YOU DIDNT IMPLEMENT IT IN A CORRECT WAY
        //     }
        // catch (err: any) {
        //     return res.status(500).send(err.message); // Internal Server Error
        // }
        // }) ;
        this.router.get('/description/:description', async (req: Request, res: Response) => {
            try {
                const { description } = req.params;
                const lists: List[] = await this.listService.getListByDescription(description);
                 if (lists.length === 0) {
                    return res.status(404).send('No lists found with the given description.');
                }

                return res.status(200).json(lists);
            } catch (err: any) {
                return res.status(500).send(err.message);
            }
        });
        this.router.get('/', async (req: Request, res: Response) => {
            try {
                const lists: List[] = await this.listService.getAllLists();
                res.status(200).json(lists);
            } catch (err: any) {
                res.status(500).send(err.message);
            }
        });

}
}