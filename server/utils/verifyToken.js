const jwt = require('jwt')

const authenticate = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Error with token!");

    try{
        //TODO: token_secret from config file
        const verify = jwt.verify(token, "TOKEN_SECRET");
        req.user = verify;
    }catch(e){
        res.status(400).send("Invalid token!")
    }
}