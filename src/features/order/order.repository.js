import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import orderModel from "./order.model.js";

export default class OrderRepository{

    constructor(){
        this.collection  = "orders";
    }

    async placeOrder(userId){
        const client =  getClient()
        const session = client.startSession();
        // transaction is a collection of all the database operations, which must be performed in such a way that either all the operations are executed or none of them 
        session.startTransaction()
        try{
            const db = getDB();
            const items = await this.getTotalAmount(userId, session);
            const totalAmount = items.reduce((acc, items) => acc+items.totalAmount, 0)
        
            // 2. Create an order record
            const newOrder = new orderModel(new ObjectId(userId), totalAmount, new Date());
            db.collection(this.collection).insertOne(newOrder, {session})

            // 3. Reduce the stock
            console.log("items: ",items)
            for(let item of items){
                console.log("reducing the stock: ", item.quantity);
                await db.collection('products').updateOne(
                    {_id: item.productID},
                    {$inc:{stock: -item.quantity}}, {session}

                )
            }
            // throw new Error("Error at place order");

            // 4. Clear the cart items
            await db.collection("cart").deleteMany(
                {userID: new ObjectId(userId)}, 
                {session}
            )
            console.log("cart Cleared");
            //commit transaction is used to commit the changes
            await session.commitTransaction()
            //end Session to terminate the session before returning
            session.endSession();
        }catch(err){
            await session.abortTransaction();
            session.endSession();
            console.log(err);
        }
    }

    async getTotalAmount(userId, session){
        userId = new ObjectId(userId);
        console.log("User: ", userId)
        const db= getDB();
       const items = await db.collection('cart').aggregate([
            {
                // 1. Get cart items of the user
                $match:{userID : userId}
            },
            // 2. get the product from products documents
            {
                $lookup:{
                    from:"products",
                    localField:"productID",
                    foreignField: "_id",
                    as:"productInfo"
                }
            },
            // 3. Unwinding the productInfo
            {
                $unwind:"$productInfo"
            },
            // 4. calculate total amount for each ordered product
            {
                $addFields:{
                    "totalAmount":{
                        $multiply:[{$toDouble: "$productInfo.price"}, "$quantity"]
                    }
                }
            }
       ], {session}).toArray();
       console.log("items: ",items);
       return items
        
    }

}