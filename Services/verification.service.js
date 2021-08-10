const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    isAuthenticated: (req, res, next) => {
        try {
            if (!req.headers.authorization)
                throw "authorization header not available"
            if (!(req.headers.authorization.split(' ')[0] === "Bearer"))  
                throw "bearer token not available."
            const authToken = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(authToken, process.env.SECRET);
            if (!user)  throw "Invalid token! Try login again"
            const { username, role, id } = user;
            req.user = { username, role, id };
            next();
        } catch (error) {
            res.status(401).json({success: false, error});
        }
    },
    isAuthorized: (req, res, next) => {
        try {
            if (req.user.role !== "admin") throw "unauthorized user!"
            next();
        } catch (error) {
            res.status(403).json({success: false, error});
        }
    }
}
