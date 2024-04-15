
export default class UserModel{
    constructor(name, email, password, type, id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = id;
    }
    static getAll(){
        return users;
    }

    static signUp(name, email, password, type){
        const id= users.length+1;
        const newUser = {name, email, password, type, id};
        // console.log(newUser);
        users.push(newUser);
        console.log(users);
        return newUser;
    }

    static signIn(email, password){
        const user = users.find((user)=> user.email === email && user.password === password);
        return user;
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