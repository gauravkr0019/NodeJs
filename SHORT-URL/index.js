const express = require("express")
const path = require("path")
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly, checkAuth}= require('./middlewares/auth.js')

const {connectTOMongoDB}=require("./connection")
const URL=require("./models/url.js")

const urlRoute=require("./routes/url.js")
const staticRoute=require("./routes/staticRouter.js") 
const userRoute = require("./routes/user.js")


const app = express();
const PORT = 8000;

connectTOMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDB connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser( ))

app.use("/url", restrictToLoggedinUserOnly, urlRoute)
app.use('/user', userRoute)
app.use("/", checkAuth, staticRoute)

// app.get("/test",async(req,res)=>{
//     const allUrls = await URL.find({})
//     return res.render('home',{
//         urls: allUrls,
//     })
// })



app.get("/url/:shortId", async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    )
    res.redirect(entry.redirectURL)

})



app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))