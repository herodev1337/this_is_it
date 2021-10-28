const showHome = (req, res) => {
    res.render('home');
}

const showWhoami = (req, res) => {
    let request = Object.entries(req.rawHeaders);

    res.render("utils/whoami", {
      who: request,
    });
}

module.exports = {
    showHome,
    showWhoami
  };