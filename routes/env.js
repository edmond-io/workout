const express = require('express');
const router = express.Router();

/* GET env variables to client-side */
router.get('/', function(req, res, next) {
  res.json({
      "server": process.env.SERVER
  });
});

module.exports = router;
