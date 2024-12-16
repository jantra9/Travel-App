const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const travelStorySchema= new Schema({
    title:{type:String, required:true},
    story:{type:String, required:true},
    visitedLocation:{type:[String], default:[]},
    isFavoriate:{type:Boolean, default:false},  
    userId:{type:Schema.Types.ObjectId, ref:"User", required:true},
    createdOn:{type:Date,default:Date.now},
    imageUrl:{type:String, required:true},
    visitedDate:{type:Date, required:true},
    },
    {collection:"Story"}
);

module.exports=mongoose.model("TravelStory",travelStorySchema);