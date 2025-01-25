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

//--------------deployment------------------
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.argv[2] === 'production'; // Check for production flag

if (isProduction) {
  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Catch-all route to serve the React frontend
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  });
} else {
  // Development mode
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}
//------------------deployment----------------------------


// app.get('/',(_req,res)=>{
//   res.send(" This is my Mern stack project")

// })

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
