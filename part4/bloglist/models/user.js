const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
        unique:true

    },
    name:String,
    passwordHash:{
        type:String,
        minlength:3,
        required:true
    },
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }]
})


userSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User',userSchema)
