
import multer from "multer";

const storageConfig = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "public/images/")
    },
    filename : (req, file, cb) => {
        const uniqueName = Date.now()+"-"+file.originalname

        cb(null, uniqueName) 
    }
});

export const uploadFile = multer({
    storage : storageConfig
})