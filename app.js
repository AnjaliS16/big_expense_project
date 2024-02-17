const express = require('express');
const cors = require('cors');
require('dotenv').config();
//app.use(cors());


const bodyparser = require('body-parser');
const sequelize = require('./util/database');

const Details = require('./router/router');
const addexpense=require('./router/expense')
const purchase=require('./router/purchase')
const premium =require('./router/premium')
const user=require('./model/model')
const expense=require('./model/expense')
const order=require('./model/purchase')



const path=require('path')

const app = express();


app.use(cors());

app.use(express.static(path.join(__dirname , '..' , 'frontend')))
console.log(path.join(__dirname, '..', 'frontend'))

app.use(bodyparser.json());

app.use(Details);
app.use(addexpense);
app.use(purchase);
app.use(premium)

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

sequelize.sync()
.then(()=>{
    app.listen(7777,()=>{
        console.log('server running on port 3000') 
    });
}) 
.catch((err)=>{
    console.log('error while connecting database:',err);
})
//animate.css for making animated response