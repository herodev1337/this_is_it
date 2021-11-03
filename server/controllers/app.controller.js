const Post = require('../../models/Post');
const auth = require("../../utils/auth")

const showHome = (req, res) => {
    Post.find({public: true}).then(responseData => { 
      res.render('home', { posts: responseData });
    }).catch(err => {
       console.log(err.message);
    })
    
}

const showWhoami = (req, res) => {
    let request = Object.entries(req.rawHeaders);

    res.render("utils/whoami", {
      who: request,
    });
}

module.exports = {
    showHome,
    showWhoami,
  };