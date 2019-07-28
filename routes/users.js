const express = require('express');
const router = express.Router();

// ... call to require('express') ...
const {check, validationResult} = require('express-validator/check');

// ... leave the rest untouched ...


/* GET users page. */
router.get('/', function (req, res) {
  res.send();
});

router.post('/', [
  check('name').exists().isLength({min: 5}).trim().escape().withMessage('Name must have more than 5 characters'),
  check('classYear', 'Class Year should be a number').not().isEmpty().isInt(),
  check('weekday', 'Choose a weekday').optional().not().isIn(['Sunday', 'Saturday']),
  check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
  check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5}),
  check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))
],
function (req, res) {
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {
    res.send({});
  }
});

module.exports = router;
