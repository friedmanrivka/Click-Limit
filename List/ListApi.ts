import {List} from '../utils/type';
import validateListData from './middlewares';
import listService from './listService';

// import { validateListData } from '../list/middlweare/validateListData'; 
import {Router,Request,Response} from 'express';
import ListService from './listService';
export default class ListApi{
    public router:Router;
    constructor(private listService: ListService) {
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
        this.router.get('/limit/:limit', async (req: Request, res: Response) => {
            const { limit } = req.params;
            try {
                const results = await this.listService.getListByLimit(Number(limit));
                if (results.length === 0) {
                    return res.status(404).send('No lists found with the given limit.');
                }
                res.status(200).json(results);
            } catch (err: any) {
                return res.status(500).send(err.message);
            }
        });
       
        this.router.get('/id/:id', async (req: Request, res: Response) => {
          
            try {
                const { id } = req.params;
                const list = await this.listService.getListById(id);
                
                if (!list) {
                    return res.status(404).send('List not found.');
                }
        
                return res.status(200).json(list);
            } catch (err: any) {
                return res.status(500).send(err.message);
            }
        });
        this.router.get('/convert', async (req: Request, res: Response) => {
            try {
                const result = await this.listService.convertListToString();
                res.status(200).send(result);
            } catch (err: any) {
                res.status(500).send(`Failed to convert list: ${err.message}`);
            }
        });
        // this.router.delete('/deleteRecord/:id', async (req: Request, res: Response) => {
        //     try {
        //         console.log("3");

        //         const { id } = req.params;
        //         console.log("id:",id);

        //         const success = await this.listService.deleteList(id);
        
        //         if (success) {
        //             res.status(200).send('Main Record deleted');
        //         } else {
        //             res.status(404).send('Record not found');
        //         }
        //     } catch (err: any) {
        //         res.status(500).send(`Failed to delete list: ${err.message}`);
        //     }
        // });
        this.router.put('/:id/limit', async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { limit } = req.body;
                console.log(limit);
                const updatedLimit = await this.listService.updateLimit(id, limit);
                if (updatedLimit !== null) {
                    res.status(200).json({ updatedLimit });
                } else {
                    res.status(404).json({ message: 'List not found' });
                }
            } catch (err: any) {
                console.error(`Error updating limit for ID: `, err); // Log for debugging
                res.status(500).send(err.message); // Internal Server Error
            }
        });
        this.router.put('/:id/description', async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { description } = req.body;
                console.log(description);
                const updatedDescription = await this.listService.updateDescription(id, description);
                if (updatedDescription !== null) {
                    res.status(200).json({ updatedDescription });
                } else {
                    res.status(404).json({ message: 'List not found' });
                }
            } catch (err: any) {
                console.error(`Error updating limit for ID: `, err); // Log for debugging
                res.status(500).send(err.message); // Internal Server Error
            }
        });
    

    this.router.post('/', validateListData, async (req: Request, res: Response) => {
        console.log('api')
        try {
            const listData = res.locals.listData;
       
            const newList=await this.listService.addList(listData    );
            res.status(201).json(newList);
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    });
  
    }
}    