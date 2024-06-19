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
        this.router.delete('/deleteRecord/:id', async (req: Request, res: Response) => {
            try {
                console.log("3");

                const { id } = req.params;
                console.log("id:",id);

                const success = await this.listService.deleteList(id);
        
                if (success) {
                    res.status(200).send('Main Record deleted');
                } else {
                    res.status(404).send('Record not found');
                }
            } catch (err: any) {
                res.status(500).send(`Failed to delete list: ${err.message}`);
            }
        });
    }

}