//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');


mongoose.connect('mongodb+srv://Yogesh_Arya:yugino@cluster0.symh23l.mongodb.net/sceretDB');

const userSchema = new mongoose.Schema(
      {
            email: String , 
            password: String  
      });

const secret = process.env.SECRET;
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password']});

const User  =  mongoose.model('User',userSchema);
 
 const app = express();


 app.use(express.static('public'));
 app.set('view engine' , 'ejs');
 app.use(bodyParser.urlencoded({extended: true}));

app.get('/' , function(req ,res)
{
      res.render('home');
})
app.get('/login' , function(req ,res)
{
      res.render('login');
})
app.get('/register' , function(req ,res)
{
      res.render('register');
})

app.post('/register', function (req, res)
{
      const newuser = new User(
      {
            email: req.body.username ,
            password: req.body.password                    
      });
      newuser.save(function (err)
      {
            if(!err)
            {
                  res.render('secrets');
            }
            else
            {
                  console.log(err);
            }
      })
});
app.post('/login' , function(req,res)
{
      User.findOne({email:req.body.username} , function(err , foundone)
      {
            if(err)
            {
                  console.log(err);
            }
            else if(foundone.password === req.body.password)
            {
                  res.render('secrets');
            }
      })
})

 app.listen(3000, function ()
 {
      console.log('Server 3000 is running');
 })