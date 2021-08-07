const { User, Token, makePassword, validPassword } = require("../Models/auth.model");

module.exports = {
    login: async (username, password) => {
        try {
            const user = await User.findOne({username});
            if (user === null) throw "user not found";
            else {
                const { salt, hash } = user;
                if (validPassword(password, hash, salt))  return user;
                else throw "wrong password";
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    signup: async (username, password) => {
        try {
            let newUser = new User();
            newUser.username = username;
            const { hash, salt } = makePassword(password);
            newUser.hash = hash;
            newUser.salt = salt;
            let userRes = await newUser.save();
            console.log(userRes);
            return userRes
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    isUsernameAvail: async username => {
        try {
            const user = await User.findOne({username});
            return (user === null) ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    //  token management
    pushToken: async (userId, refreshToken) => {
        try {
            await Token.insertMany({userId, refreshToken});
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    },
    checkToken: async (userId, refreshToken) => {
        try {
            const token = await Token.findOne({userId, refreshToken});
            return (token !== null) ? true : false;
        } catch (error) {
            console.log(error);
            return false
        }
    },
    popToken: async (userId, refreshToken) => {
        try {
            const token = await Token.findOneAndDelete({userId, refreshToken});
            return (token !== null) ? true : false;
        } catch (error) {
            console.log(error);
            return false
        }
    },
}