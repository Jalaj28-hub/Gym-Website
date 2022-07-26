const { urlencoded } = require('express');
const express = require('express');
// const exphbs = require('express-handlebars')
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
// const messagebird = require('messagebird')('W7jxYi44VzhvcElxDNswKMm7m')
// app.use(bodyParser.urlencoded({extended: true }));
// app.use(bodyParser.json());

require("./db/conn");
const Register = require("./models/registers");
const Query = require("./models/query");
const {json} = require("express");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(path.join(__dirname)));
app.set('view engine','pug');

app.get('/', (req,res) => {
  res.render(path.join(__dirname+'/views/index.pug'));
});



app.get('/Register', (req,res) => {
  res.render(path.join(__dirname+'/views/Register.pug'));
});


app.get('/login', (req,res) => {
  res.render(path.join(__dirname+'/views/login.pug'));
});



app.post('/Register',async (req,res)=>{
try{
  const password = req.body.password;
  const cpassword = req.body.confirmpassword;
  const Email = req.body.email
  const useremail = await Register.findOne({email:Email})
  if(useremail === null){
    if(password === cpassword){
  const GYM_Members = new Register({
    Username : req.body.Username,
    email : req.body.email,
    password : req.body.password,
    confirmpassword : req.body.confirmpassword
  })
  const registered = await GYM_Members.save();
  res.status(201).render("login");
    }
    else{
      res.send("Password is not matching")
    }
  }
  else{
    res.send("User's Email Already Exist")
  }
}
catch(error){
  res.status(400).send(error)
}
})



app.post("/login" , async(req,res)=>{
  try{
    const email = req.body.email;
    const pass = req.body.password;
   const useremail = await Register.findOne({email:email})
   if(useremail.password === pass){
     res.status(201).render("index",{name:useremail.Username});
   }
   else{
     res.send("invalid login details")
   }
    // console.log(email)
  }
  catch(error){
res.status(400).send("invalid login details")
  }
})

app.post('/', async(req,res)=>{
  try{
    const allquery = new Query({
      Name : req.body.name,
      email : req.body.email,
      phone : req.body.phone,
      query : req.body.message
    })
    const registere = await allquery.save();
    res.status(201).render("index");
  }
  catch(error){
res.status(400).send("Error")
  }
})


app.get('/gallery', (req,res) => {
  res.render(path.join(__dirname+'/views/gallery.pug'));
});

app.get('/franchise', (req,res) => {
  res.render(path.join(__dirname+'/views/franchise.pug'))
});
app.get('/Online_dietPlanner', (req,res) => {
  res.render(path.join(__dirname+'/views/Online_dietPlanner.pug'))
});

app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Web Server is listening at port '+ (process.env.port || 3000));