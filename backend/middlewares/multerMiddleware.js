const multer = require("multer");
const path= require("path");

//Storage configuration
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads"); //folder where files will be stored
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    },
});

//File filer to accept only images
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true);
    }else{
        cb(new Error("Only images are allowed"), false)
    }
};

//Initialise multer instance
const upload = multer({storage,fileFilter});

module.exports=upload;