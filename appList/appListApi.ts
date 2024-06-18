import {Router,Request,Response} from 'express'
import AppListService from './AppListService';

export default class AppListApi{
    public router:Router;
    constructor(private appListService:AppListService){
        this.router=Router();
        this.setRoutes()
    }
private setRoutes(){
    this.router.get()
    
}
}