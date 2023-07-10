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

router.get('/edit/:user_id', async function (req, res, next) {
  let user_id = req.params.user_id;
  let options={}
  try {
    let userResp = await userModel.list(conn,user_id)
    options.user= userResp[0];
  } catch (error) {
    options.serverError = error.message
  }
  res.render('edit', options);
  
});
router.post('/edit/:user_id', async function (req, res, next) {
  let user_id = req.params.user_id;
  let data = {
    name: req.body.name,
    checkbox: req.body.checkbox,
    tablename: req.body.tablename,
    age: req.body.age,
    percentage: req.body.percentage,
  };
  try {
    let resp = await userModel.update(conn, data, user_id);
    req.flash('server-success', "Data update successfully");
    return res.redirect('/');
  } catch (error) {
    req.flash('server-error', error.message);
    return res.redirect("/edit/"+ user_id);
  }

});
router.get('/delete/:user_id', async function (req, res, next){
  let user_id = req.params.user_id;
  try {
    let resp = await userModel.delete(conn, user_id);
    req.flash('server-success', "User deleted successfully");
    res.redirect('/');
  } catch (error) {
    req.flash('server-error', error.message);
    res.redirect('/');
  }
})
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
