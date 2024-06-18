import { Collection } from "mongodb";
import { List } from "../utils/type";
import DBConnect from "../utils/db-connect"
const LIST_COLLECTION_NAME = 'List';
export default  class ListDal{
    private collection : Collection<List>;
    constructor(dbConn : DBConnect ){
        this.collection = dbConn.getDB().collection(LIST_COLLECTION_NAME);
    }
    public async getLists(filter: any): Promise<List[]> {
        try {
            return await this.collection.find(filter).toArray();
        }
        catch (err: any) {
            throw new Error(`Failed to get Lists from DB: ${err}`);

        }
}
}