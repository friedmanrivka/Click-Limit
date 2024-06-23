import { Collection } from "mongodb";
import { List ,AppList} from "../utils/type";
import DBConnect from "../utils/db-connect"
const LIST_COLLECTION_NAME = 'AdvertismentPlaces';
export default  class ListDal{
    private collection : Collection<List>;
    constructor(dbConn : DBConnect ){
        this.collection = dbConn.getDB().collection(LIST_COLLECTION_NAME);
    }

public async getListByDescription(description:string): Promise<List[]>  {
    try {
         const result= await this.collection.find({ description }).toArray();
        return result;
    } catch (err: any) {
        throw new Error(`Failed to get list by description from DB: ${err}`);
    }
}
public async getListByLimit(limit: number): Promise<List[]> {
    try {
        const result = await this.collection.find({ limit }).toArray();
        return result;
    } catch (err: any) {
        throw new Error(`Failed to get list by limit from DB: ${err}`);
    }
}
public async getListById(id: string): Promise<List | null> {
   
    try {
        const result = await this.collection.findOne({id });
        console.log(id);
        console.log(result);
        return result;
    } catch (err: any) {
        throw new Error(`Failed to get list by id from DB: ${err}`);
    }
}

public async getAllLists(): Promise<List[]> {
    try {
        return await this.collection.find().toArray();
    } catch (err: any) {
        throw new Error(`Failed to get all lists from DB: ${err}`);
    }
}
public async updateLimit(id: string, newLimit: number): Promise<number | null> {
    try {
        const result = await this.collection.findOneAndUpdate(
            { id: String }, // Use string ID directly
            { $set: { limit: newLimit, updatedDate: new Date() } },
            { returnDocument: 'after' } // Return the updated document
        );
      
        if (result?.limit) {
            return result.limit;
        } else {
            return null; 
        }
    } catch (err: any) {
        throw new Error(`Failed to update limit: ${err}`);
    }
}
public async updateDescription(id: string, newDescription: string): Promise<string | null> {
    try {
        const result = await this.collection.findOneAndUpdate(
            { id: String }, 
            { $set: { description: newDescription, updatedDate: new Date() } },
            { returnDocument: 'after' } 
        );
      
        if (result?.description) {
            return result.description;
        } else {
            return null; 
        }
    } catch (err: any) {
        throw new Error(`Failed to update description: ${err}`);
    }
}
public async deleteListById(_id: string): Promise<boolean> {
    try {
        const result = await this.collection.deleteOne({ _id: String });
        console.log("1");

        if (result.deletedCount === 1) {
            console.log("good")
            return true; 
        } else {

            return false; 
        }
    } catch (err: any) {
        console.log("gohod")

        throw new Error(`Failed to delete List from DB: ${err}`);
    }
}
public async convertListToString(): Promise<string> {
    try {
        const lists = await this.getAllLists();
        const items = lists.map((list: List) => {
            const appListItems = list.list.map((app: AppList) => `${app.id}: ${app.description}`).join(", ");
            return `List ID: ${list.id}, Description: ${list.description}, Limit: ${list.limit}, Creation Date: ${list.creationDate}, Updated Date: ${list.updatedDate}, Apps: [${appListItems}]`;
        });
        return items.join(" | ");
    } catch (err: any) {
        throw new Error(`Failed to convert lists to string: ${err}`);
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
    throw new Error('Failed to fetch inserted list');//TODO for tostring
    }
    return insertedList;
    }
    catch (err: any) {
    throw new Error('Failed to create list: ${err}');
  
    }
    }
    public async addAppToList(id: string, app: AppList): Promise<List> {
        const listExists = await this.getListById(id);
        if (!listExists) {
            throw new Error('No matching list found');
        }
        const appExists = await this.collection.findOne({ "list.id": app.id });
        if (appExists) {
            throw new Error('An app with the same ID already exists in a list');
        }
        try {
            const updateResult = await this.collection.updateOne(
                { id:id },
                { $push: { list: app } }
            );

            if (updateResult.modifiedCount === 0) {
                throw new Error('No matching list found or no update performed');
            }

            const updatedList = await this.collection.findOne({ id });
            if (!updatedList) {
                throw new Error('Failed to retrieve updated list');
            }

            return updatedList;
        } catch (err: any) {
            throw new Error(`Failed to add app to list in DB: ${err.message}`);
        }
    }
    public async updateAppDescription(id: string, appId: string, newDescription: string): Promise<List> {
        const listExists = await this.getListById(id);
        if (!listExists) {
            throw new Error('No matching list found');
        }

        const appExists = listExists.list.find(app => app.id === appId);
        if (!appExists) {
            throw new Error('No matching app found in the list');
        }

        try {
            const updateResult = await this.collection.updateOne(
                { id, "list.id": appId },
                {
                    $set: {
                        "list.$.description": newDescription,
                        "updatedDate": new Date()
                    }
                }
            );

            if (updateResult.modifiedCount === 0) {
                throw new Error('No matching app found or no update performed');
            }

            const updatedList = await this.collection.findOne({ id });
            if (!updatedList) {
                throw new Error('Failed to retrieve updated list');
            }

            return updatedList;
        } catch (err: any) {
            throw new Error(`Failed to update app description in DB: ${err.message}`);
        }
    }
    public async searchAppByKeyword(keyword: string): Promise<AppList[]> {
        try {
            const lists = await this.collection.find({}).toArray();
            const matchingApps: AppList[] = [];

            lists.forEach((list: List) => {
                list.list.forEach((app: AppList) => {
                    if (app.description.toLowerCase().includes(keyword.toLowerCase())) {
                        matchingApps.push(app);
                    }
                });
            });

            return matchingApps;
        } catch (err: any) {
            throw new Error(`Failed to search apps by keyword from DB: ${err}`);
        }
    }
}
    
    

// public async addList(data: List): Promise<List> {
//     try {
//     const result = await this.collection.insertOne(data);
//     if (!result.acknowledged) {
//     throw new Error('Failed to insert list');
//     }
//     const insertedList = await this.collection.findOne({ _id: result.insertedId });
//     if (!insertedList) {
//     throw new Error('Failed to fetch inserted list');
//     }
//     return insertedList;
//     }

    // public async addList(data: List): Promise<List> {
    //     try {
    //         const result = await this.collection.insertOne(data);
    //         if (!result.acknowledged) {
    //             throw new Error('Failed to insert list');
    //         }
    //         const insertedList = await this.collection.findOne({ _id: result.insertedId });
    //         if (!insertedList) {
    //             throw new Error('Failed to fetch inserted list');
    //         }
    //         return insertedList;
    //         }
    //     catch (err: any) {
    //         throw new Error(`Failed to create list: ${err}`);
    //     }
    //   }
    //   public async addAppToList(id: string, app: AppList): Promise<List> {
    //     try {
    //         const result = await this.collection.findOneAndUpdate(
    //             { id },
    //             { $push: { list: app } },
    //             { returnDocument: 'after' }
    //         );

    //         return result.value ;
    //     } catch (err: any) {
    //         throw new Error(`Failed to add app to list in DB: ${err}`);
    //     }
    // }
  
    // public async addAppToList(id: string, app: AppList): Promise<List> {
    //     try {
    //         const updateResult = await this.collection.updateOne(
    //             { id },
    //             { $push: { list: app } }
    //         );

    //         if (updateResult.modifiedCount === 0) {
    //             throw new Error('No matching list found or no update performed');
    //         }

    //         const updatedList = await this.collection.findOne({ id });
    //         if (!updatedList) {
    //             throw new Error('Failed to retrieve updated list');
    //         }

    //         return updatedList;
    //     } catch (err: any) {
    //         throw new Error(`Failed to add app to list in DB: ${err.message}`);
    //     }
    // }
    


