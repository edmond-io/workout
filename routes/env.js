const express = require('express');
const router = express.Router();

// load environment variables
require('dotenv').config();

/* GET env variables to client-side */
router.get('/', function(req, res, next) {
  res.json({
      "mode": process.env.NODE_ENV.toLowerCase(),
      "server": process.env.SERVER
  });
});

module.exports = router;
