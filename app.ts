
import express,{Application} from "express";
import ListDal from "./List/listDal";
import ListService from "./List/listService";
import DBConnect from "./utils/db-connect";
import ListApi from "./List/ListApi";
const PORT=8080;
const LIST_API_ROUTE='/api/list';
export default class App{
    private dbConn?:DBConnect;
    private app?:Application;
    constructor(){}
    async init(){
        this.dbConn=new DBConnect();
        await this.dbConn.init();
        const listDal=new ListDal(this.dbConn);
        const listService=new ListService(listDal);
        const listApi=new ListApi(listService);
        this.app=express();
        this.app.use(express.json()); 
        this.app.use(LIST_API_ROUTE,listApi.router);
        this.app.listen(PORT,()=>{
            console.log("Server is up");
        });


    }
    
     public async terminate() {
        await this.dbConn?.terminate();
    }
}