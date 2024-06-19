import { MongoClient } from "mongodb";
const DB_PASSWORD = 'ujVEmuTPI26mYNbs';
const DB_NAME = 'Applications';
const DB_URL = `mongodb+srv://sarahveg04:${DB_PASSWORD}@limitclickproject.amarksc.mongodb.net/?retryWrites=true&w=majority&appName=limitclickproject`
export default class DBConnect {
    private dbConn: MongoClient;
    constructor() {
        this.dbConn = new MongoClient(DB_URL);
    }
    public async init() {
        const res = await this.dbConn.connect();
        console.log("DB is connected");
    }
    public getDB(dbName: string = DB_NAME) {
        return this.dbConn.db(dbName);
    }
    public async terminate() {
        await this.dbConn.close();
        console.log("DB is closed");
    }
}


