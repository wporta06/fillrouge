jwt = require("jsonwebtoken");
// toverify token, get id and role that you set on the token from the token
const tokenVerify = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, userdata) => {
            if (err) res.status(403).json("Tokenn not valiid");
            req.user = userdata;
            next()
        })
    } else {
        return res.status(401).json('you are not an admiin')
    }
}

// compare the id from the token and req.params.id, and check if is and admin from the token
const verifyTokenAndAuhorization = (req, res, next) => {
    tokenVerify(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("you are not an adminn")
        }
    })
}

// for admin shiit (add ...)
const verifyTokenAndAdmin = (req, res, next) => {
    tokenVerify(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("you are not an adminn")
        }
    })
}

module.exports = { tokenVerify, verifyTokenAndAuhorization, verifyTokenAndAdmin }