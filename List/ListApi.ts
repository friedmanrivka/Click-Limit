import { Request, Response } from 'express';
import ListServices from './listService';
import DBConnect from '../utils/db-connect';
import ListDal from "../List/listDal";
const dbConn = new DBConnect();
await dbConn.init();
const listDal = new ListDal(dbConn);
const listServices = new ListServices(listDal);

class ListController {
    public async getLists(req: Request, res: Response): Promise<void> {
        try {
            const filter = req.query || {};
            const lists = await listServices.getLists(filter);
            res.status(200).json(lists);
        } catch (error) {
            console.error('Error fetching lists:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default new ListController();