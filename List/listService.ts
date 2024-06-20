
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
    public async updateLimit(id: string, newLimit: number): Promise<number | null> {
        return await this.listDal.updateLimit(id, newLimit);
    }
    public async convertListToString(): Promise<string> {
        return  this.listDal.convertListToString();
    } 
    public async updateDescription(id: string, newDescription: string): Promise<string | null> {
        return await this.listDal.updateDescription(id, newDescription);
    }
    public async deleteList(id: string): Promise<boolean> {
        console.log("2");

        return await this.listDal.deleteListById(id)
    }
    public async addList(data:List):Promise<List>{
        return this.listDal.addList(data);
      }
}
    // public async getLists(filter: any): Promise<List[]> {
    //     return this.listDal.getLists(filter);
    // }


