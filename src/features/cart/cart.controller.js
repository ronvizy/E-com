import CartModel from './cart.model.js'
import CartRepository from './cart.repository.js';
export default class CartController{
    constructor(){
        // this.cartRepository = new CartRepository();
    }
    
    async add(req, res){
        try{
            const cartRepository = new CartRepository();
            console.log('inside cart add');
            const productId= req.query.productId;
            const userId = req.userId; //fetching user id from jwtAuth payload
            const quantity = req.query.quantity
            const size = req.query.size; //fetching user id from jwtAuth payload
            const color = req.query.color

            const error = cartRepository.add(productId, userId, quantity, color, size);
            console.log("Error")
            if(error){
                res.status(400).send(error);
            }
            else{
                res.status(201).send('item added');
            }
        }catch(err){
            console.log(err)
        }
    }

    async getAll(req, res){
        try{
            const cartRepository = new CartRepository();
            console.log('Inside cart get all');
            const userId = req.userId;
            
            const userCart = await cartRepository.getAll(userId);
            if(!userCart)
                return res.status(404).send("No items found in user Card");
            else
                return res.status(200).send(userCart);
            }catch(err){

            }
    }

   async delete(req, res){
        try{
            const cartRepository = new CartRepository();
            const itemId = req.params.itemId;
            console.log("ItemId: ",itemId)
            const userId = req.userId
            const deletedItem = await cartRepository.deleteItem(userId,itemId);
            console.log("deleted: ",deletedItem);
            if(typeof(deletedItem) == "object"){
                return res.status(200).send(deletedItem);
            }

            return res.status(404).send("DATA NOT FOUND");
        }catch(err){
            console.log(err);
        }

    }
}