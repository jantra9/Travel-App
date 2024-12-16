const asyncHandler=require("express-async-handler");
const TravelStory= require("../models/travelStory.model");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload=multer({storage:storage});
const path= require("path");
const fs= require("fs");


//Add a new story
const addStory = asyncHandler(async(req,res)=>{
    const {title,story,visitedLocation,imageUrl,visitedDate}= req.body;
    const {userID}=req.user

   //validate required fields
   if(!title || !story || !visitedLocation){
    return res.status(400).json({error:true, message: "All fields are required!"})
   } 

   //Covert vistedDate from milliseconds to Date object
   const parsedVisitedDate= new Date(parseInt(visitedDate));
   if (isNaN(parsedVisitedDate.getTime())) {
     return res.status(400).json({ error: true, message: "Invalid visited date format!" });
   }

   //Add the new story
   const newStory= await TravelStory.create({
        title,
        story,
        visitedLocation,
        userId:userID,
        imageUrl,
        visitedDate:parsedVisitedDate,
        createdOn:Date.now(),
   })
   res.status(200).json({message:"Story is added sucessfully"});
})

//Get all stories
const getStories= asyncHandler(async(req,res)=>{
     const stories= await TravelStory.find({userId:req.user.userID});
     res.status(200).json(stories);
     console.log("All of the stories")
})

//Add image
const addImage = asyncHandler(async (req, res) => {
     if (!req.file) {
         return res.status(400).json({ message: "No image to upload" });
     }
     
     // Multiple fallback methods to generate URL
     const getImageUrl = (req, filename) => {
         // Method 1: Use request host
         if (req.protocol && req.get('host')) {
             return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
         }
         
         // Method 2: Use environment variable
         if (process.env.BASE_URL) {
             return `${process.env.BASE_URL}/uploads/${filename}`;
         }
         
         // Method 3: Fallback to default
         return `http://localhost:8000/uploads/${filename}`;
     };
     
     const imageUrl = getImageUrl(req, req.file.filename);
     
     res.status(201).json({ imageUrl });
 });

 //Delete image
 const deleteImage=asyncHandler(async(req,res)=>{
     const {imageUrl}= req.query;

     //Extract the file from the imageUrl
     const filename= path.basename(imageUrl);
     
     //Define the file path
     const filePath= path.join(__dirname,"..","uploads",filename)

     if (!imageUrl){
          return res.status(400).json({error:true,message:"imageUrl parameter is required"})
     }
     //Check if the file exists
     if(fs.existsSync(filePath)){
          //Delete the file from the uploads folder
          fs.unlinkSync(filePath);
          res.status(200).json({message:"Image deleted successfully"})
     } else {
          res.status(200).json({error:true, message:"Image not found"})
     }
 })

 //Edit story
 const editStory=asyncHandler(async(req,res)=>{
    // Use environment variable for production base URL
    const baseUrl = process.env.BASE_URL || `http://localhost:8000`; 
    //Extract data from params and req.body
    const {id}= req.params;
    const {title, story, visitedLocation, imageUrl,visitedDate}= req.body;
    const print= req.body;
    const {userID}= req.user;
    if (!title || !story || !visitedDate || !visitedLocation){
        return res.status(400).json({message:"All fields are required"})
    }
    const parsedVisitedDate= new Date(parseInt(visitedDate))
    const travelStory= await TravelStory.findOne({_id:id, userId:userID});
    if(!travelStory){
    return res.status(404).json({message:"Travel story not found", userID,id})}

    // Use default if not set
    const defaultImageUrl = `${baseUrl}/assets/cat.jpg`
    travelStory.title= title;
    travelStory.story= story;
    travelStory.visitedLocation= visitedLocation;
    travelStory.imageUrl = imageUrl || defaultImageUrl ;
    travelStory.visitedDate= parsedVisitedDate;

    await travelStory.save();
    res.status(200).json({message:"successfully updated story", travelStory})

 })

 //Delete a story
 const deleteStory= asyncHandler(async(req,res)=>{
    const {id}= req.params;
    const {userID}= req.user
    const travelStory= await TravelStory.findOne({_id:id, userId:userID})
    console.log(req.user)
    if(!travelStory){
        return res.status(404).json({message:"story not found"});
    }
    await travelStory.deleteOne();
    res.status(200).json({message:"Story deleted successfully"})
 })

 //Update isFavourite
 const isFavorite= asyncHandler(async(req,res)=>{
    const {id}= req.params;
    const {isFavorite}= req.body;
    const {userID}=req.user
    const travelStory= await TravelStory.findOne({userId:userID, _id:id})
    if(!travelStory){
        return res.status(404).json({message:"story not found"});
    }
    travelStory.isFavoriate=isFavorite;
    await travelStory.save();
    res.status(200).json({story:travelStory, message:"Updated successfully"})
 })

 //Search travel stories
 const searchStory= asyncHandler(async(req,res)=>{
    const {query}= req.query;
    const {userID}= req.user;
    if(!query){return res.status(404).json({message:"query is required"})}
    const searchResults= await TravelStory.find({
        userId: userID,
        $or:[
            {title:{$regex:query, $options:"i"}},
            {story:{$regex: query, $options:"i"}},
            {visitedLocation:{$regex: query, $options:"i"}}
        ]
    }).sort({isFavorite: -1});
    res.status(200).json({stories: searchResults})
 })

//Filter travel stories by date
const filterDate= asyncHandler(async(req,res)=>{
 const {startDate, endDate}= req.query;
 const {userID}=req.user;
     //Convert start and end date from milliseconds to Date objects
     const start= new Date(parseInt(startDate));
     const end= new Date(parseInt(endDate));
     //Find travel stories that belond to that authenticated user and fall within the date range
     const filteredStory= await TravelStory.find({
        userId:userID,
        visitedDate:{$gte:start, $lte:end},
     }).sort({isFavorite:-1})
     res.status(200).json({message:filteredStory})

})
module.exports={addStory,getStories,addImage, deleteImage,editStory, deleteStory, isFavorite, searchStory, filterDate};