const { User, makePassword, validPassword } = require("../Models/auth.model");

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
    getUserById: async id => {
        try {
            const user = await User.findById(id);
            return (user === null) ? false : user;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}