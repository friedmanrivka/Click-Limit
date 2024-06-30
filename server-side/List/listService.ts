
import { AppList, List } from '../utils/type';
import ListDal from './ListDal';


export default class ListService{
    constructor(private listDal: ListDal) {}

  //#region GetBy(description/limit/id)
    public async getListByDescription(description: string): Promise<List[]> {
        return this.listDal.getListByDescription(description);
    }
    public async getListByLimit(limit: number) {
      
        return this.listDal.getListByLimit(limit);
    }
    public async getListById(id: string) {
       
       
        return this.listDal.getListById(id);
    }
    //#endregion
   //#region GetAll
    public async getAllLists(): Promise<List[]> {
        return this.listDal.getAllLists();
    }
    //#endregion
  
    public async updateLimit(id: string, newLimit: number): Promise<number | null> {
        return await this.listDal.updateLimit(id, newLimit);
    }
    public async convertListToString(): Promise<string> {
        return  this.listDal.convertListToString();
    } 
    public async isStringInList(searchString: string): Promise<boolean> {
        return  this.listDal.isStringInList(searchString);
    }
    public async updateDescription(id: string, newDescription: string): Promise<string | null> {
        return await this.listDal.updateDescription(id, newDescription);
    }
    //#region deleteLost
    public async deleteList(id: string): Promise<boolean> {
        return await this.listDal.deleteListById(id)
    }
    //#endregion
  
    public async addList(data:List):Promise<List>{
        return this.listDal.addList(data);
      }
     
      
     public async addAppToList(id: string, app: AppList): Promise<List> {
        return this.listDal.addAppToList(id, app);
    }
    public async updateAppDescription(id: string, appId: string, newDescription: string): Promise<List> {
        return this.listDal.updateAppDescription(id, appId, newDescription);
    }
    public async searchAppByKeyword(keyword: string): Promise<AppList[]> {
        return this.listDal.searchAppByKeyword(keyword);
    }
    public async deleteAppFromList(listId: string, appId: string): Promise<List> {
        return this.listDal.deleteAppFromList(listId, appId);
    }

}
   


