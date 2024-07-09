const express = require("express")

// const http=require("http");
// const url=require("url");  
// const fs=require("fs");

const app=express();


app.get("/", (req,res)=>{
    
    return res.send("Hello from Homepage")
})

app.get("/about", (req,res)=>{
    return res.send(`Hello ${req.query.name}  ${req.query.age}`)
})

app.listen(8000, ()=>console.log("Server Started"))








// const myServer= http.createServer((req, res)=>{
//     if(req.url==='/favicon.ico') return res.end();
//     const log= `${Date.now()}: ${req.method} ${req.url} New Req Recv\n`
//     const myUrl=url.parse(req.url, true) 
//     console.log(myUrl)
//     fs.appendFile("log.txt", log, (err, data)=>{
//         switch (myUrl.pathname){
//             case "/":
//                 res.end("HomePage");
//                 break;
//             case "/about":
//                 res.end("About Page");
//                 break;
//             case "/contact":
//                 res.end("Contact Page");
//                 break;
//             case "/search":
//                 const search= myUrl.query.username
//                 res.end(`your search results for ${search} are here`);
//             case "/signup":
//                 if(req.method==="GET") res.end("This is a signup form");
//                 else if(req.method==="POST"){
//                     //DB Query
//                     res.end("Success");  
//                 }
//             default:
//                 res.end("Error 404");
//         }
//     })
//     //console.log(req.headers)
//     // res.end("Hello from server")
// });

// myServer.listen(8000, ()=>{console.log("server sterted")})