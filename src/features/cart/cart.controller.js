import CartModel from './cart.model.js'

export default class CartController{
    add(req, res){
        console.log('inside cart add');
        const productId= req.query.productId;
        const userId = req.userId; //fetching user id from jwtAuth payload
        const quantity = req.query.quantity
        

        const error =  CartModel.add(productId, userId, quantity);
        if(error){
            res.status(400).send(error);
        }
        else{
            res.status(201).send('item added');
        }
    }

    getAll(req, res){
        console.log('Inside cart get all');
        const userId = req.userId;

        const userCart = CartModel.getAll(userId);
        if(!userCart)
            return res.status(404).send("No items found in user Card");
        else
            return res.status(200).send(userCart);
    }

    delete(req, res){

        const itemId = req.params.itemId;
        console.log("ItemId: ",itemId)
        const userId = req.userId
        const deletedItem = CartModel.delete(itemId,userId);
        console.log("deleted: ",deletedItem);
        if(typeof(deletedItem) == "object"){
            return res.status(200).send(deletedItem);
        }

        return res.status(404).send(deletedItem);

    }
}