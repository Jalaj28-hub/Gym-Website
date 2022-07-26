const mongoose = require("mongoose")

const AllQuery = new mongoose.Schema({
    Name : {
        type: String,
        require : true
    },
    email : {
      type: String,
        require : true  
    },
    phone : {
        type: Number,
        require : true
    },
    query : {
        type: String,
        require : true
    }
})

const Query = new mongoose.model("Query",AllQuery);

module.exports = Query;