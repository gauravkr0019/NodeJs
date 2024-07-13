// mongoose pre save is used to check if there are any modification done in user
// for hashing password we use a built in package: crypto hash nodejs -> createHmac 
// 

const {Schema, model} = require("mongoose")
const {createHmac, randomBytes} = require('node:crypto')  // npm i randombytes
const {createTokenForUser} = require('../services/authentication')

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    profileImageUrl:{
        type: String,
        default: "/images/avatar.png",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
},
{timestamps: true}
);

// doc in mongoose pre save
//  whenever we will save a user this function will run and will hash the password 
userSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified('password')) return ;

    const salt = randomBytes(16).toString();  //get 16 random bytes   //salt is a random string -> salt is a secret key of 16digits

    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')  // createHmac(algo, key to be used for hashing ).update(thing to be updated).digest(give it to me in hex form)

    this.salt = salt;
    this.password = hashedPassword  //original password has been replaced

    next();
})


// doc in mongoose virtuals
// matchPasswordAndGenerateToken is made to convert the user provided password into hashed form then check in db if that password exist or not while signing in
// if the user exists and the password is correct then createTokenForUser is used to generate new token
// as in db password is stored in hashed form 

userSchema.static('matchPasswordAndGenerateToken', async function(email, password) {  
    user = await this.findOne({email});
    if(!user) throw new Error("Incorrect Password");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    if(hashedPassword!== userProvidedHash)
        throw new Error("Incorrect Password");

    const token =  createTokenForUser(user)
    return token;
})

const User = model('user', userSchema);

module.exports = User