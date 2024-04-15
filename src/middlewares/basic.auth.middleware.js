
import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next)=>{

    //1 check if auth header is empty
    const authHeader = req.headers["authorization"];//when we send out credentials those credentials are part of req.headers; headers is an array because, multiple heares could be sent from the client to server and vice versa so req.headers['authorization']
    if(!authHeader){
        return res.status(401).send("No authorization details found");
    }

    console.log(authHeader);

    //the credentials send from client and recieved in server They will be encoded with base64; base64 is a encodding technique which encodes the data that is transfered from client to server
    //2. extract the credentials. //header data will look something like this: [Basic qwertyusdfgh345678cvdfg]
    const base64credentials = authHeader.replace('Basic', '');
    console.log(base64credentials);

    //decoding the credentials will give us the actual username or email and password which client has sent
    //3. decode the crentials
    const decodedCreds = Buffer.from(base64credentials, 'base64').toString('utf-8');
    console.log(decodedCreds);

    const creds = decodedCreds.split(':');

    //checking if the user exists
    const users = UserModel.getAll().find((u) => u.email == creds[0] && u.password == creds[1]);

    if(users){
        next()//calling the next middle ware in the pipeline
    }
    else{
        res.status(401).send("Incorrect Credentials")
    }
}
export default basicAuthorizer;