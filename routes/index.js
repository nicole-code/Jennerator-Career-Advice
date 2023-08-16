var express = require('express');
var router = express.Router();

const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/interests');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/interests/new',
    failureRedirect : '/interests'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/interests');
});

module.exports = router;
