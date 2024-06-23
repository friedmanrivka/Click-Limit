
import { AppList, List } from '../utils/type';
import ListDal from "./ListDal" 


export default class ListService{
    constructor(private listDal: ListDal) {}

  
    public async getListByDescription(description: string): Promise<List[]> {
        return this.listDal.getListByDescription(description);
    }
    public async getListByLimit(limit: number) {
      
        return this.listDal.getListByLimit(limit);
    }
    public async getListById(id: string) {
     
        return this.listDal.getListById(id);
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
    //   public async addList2(data:List,app:AppList):Promise<List>{
    //     // return this.listDal.addList(data);
    //     return this.listDal.
    //   }
      public async addAppToList(id: string, app: AppList): Promise<List> {
        return this.listDal.addAppToList(id, app);
    }
    public async updateAppDescription(id: string, appId: string, newDescription: string): Promise<List> {
        return this.listDal.updateAppDescription(id, appId, newDescription);
    }
    public async searchAppByKeyword(keyword: string): Promise<AppList[]> {
        return this.listDal.searchAppByKeyword(keyword);
    }


}
    // public async getLists(filter: any): Promise<List[]> {
    //     return this.listDal.getLists(filter);
    // }


