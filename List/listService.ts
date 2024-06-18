
import ListDal from "./listDal";
import { List } from "../utils/type";
export default class ListServices{
    constructor(private listDal : ListDal){

    }
    public async getLists(filter:any) : Promise<List[]>{

        return this.listDal.getLists(filter);
    }
}
// // Import required modules
// const express = require('express');

// // Create an Express application
// const app = express();

// // Set up middleware (if needed)
// // Example middleware to parse JSON requests
// app.use(express.json());

// // Define a sample route
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// // Set the port for the server
// const PORT = process.env.PORT || 3000; // Default port 3000
