
function loginPage(req,res){
    res.render('login_page', {error : req.flash('login_error')});
}

function authenticateuser(req,res){    
        var post = req.body;
        if (post.username === 'taazapickle' && post.password === '#taaza') {
            req.session.user_id = 'taazapickle123';
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; 
            res.status(200).redirect('/');
        } else {
            req.flash("login_error","invalid username/password");
            res.status(401).redirect('/authentication/login');            
        }    
}

function logout(req,res){
    delete req.session.user_id;
    res.redirect('/authentication/login'); 
}

module.exports = {
    loginPage,
    authenticateuser,
    logout
}