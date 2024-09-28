import express from "express";
import {port,mongoUrl} from './config.js'
import foodlists from './routes/foodroutes.js'
import cors from 'cors';
import res from './routes/foodroutes.js'

const app= express();
import mongoose from "mongoose";
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use('/user',res)
app.use('/foods',foodlists)
app.get('/',(req,res)=>{
  res.send(" This is my Mern stack project")

})

mongoose.connect(mongoUrl).then(()=>{
  console.log("connect sucsessfully");
  app.listen(port,()=>{
    console.log("app running on server port 3000");
  })

}

).catch((error)=>{
  console.log(error);
}

)
