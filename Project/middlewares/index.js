const fs=require("fs")

function logReqRes(filename){
    return (req,res,next)=>{

        // console.log("hello from middleware 1")
        // req.MyUsername="Wills"
        //res.json({msg: "response from middleware 1"})
        console.log(req.headers)

        fs.appendFile(
            filename,
            `\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,
            (err, data) => {
            next();
            }
        )
    }
}
module.exports={
    logReqRes, 
}


