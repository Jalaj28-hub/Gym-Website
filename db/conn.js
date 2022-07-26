const mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/JP_Registers",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true

}).then(()=>{
    console.log("connection build")
}).catch((e)=>{
    console.log(e);
})
