const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    hash: {
        type: String,
        required: true
    }, 
    salt: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

    
// Exporting module to allow it to be imported in other files 
module.exports = {
    User: mongoose.model('User', userSchema),

    // Method to set salt and hash the password for a user 
    makePassword: function(password) { 
        // Creating a unique salt for a particular user 
        const salt = crypto.randomBytes(16).toString('hex'); 
        // Hashing user's salt and password with 1000 iterations, 
        const hash = crypto.pbkdf2Sync(password, salt,  
        1000, 64, `sha512`).toString(`hex`); 
        //  return salt and hash
        return {salt, hash}
    },
    // Method to check the entered password is correct or not 
    validPassword: function(password, myHash, salt) { 
        var hash = crypto.pbkdf2Sync(password,  
        salt, 1000, 64, `sha512`).toString(`hex`);
        return hash === myHash; 
    }
};

