
import { List } from '../utils/type';
import ListDal from './ListDal';


export default class ListService{
    constructor(private listDal: ListDal) {}

    // public async getByDescription(description: string): Promise<List[]> {
    //     return await this.listDal.getByDescription(description);
    //   }
    public async getListByDescription(description: string): Promise<List[]> {
        return this.listDal.getListByDescription(description);
    }
    public async getAllLists(): Promise<List[]> {
        return this.listDal.getAllLists();
    }
    public async deleteList(id: string): Promise<boolean> {
        console.log("2");

        return await this.listDal.deleteListById(id)
    }
}
    // public async getLists(filter: any): Promise<List[]> {
    //     return this.listDal.getLists(filter);
    // }


