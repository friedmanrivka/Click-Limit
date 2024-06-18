import { Collection } from "mongodb";
import DBConnect from "../utils/db-connect";
import{AppList} from "../utils/type";

const APP_LIST_COLLECTIOIN_NAME = 'AppList';
export default class AppListDal{

private collection:Collection<AppList>;
constructor(dbConn:DBConnect){
   this.collection=dbConn.getDB().collection(APP_LIST_COLLECTIOIN_NAME);
}
}