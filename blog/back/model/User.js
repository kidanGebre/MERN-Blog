const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        name: { type:String ,required:true},
        password: { type: String ,required:true},
        email: { type: String, required: true },
        //role value  if(0){ user just member}, if(1) {user admin}, if(2){user editor}
        role: { type: String, default: 0 },
        profile:{type:String,required:true}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User",UserSchema)
