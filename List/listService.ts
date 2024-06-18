
import ListDal from './listDal'
import { List } from "../utils/type";

export default class ListService{
    constructor(private listDal: ListDal) {}

    public async getLists(filter: any): Promise<List[]> {
        return this.listDal.getLists(filter);
    }
}

