const express = require('express');
const cors = require('cors');
//app.use(cors());

const bodyparser = require('body-parser');
const sequelize = require('./util/database');

const Details = require('./router/router');
const addexpense=require('./router/expense')
const user=require('./model/model')
const expense=require('./model/expense')

const path=require('path')

const app = express();

//app.use(cors());
app.use(cors());



app.use(bodyparser.json());

app.use(Details);
app.use(addexpense);

user.hasMany(expense);
expense.belongsTo(user);


// Use the encoded __dirname in the static middleware
///app.use(express.static(path.join(__dirname, '../frontend')));
console.log(path.join(__dirname, '..', 'frontend'))
app.use(express.static(path.join(__dirname , '..' , 'frontend')))

sequelize.sync()
.then(()=>{
    app.listen(4681,()=>{
        console.log('server running on port 3000') 
    });
}) 
.catch((err)=>{
    console.log('error while connecting database:',err);
})
