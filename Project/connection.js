const mongoose = require("mongoose")

async function connectMongoDb(url){
    return await mongoose.connect(url).then(()=>{
        console.log("MongoDb Connected")
    })
}

module.exports={
    connectMongoDb,
}