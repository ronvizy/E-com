import multer from "multer";


const storageConfiguration = multer.diskStorage({
    destination:(req, file, cb)=>{
        //cb is a callback function; can name it anything that suits
        cb(null, './uploads/');//null is to assure that there are no errors if there might be errors then we need to mention error object
    },
    filename:(req, file, cb)=>{
        //creating a custom file name so that two different image files do not get mixed up on the server
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
})
export const uploadFile =  multer({
    storage:storageConfiguration
});
