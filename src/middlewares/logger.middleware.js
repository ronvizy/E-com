import fs from "fs"
//before importing winston must install winstor
import winston from 'winston';

const  fsPromise = fs.promises;

//create logger mannualy
async function log(logData){
    try{
        console.log("inside log")   
        logData = `${new Date().toString()} - ${logData}\n`; 
        console.log("log created")
        await fsPromise.appendFile('log.txt', logData);

    }catch(err){
        console.log(err)
    }
}

//using winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'request-logging' },//it is just for to know waht kind of logging we are doing
    transports: [
        new winston.transports.File({ filename: 'logs.txt' }),
      ],
})

// to make it a middleware we have to use (req, res, next)
const loggerMiddleware = async(req, res, next)=>{
    //to prevent sensitive information of the user we are not including signin end-point
    if(!req.url.includes('signin')){
        //1 log request body
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        // await log(logData);
        logger.info(logData)
    }
    next();
}

export { log, loggerMiddleware };