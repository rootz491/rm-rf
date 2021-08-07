const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    isAuthenticated: (req, res, next) => {
        try {
            if (!req.headers.authorization)
                throw "authorization header not available"
            if (!(req.headers.authorization.split(' ')[0] === "bearer"))  
                throw "bearer token not available."
            const authToken = req.headers.authorization.split(' ')[1];
            console.log(authToken);
            const user = jwt.verify(authToken, process.env.SECRET);
            if (!user)  throw "Invalid token! Try login again"
            const { username, role, _id } = user;
            req.user = { username, role, id: _id };
            console.log(req.user);
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({success: false, error});
        }
    },
    isAuthorized: (req, res, next) => {
        try {
            if (req.user.role !== "admin") throw "unauthorized user!"
            next();
        } catch (error) {
            console.log(error);
            res.status(403).json({success: false, error});
        }
    }
}
