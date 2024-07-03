import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export default class CartItemsRepository {
    constructor() {
        this.collection = "cartItems";
    }

    async add(productID, userID, quantity) {
        try {
            const db = getDB();
            // quantity = Number(quantity);
            const collection = db.collection(this.collection);
            const id = await this.getNextCounter(db);
            // Insert or update the document
            const result = await collection.updateOne(
                { productID: new ObjectId(productID), userID: new ObjectId(userID) },
                {
                    $setOnInsert: { _id: id },
                    $inc: { quantity: quantity }
                },
                { upsert: true }
            );
            console.log(`Update result: ${JSON.stringify(result)}`);
        } catch (err) {
            console.log("if error: ",err);
            // throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    async get(userID) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find({ userID: new ObjectId(userID) }).toArray();
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async delete(userID, cartItemID) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.deleteOne({ _id: new ObjectId(cartItemID), userID: new ObjectId(userID) });
            return result.deletedCount > 0;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getNextCounter(db) {
        const resultDocument = await db.collection("counters").findOneAndUpdate(
            { _id: 'cartItemId' },
            { $inc: { value: 1 } },
            { returnDocument: 'after', upsert: true }
        );

        if (!resultDocument.value) {
            // Handle the case where the document was not found and not updated correctly
            throw new Error('Failed to update or create counter document.');
        }

        console.log(resultDocument);
        return resultDocument.value.value;
    }
}
