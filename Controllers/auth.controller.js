const { login, signup, isUsernameAvail, getUserById, getAllUsers } = require("../Services/auth.service");
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
            const authToken = jwt.sign({id:_id, username, role}, process.env.SECRET, { expiresIn: "20m" });
            const refreshToken = jwt.sign({ id:_id }, process.env.SECRET, { expiresIn: "4d" });
            res.json({success: true, authToken, refreshToken });
        } catch (error) {
            // console.log(error);
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
        //  remove refresh token
        try {
            if (!_.isString(token)) throw "refresh token is not a valid sting";
            /* @TODO invalidate the token */
            else throw "invalid refresh token";    
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    },
    apiUpdateToken: async (req, res) => {
        const { token } = req.body;
        try {
            if (!_.isString(token)) throw "refresh token is not a valid sting";
            const {id} = jwt.verify(token, process.env.SECRET);
            const { username, role } = await getUserById(id);
            //  sign JWT tokens with secret key
            const authToken = jwt.sign({ id, username, role }, process.env.SECRET, { expiresIn: "20m" });
            const refreshToken = jwt.sign({ id }, process.env.SECRET, { expiresIn: "4d" });
            res.json({success: true, authToken, refreshToken});
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    },
    apiGetUsers: async (_, res) => {
        try {
            const users = await getAllUsers();
            if (!users) throw "users not found!";
            res.json({ success: true, users });
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }
}