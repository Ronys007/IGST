var express = require('express');
var router = express.Router();
var conn = require("../config/db");
var userModel = require("../models/user");
/* GET home page. */
router.get('/', async function (req, res, next) {
  let options = {
    serverSuccess: req.flash('server-success'), title: 'Digitizer Solutions'
  }

  try {
    options.userList = await userModel.list(conn);
  } catch (error) {
    options.serverError = error.message
  }
  res.render("index", options);

});
router.get('/formm', function (req, res, next) {
  res.render('formm', {
    serverError: req.flash('server-error')
    , title: 'Digitizer Solutions'
  });
});

router.get('/edit', function (req, res, next) {
  res.render('edit', {
    title: 'Digitizer Solutions'
  });
});

router.post('/formm', async function (req, res, next) {
  let data = {
    name: req.body.name,
    checkbox: req.body.checkbox,
    tablename: req.body.tablename,
    age: req.body.age,
    percentage: req.body.percentage,
  };
  try {
    let resp = await userModel.insert(conn, data);
    req.flash('server-success', "User added successfully");
    res.redirect('/');
  } catch (error) {
    req.flash('server-error', error.message);
    res.redirect('/formm');
  }

});

module.exports = router;
