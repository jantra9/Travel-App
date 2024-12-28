const dotenv=require("dotenv").config();
const connectDb=require("./config/dbConnection")
const express=require("express");
const cors= require("cors");
const {createAccount,loginUser, getUser}=require("./controllers/userController");
const validateToken = require("./middlewares/validateTokenHandler");
const {addStory,getStories, addImage, deleteImage,editStory, deleteStory, isFavorite, searchStory, filterDate} = require("./controllers/storyController");
const upload = require("./middlewares/multerMiddleware");
const path= require("path")

//Dynamic port config
const PORT = process.env.PORT || 8000;
connectDb();

const app= express();

app.use(express.json());

app.use(cors({origin:"*"}));

//test
app.get("/test",(req,res)=>{
    res.status(200).json({Message:"ok"})
})

//Create an acc
app.post("/create-account",createAccount)

//Log in
app.post("/login",loginUser)

//Current user
app.get("/get-user",validateToken,getUser)

//Add travel story
app.post("/add-story",validateToken,addStory)

//Get all travel stories
app.get("/get-stories",validateToken,getStories)


//Route to handle image upload
app.post("/upload-image",upload.single("image"),addImage)

//Route to delete image from upload folder
app.delete("/delete-image",deleteImage)

//Serve static files from the uploads and assets directory
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use("/assets",express.static(path.join(__dirname,"assets")))

//Edit travel story
app.post("/edit-story/:id",validateToken, editStory)

//Delete story
app.delete("/delete-story/:id", validateToken, deleteStory)

//Update is favorite story
app.post("/is-favorite/:id", validateToken, isFavorite)

//Search stories
app.get("/search-story",validateToken ,searchStory)

//Filter by date
app.get("/filter-story",validateToken,filterDate)


app.listen(PORT,()=>{

    console.log(`Request is running at ${PORT}`)
});

module.exports=app