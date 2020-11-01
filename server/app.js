const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Shape=require('./shape');
const dot =require('dotenv');
dot.config();
const app=express();
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false});
mongoose.connection.on('connected', function(){
  console.log('connected');
});
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
app.get('/',(req,res)=>{
    res.send('home');
});

app.get('/shapes',(req,res)=>{
  Shape.find({},function(err,shapes){
    if(err){
        console.log('SOMETHING WENT WRONG');
    }
    else{
       res.json(shapes);
    }
     })
})

app.post('/shapes',(req,res)=>{
  Shape.create(req.body, function (err, shape) {
    if (err) {
        console.log('error creating shape')
    }
    else{
        res.json(shape)
    }
  });
})

app.delete('/shapes',(req,res)=>{
    Shape.deleteMany({},function(err){
      if(err){
        res.send('error');
      }else{
        res.send('deleted')
      }
    });
})

app.delete('/shapes/:key',(req,res)=>{
  Shape.findOneAndDelete({key:req.params.key},function(err,deletedshape){
    if(err){
      res.send('error deleting shape');
    }else{
      res.send(deletedshape);
    }
  })
})

app.listen(process.env.PORT || 3000,function(){
    console.log("running");
});