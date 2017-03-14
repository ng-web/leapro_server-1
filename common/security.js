/**
 * credit to : Rahil Shaikh
 * source: https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
 */
'use strict';
var crypto = require('crypto');


/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
let sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
let genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

module.exports ={

    genertateHash : function(password,salt){
        return sha512(password, salt);
    },
    generateSalt : function(length){
        return genRandomString(length)
    }

}
