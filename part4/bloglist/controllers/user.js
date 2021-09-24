const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


userRouter.post('/',async (request,response) => {
    const body = request.body
    if(body.password.length<3){
        response.status(400).json({error:'User validation failed: password: Path `password` is shorter than the minimum allowed length (3).'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password,saltRounds)

    const user = new User({
        username:body.username,
        name:body.name,
        passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

userRouter.get('/',async (request, response)=>{
    //join other table and selected fields
    const users = await User.find({}).populate('blogs',{url:1,title:1,author:1,id:1})

    response.send(users)
})

module.exports = userRouter
