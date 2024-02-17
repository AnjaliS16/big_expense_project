const express = require('express');
const routes = express.Router();
const get = require('../controller/premium');
const authenticate=require('../middleware/auth')



routes.get("/premium/showleaderboard",authenticate.authenticate,get.getmethod);



module.exports = routes;