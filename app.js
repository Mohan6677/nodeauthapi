const e = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res)=>{
    res.json({
        message:'Welcome to the api'
    })
});

app.post('/api/post',verifyToken,(req,res)=>{
    jwt.verify(req.token,'moh@n6677',(err,authData)=>{
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            res.json(
            {
                message:"Post Created",
                authData
            }
        ) 
        }
    });
   
});

app.post('/api/login',(req,res)=>{
    //Mock User
    const user = {
        id:1,
        username:'Mohan',
        email:'user@gamil.com',
    };
    
    jwt.sign({user:user},'moh@n6677',(err,token)=>{
        res.json({
            token
        });
    });
});

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined')
    {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else
    {
        res.sendStatus(403);
    }
};

app.listen(5000,()=>{
    console.log('server started on port 5000')
});