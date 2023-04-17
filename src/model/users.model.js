const users_mongoose = require('./users.mongo');


async function get_allUsers(){
    return await users_mongoose.find({});
}

module.exports = {
    get_allUsers
}