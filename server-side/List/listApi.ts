import {AppList, List} from '../utils/type';
import {validateListData ,validateAppData,validateId}from './middlewares';

import listService from './listService';
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
        
     //#region  Get functions include getBy
        //#region GetAll
        this.router.get('/', async (req: Request, res: Response) => {
            try {
                const lists: List[] = await this.listService.getAllLists();
                res.status(200).json(lists);
            } catch (err: any) {
                res.status(500).send(err.message);
            }
        });
        //#endregion
        //#region getById/description/limit
        this.router.get('/description/:description', async (req: Request, res: Response) => {
            try {
                const { description } = req.params;
                const lists: List[] = await this.listService.getListByDescription(description);
                 if (lists.length === 0) {
                    return res.status(404)
                }

                return res.status(200).json(lists);
            } catch (err: any) {
                return res.status(500)
            }
        });
       
        this.router.get('/limit/:limit', async (req: Request, res: Response) => {
            const { limit } = req.params;
            try {
                const results = await this.listService.getListByLimit(Number(limit));
                if (results.length === 0) {
                    return res.status(404)
                }
                res.status(200).json(results);
            } catch (err: any) {
                return res.status(500)
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
                return res.status(500).send(`Server error: ${err.message}`);
            }
        });
        //#endregion
    //#endregion
    //#region UpdateByLimit/description
    //#region Update
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
    

       //#endregion 
   //#region Add
       this.router.post('/add', async (req: Request, res: Response) => {
        console.log('api')
        try {
            const listData1 = req.body;
            // const {listData1} = req.params;

            const newList=await this.listService.addList(listData1);
            res.status(201).json(newList);
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    });
    this.router.post('/:id/app', validateAppData, async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const app :AppList= req.body;
            const updatedList: List = await this.listService.addAppToList(id, app);
            res.status(200).json(updatedList);
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    });
    //#endregion
  //#region Update
    this.router.put('/id/:id/app/:appId/description', async (req: Request, res: Response) => {
        try {
            const { id, appId } = req.params;
            const { description } = req.body;
            const updatedList = await this.listService.updateAppDescription(id, appId, description);
            res.status(200).json(updatedList);
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    });
    //#endregion
    //#region DeleteList
    this.router.delete('/:id',validateId,async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            console.log("id:",id);
            const success = await this.listService.deleteList(id);
            if (success) {
                res.status(200).send('Main Record deleted');
            } else {
                res.status(404);
            }
        } catch (err: any) {
            res.status(500).send(`Failed to delete list: ${err.message}`);
        }
    });
    //#endregion
    //#region AyalaAndYeudit
    this.router.get('/convert', async (req: Request, res: Response) => {
        try {
            const result = await this.listService.convertListToString();
            res.status(200).send(result);
        } catch (err: any) {
            res.status(500).send(`Failed to convert list: ${err.message}`);
        }
    });
    this.router.get('/isStringInList/:i', async (req: Request, res: Response) => {
        try {
           
            const { i } = req.params;
            console.log(i)
            const result = await this.listService.isStringInList(i);
            res.status(200).send(result);
        } catch (err: any) {
            res.status(500).send(`Failed to convert list: ${err.message}`);
        }
    });
    this.router.get('/search/:keyword', async (req: Request, res: Response) => {
        try {
            const { keyword } = req.params;
            const matchingApps: AppList[] = await this.listService.searchAppByKeyword(keyword);
            
            // if (matchingApps.length === 0) {
            //     return res.status(404).send('No apps found with the given keyword.');
            // }

            return res.status(200).json(matchingApps);
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
    
  
  
    this.router.delete('/:listId/app/:appId', async (req: Request, res: Response) => {
        try {
            const { listId, appId } = req.params;
            const updatedList: List = await this.listService.deleteAppFromList(listId, appId);
            res.status(200).json(updatedList);
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    });
  
    }
}   


