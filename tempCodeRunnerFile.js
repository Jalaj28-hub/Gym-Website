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