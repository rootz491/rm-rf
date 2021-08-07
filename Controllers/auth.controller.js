const { login, signup, pushToken, isUsernameAvail } = require("../Services/auth.service");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
require("dotenv").config();

module.exports = {
    apiLogin: async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        try {
            const user = await login(username, password);
            if (!user)  throw "user not found or wrong password";
            const { role, _id } = user;
            const authToken = jwt.sign({_id, username, role}, process.env.SECRET, { expiresIn: "30m" });
            const refreshToken = jwt.sign({ id:_id }, process.env.SECRET, { expiresIn: "3h" });
            await pushToken(_id, refreshToken); //  store refresh token at database
            res.json({success: true, username, authToken, refreshToken });
        } catch (error) {
            console.log(error);
            res.status(401).json({success: false, error})
        }
    },
    apiSignup: async (req, res) => {
        // const { username, password, confPassword } = req.body;
        const username = req.body.username;
        const password = req.body.password;
        const confPassword = req.body.confPassword;
        try {
            //  veirfy user input
            if (!username || !_.isString(username)) throw "username's not valid string";
            if (!password || !_.isString(password)) throw "password's not valid string";
            if (!confPassword && !_.isString(confPassword)) throw "confirmPassword's not valid string";
            if (password !== confPassword) throw "password do not match each other";
            if (password.length < 6) throw "password should be atleast 6 chars long";
            //  check if user with same username already exists in DB
            const dupName = await isUsernameAvail(username);
            if(!dupName) throw "username is already registered. choose a different one!";
            //  create user
            const user = signup(username, password);
            if (!user) throw "internal error";
            res.status(201).json({success: true, msg: "please login to continue"});
        } catch (error) {
            console.log(error);
            res.status(401).json({success: false, error})
        }
    },
    //  token
    apiLogout: async (req, res) => {
        const { token } = req.body;
        const id = req.user._id;
        //  remove refresh token
        try {
            if (!_.isString(token)) throw "refresh token is not a valid sting";
            if (await popToken(id, token)) res.json({ success: true });
            else throw "invalid refresh token";    
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    },
    apiUpdateToken: async (req, res) => {
        const { token } = req.body;
        const id = req.user.id;
        const user = req.user;
        console.log(req.body);
        try {
            if (!_.isString(token)) throw "refresh token is not a valid sting";
            if (await checkToken(id, token)) {
                //  sign JWT tokens with secret key
                const authToken = jwt.sign({ ...user }, process.env.SECRET_KEY, { expiresIn: "15m" });
                res.json({success: true, authToken});
            }
            else throw "invalid refresh token";
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    }

}