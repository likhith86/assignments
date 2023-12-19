const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod=require("xod");



const schema=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
}
)
function signJwt(username, password) {
    const result = schema.safeParse({
        email: username,
        password: password
    });

    if (result.success) {
        const token = jwt.sign({ username: username }, jwtPassword);
        return token;
    } else {
        return null;
    }

}

function verifyJwt(token) {
    try {
        jwt.verify(token, jwtPassword);
        return true;
    } catch (error) {
        return false;
    }
}

function decodeJwt(token) {
    const decode=jwt.decode(token)

    if(decode!=null){
        return true
    }
    else{
        return false;
    }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
