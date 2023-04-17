const users = require('../model/users.model');
async function users_table(req,res){
    let allusers = await users.get_allUsers();
    //console.log(allusers);
    res.render("users_table",{allusers:allusers});
}

module.exports = {
    users_table
}