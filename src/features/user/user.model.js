import { getDB } from "../../config/mongodb.js";

export default class UserModel{
    constructor(name, email, password, type, id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }
    static getAll(){
        return users;
    }  
}

let users=[
    {
    name:"Admin user",
    email:"admin@gm.com",
    password:'pass',
    type: 'seller',
    id: 1
    },
    {
    name:"customer user",
    email:"customer@gm.com",
    password:'pass',
    type: 'customer',
    id: 2
    }   
]