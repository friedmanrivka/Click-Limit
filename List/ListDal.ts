import { Collection,ObjectId } from "mongodb";
import { List } from "../utils/type";
import DBConnect from "../utils/db-connect"
const LIST_COLLECTION_NAME = 'AdvertismentPlaces';
export default  class ListDal{
    private collection : Collection<List>;
    constructor(dbConn : DBConnect ){
        this.collection = dbConn.getDB().collection(LIST_COLLECTION_NAME);
    }
//     public async getLists(filter: any): Promise<List[]> {
//         try {
//             return await this.collection.find(filter).toArray();
//         }
//         catch (err: any) {
//             throw new Error(`Failed to get Lists from DB: ${err}`);

//         }
// }
// public async getByDescription(description: string): Promise<List[]> {
//     try {
//       const lists = await this.collection
//         .find({ description })
//         .toArray();
//       return lists;
//     } catch (err: any) {
//       throw new Error(`Failed to get lists by description: ${err}`);
//     }
// }
public async getListByDescription(description:string): Promise<List[]>  {
    try {
         const result= await this.collection.find({ description }).toArray();
        return result;
    } catch (err: any) {
        throw new Error(`Failed to get list by description from DB: ${err}`);
    }
}
public async getAllLists(): Promise<List[]> {
    try {
        return await this.collection.find().toArray();
    } catch (err: any) {
        throw new Error(`Failed to get all lists from DB: ${err}`);
    }
}
public async deleteListById(_id: string): Promise<boolean> {
    try {
        // const objectId = new ObjectId(id); // המרת ה-string ל-ObjectId
        const result = await this.collection.deleteOne({ _id: String });
        console.log("1");

        if (result.deletedCount === 1) {
            console.log("good")
            return true; // מחיקה הצליחה
        } else {

            return false; // לא נמצא מסמך למחיקה
        }
    } catch (err: any) {
        console.log("gohod")

        throw new Error(`Failed to delete List from DB: ${err}`);
    }
}
    public async addList(data: List): Promise<List> {
        try {
            const result = await this.collection.insertOne(data);
            if (!result.acknowledged) {
                throw new Error('Failed to insert list');
            }
            const insertedList = await this.collection.findOne({ _id: result.insertedId });
            if (!insertedList) {
                throw new Error('Failed to fetch inserted list');
            }
            return insertedList;
            }
        catch (err: any) {
            throw new Error(`Failed to create list: ${err}`);
        }
      }
}
