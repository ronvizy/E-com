import jwt from 'jsonwebtoken'

const jwtAuth =(req, res, next)=>{
    // 1. Read the token
    const token = req.headers["authorization"];
    // 2. If no token, return the error
    if(!token){
        console.log("token: "+token);
        return res.status(401).send("Unauthorized")
    }
    // 3. check if token is valid
    try{
        const payload = jwt.verify(
            token,
            'uay1sVck8BD0cpbdBo8eydOpgE8xkifl'
        );
        req.userId= payload.userId; //attaching userId coming in payload to userId query parameter in the url request
        console.log(payload);
    }
    // 4. return error
    catch(err){
        console.log("error: ",err);
        return res.status(401).send("Unauthorized");
    };
    

    // 5. call next middleware
    next();

}
export default jwtAuth;