const mongoose=require('mongoose');

const shapeSchema=new mongoose.Schema({
     key:Number,
     points:String,
     type:String,
     color:String,
     sides:Number,
     rx:Number,
     ry:Number,
     radius:Number,
     dash:{
        strokeDasharray:Number,
        strokeDashoffset:Number
     }
});

module.exports =mongoose.model('Shape',shapeSchema);