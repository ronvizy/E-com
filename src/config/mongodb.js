// import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// dotenv.config();

// const url =;
// console.log("URL: ", url);

let client;
const connectToMongoDB = async () => {
    await MongoClient.connect(process.env.DB_URL)
        .then(clientInstance => {
            client = clientInstance;
            console.log("mongodb is connected");
            createIndexes(client.db());
        })
        .catch(err => {
            console.log(err);
        })
};

export const getClient = ()=>{
    return client;
}


export const getDB = () => {
    return client.db();
}


const createIndexes = async(db)=>{
    await db.collection("products").createIndex({price: 1});
    await db.collection("products").createIndex({name: 1, category: -1});
    console.log("Indexes created");
}

//we need to start the DB as soon as the server is running so we will call this method with server
export default connectToMongoDB