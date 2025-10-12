const User = require("./model");

const getUsers=  (req,res,next) => {
    User.find()
    .then(response => {
        res.json({response})
    })
    .catch(error =>{
        res.json({error:"error",details:error.message})
    })
};


const addUser = (req,res,next) =>{
    let user = new User({
        id: req.body.id,
        name: req.body.name,
    });
    user.save()
    .then(response => {
        res.json({response})
    })
    .catch(error =>{
        res.json({Error:"error"})
    })
};

const updateUser = (req,res,next) => {
    const id = req.params.id || req.body.id; // prefer route param, fallback to body
    const { name } = req.body;

    if (!id) {
        return res.status(400).json({ Error: "Missing user id (_id) in params or body" });
    }

    const update = {};
    if (name !== undefined) update.name = name;

    if (Object.keys(update).length === 0) {
        return res.status(400).json({ Error: "No fields to update" });
    }

    User.findOneAndUpdate({ id }, { $set: update }, { new: true, runValidators: true })
    .then(response => {
        if (!response) {
            return res.status(404).json({ Error: "User not found" });
        }
        res.json({response})
    })
    .catch(error =>{
        res.status(400).json({Error:"error", details: error.message})
    })
};

const deleteUser =(req,res,next) =>
{
    const id = req.params.id || req.body.id; // prefer route param, fallback to body

    if (!id) {
        return res.status(400).json({ Error: "Missing user id (_id) in params or body" });
    }

   User.findOneAndDelete({ id })
    .then(response => {
        if (!response) {
            return res.status(404).json({ Error: "User not found" });
        }
        res.json({response})
    })
    .catch(error =>{
        res.status(400).json({Error:"error", details: error.message})
    })
};


exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;