const express = require('express');
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const router = require("./router");
const cors = require('cors');

app.use(cors());
// app.use(
//     express.urlencoded({ extended: true })
// );

app.use(express.json());

const uri = "mongodb+srv://dinukagimhana2001_db_user:Dinuka1234@cluster2.k3abhu0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2"

const connect = async ()=> {
  try{
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  }
  catch(error){
    console.error("MongoDB error:",error);
  }
}

connect();

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api",router);