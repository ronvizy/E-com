import UserModel from "../user/user.model.js";
export default class productModel{

    constructor(id, name, desc, price, imageUrl, category, sizes){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl =imageUrl;
        this.category=category;
        this.sizes=sizes;
    }

    static get(id){
        const product = products.find((p)=> p.id == id);
        // console.log(product);
        return product;
    }

    static getALL(){
        return products;
    }

    static add(product){
        const id= products.length+1
        product= Object.assign({id},product);
        products.push(product);
        return products;
    }

    static filterProducts(minPrice, maxPrice, category){
        const filterdProducts = products.filter((p)=>{
            //using !minPrice or !maxPrice or !category if in case the query is available or asked
            return ((!minPrice || p.price >= minPrice) && (!maxPrice || p.price <= maxPrice) && (!category || p.category == category));
        });
        return filterdProducts
    }

    static rateProduct(userId, productId, rating){
        console.log("show "+userId);
        //1. Validate User and Product
        const users=UserModel.getAll();
        const user=users.find((u)=> userId == u.id);
        console.log("user: "+user);
        if(!user){
            return 'user not found'
        }
        //calidate Product
        const product = products.find((p)=> productId == p.id);
        if(!product){
            return 'product not found'
        }

        if(!product.ratings){

            product.ratings = [];
            product.ratings.push({
                userId : userId,
                rating: rating
            })
        }else{
            //check if user rating exist
            const existingRatingIndex = product.ratings.findIndex((r) => r.userId===userId);
            if(existingRatingIndex >= 0){
                product.ratings[existingRatingIndex]={//updating ratings
                    userId:userId,
                    rating:rating
                }
            }else{
                //if no existing rating of a user then add new rating in the ratings array
                product.ratings.push({
                    userId: userId,
                    rating: rating
                })
            }
        }


    }
};

//default products

var products= [
    new productModel(
        1,
        "prodct 1",
        "this is product 1",
        220,
        "https://i.stack.imgur.com/CeCrU.jpg",
        'category 2', 
        ['M', 'L', 'XL']
    ),
    new productModel(
        2,
        "prodct 2", 
        "this is product 2", 
        720, 
        "https://i.pinimg.com/236x/7c/96/82/7c9682257ed3db153fbc8c20c1b76346.jpg",
        'category 2', 
        ['S', 'L', 'XL']
    ),
    new productModel(
        3, 
        "prodct 3", 
        "this is product 3", 
        230, 
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzMkIXysEg9z_0Vg2RN27JV8tGgQS16eyiOiJehQIiY_OtbkZX9w1iBg3SERcG4GphsNA&usqp=CAUhttps://i.pinimg.com/236x/16/aa/a7/16aaa707f8fedd1beadd12fa08b5f459.jpg", 
        'category1', 
        ['M', 'S', 'XL']
    ),
    new productModel(
        4, 
        "prodct 4", 
        "this is product 4", 
        210, 
        "https://i.pinimg.com/736x/c6/a0/e6/c6a0e60889f0d969cdd15b05f8fe2fd4.jpg", 
        'category1', 
        ['M', 'L', 'XXL']
    )
]