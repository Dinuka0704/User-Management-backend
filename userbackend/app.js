const express = require('express');
const app = express();
const cors = require('cors');
const controller = require("./controller");

// middleware
app.use(cors());
app.use(
    express.urlencoded({ extended: true })
);

app.use(express.json());

app.get("/users",(req,res)=>{
    controller.getUsers((req,res,next)=>{
        res.send();
    })
})

app.post("/adduser",(req,res, next)=>{
    controller.addUser(req,res,next);
});

app.post("/updateUser",(req,res, next)=>{
    controller.updateUser(req,res,next);
});

app.delete("/deleteUser",(req,res, next)=>{
    controller.deleteUser(req,res,next);
});

module.exports=app;