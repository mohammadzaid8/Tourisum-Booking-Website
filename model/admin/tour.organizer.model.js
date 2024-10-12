const mongoose=require('mongoose');

const organizerSchema=new mongoose.Schema({
    Companyname: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    website:{type:String,required:true},
    iconImage:{type:String,required:true}
});

module.exports = mongoose.model('Organizer', organizerSchema);