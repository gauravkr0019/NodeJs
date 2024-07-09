const {getUser}=require('../service/auth')

function checkForAuthentication(req,res,next){
    const tokenCookie= req.cookies?.token
    req.user=null;
    
    
    if(!tokenCookie) return next();

    const token= tokenCookie;
    const user= getUser(token);

    req.user= user;
    return next();
}


function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login")
        
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    }
}

// async function restrictToLoggedinUserOnly(req, res, next){
//     // -------Using cookies--------------
//     //
//     // const userUid = req.cookies?.uid;
//     // if(!userUid) return res.redirect('/login')
//     // const user = getUser(userUid)
//     // if(!user) return res.redirect('/login')
//     //     req.user = user;
//     // next();


//     //-----------Using Token response using Headers---------------
    
//     const userUid = req.headers["Authorization"]
//     if(!userUid) return res.redirect('/login')
//     const token = userUid.split('Bearer ')[1]  // "Bearer 23ucyfgefheuifh"
//     const user = getUser(token)
//     if(!user) return res.redirect('/login')
//         console.log(req.headers)
//     next();


    
// }

// async function checkAuth(req, res, next){
//     // const userUid = req.cookies?.uid;

//     // const user = getUser(userUid)

//     // req.user = user;

//     // console.log(req.headers)
//     console.log('hkk',req.headers)

//     const userUid = req.headers["authorization"];
//     const token = userUid?.split('Bearer ')[1];
//     const user = getUser(token)
//     req.user = user;
//     console.log(user)

//     next();
// }


// module.exports = {
//     restrictToLoggedinUserOnly,
//     checkAuth,
// }

module.exports={
    checkForAuthentication,
    restrictTo,
}