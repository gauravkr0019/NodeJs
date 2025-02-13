const JWT = require('jsonwebtoken')

const secret = "iurycwui$3hdehd290$deyg";

function createTokenForUser(user){
    const payload = {
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token, secret);
    return payload
}

module.exports = {
    createTokenForUser,
    validateToken,
}