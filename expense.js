const express = require('express');
const routes = express.Router();
const add = require('../controller/expense');
const authenticate=require('../middleware/auth')

routes.post("/expense/add-expense",authenticate.authenticate,add.addmethod);

routes.get("/expense/get-expense",authenticate.authenticate,add.getmethod);

routes.delete("/expense/delete-expense/:id",authenticate.authenticate,add.deletemethod);

module.exports = routes;
