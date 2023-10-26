const jwt=require('jsonwebtoken');
const userController = require('./DL/user.controller')
const secret = process.env.SECRET

const createToken = (fullName,role) =>{
    const token = jwt.sign({fullName,role}, secret)
    if(!token) throw 'can not create token'
    return token
}



const validToken = async (req, res, next)=> {
    try{
        var result = jwt.verify(req.headers.authorization.replace('Bearer ', ''), secret)
        if(!result.fullName) throw 'user not recognized'
        req.userData = await userController.readOne({fullName: result.fullName})
        next();
    } 
    catch(err){
        res.status(403).send(err)
    }  
}

module.exports = {createToken,validToken}