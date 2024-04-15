
import UserModel from "../user/user.model.js";
import ProductModel from "../product/product.model.js";


//product id // user id// quantity

export default class CartModel{
    constructor(productId, userId, quantity, id){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.id = id
    }

    static getAll(userId){
        
        const userCart = cartItems.filter((item) => item.userId==userId)

        if(userCart)
            console.log("checking userCart: ",userCart);

        return userCart;
    }

    static add(productId, userId, quantity){

        //checking if the product and the user exist
        const product = ProductModel.get(productId);
        if(!product){
            return 'product does not exist or out of stock!'
        }
        const user= UserModel.getAll().find(u => userId == u.id);
        if(!user){
            return 'user does not exist'
        }


        //checking if the item exist in the cart then we will increase the quantity only
        const cartItemIndex=cartItems.findIndex( c => c.userId == userId && c.productId == productId)
        console.log("cart item index: ",cartItemIndex);
        if(cartItemIndex>=0){
            cartItems[cartItemIndex].quantity = parseInt(cartItems[cartItemIndex].quantity)+ parseInt(quantity);
            return cartItems[cartItemIndex] ;
        }else{ 
            const cartItem=new CartModel(
                productId,
                userId,
                quantity,
                cartItems.id=cartItems.length + 1
            );
            cartItems.push(cartItem);
            return cartItem;
        }
    }

    static delete(itemId, userId){

        const itemIndex = cartItems.findIndex(i=> i.id == itemId && i.id == userId);

        if(!itemIndex){
            return "item not found"
        }else{
            const deletedItem = cartItems[itemIndex];
            cartItems.splice(itemIndex,1);
            return deletedItem;
        }
    }


}

var cartItems=[new CartModel(1,2,1)];