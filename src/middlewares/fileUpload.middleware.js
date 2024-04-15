import multer from "multer";

const storageConfiguration= multer.diskStorage({
    //1st where to save the data
    destination: (req, file, cb)=>{
        cb(null, './uploads');
    }
},
{
    //2 what should be the name of the file
    filename: (req, file, cb)=>{
        const name = Date.now() + '-' + file.orogranlname;
        cb(null, name);
    }
})

export const uploadFile = multer({
    storage: storageConfiguration
})