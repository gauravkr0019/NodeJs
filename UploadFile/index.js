// Uploading files with nodeJs and Multer
// we need to install a library which helps in files uploads:  npm i multer

const express = require("express");
const path = require("path")
const multer = require("multer")
// const upload = multer({dest:"uploads/"})

// const http=require("http");
// const url=require("url");  
// const fs=require("fs");

const app=express();

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        return cb(null, './uploads')
    },
    filename: function(req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload=multer({storage:storage})

app.set("view engine","ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: false}));

app.get("/", (req,res)=>{
    return res.render("homepage")
})

// // for uploading multiple files

// const cpUpload = upload.fields([{name:'profileImage', maxCount: 1},{name:'coverImage',  maxCount: 1}])

// app.post("/upload", cpUpload, (req, res)=>{
//     console.log(req.files['profileImage']);
//     console.log(req.files['coverImage']);
//     return res.redirect("/")
// })

app.post("/upload",upload.single('profileImage'), (req, res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/")
})

// app.get("/", (req,res)=>{
    
//     return res.send("Hello from Homepage")
// })

// app.get("/about", (req,res)=>{
//     return res.send(`Hello ${req.query.name}  ${req.query.age}`)
// })

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