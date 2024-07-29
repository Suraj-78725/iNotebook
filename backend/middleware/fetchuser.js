const jwt =require('jsonwebtoken');
const JWT_SECRET='The$urajknowshowtoburnnowanditknowshowtoburn';
const fetchuser=async(req,res,next)=>{
    // fetch the user from jwt token 
    const token=req.header('auth-token')
    if(!token)
    {
        res.status(401).send({error:'authenticate valid user'})

    }
    try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user = data.user;
    next();
    }catch(error){
        res.status(401).send({error:'authenticate valid user'})

    }
}
module.exports= fetchuser;