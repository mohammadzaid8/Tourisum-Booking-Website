const mongoose=require('mongoose');

const ownerSchema=new mongoose.Schema({
    ownername: { type: String, required: true },
    name:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Owner', ownerSchema);