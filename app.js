const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/../.env' });
const helmet=require('helmet');
const compression=require('compression');
const morgan=require('morgan');
const fs=require('fs');



const bodyparser = require('body-parser');
const sequelize = require('./util/database');

const Details = require('./router/router');
const addexpense=require('./router/expense')
const purchase=require('./router/purchase')
const premium =require('./router/premium')
const resetpassword=require('./router/resetpassword')
const report=require('./router/report')
const user=require('./model/model')
const expense=require('./model/expense')
const order=require('./model/purchase')
const Forgotpassword=require('./model/forgotpassword')
const download=require('./model/download')



const path=require('path')
const app = express();

const accessLogStream=fs.createWriteStream(
    path.join(__dirname,'access.log'),{flags:'a'}
);

//,{stream:accessLogStream}
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLogStream}))
app.use(cors());

app.use(express.static(path.join(__dirname , '..' , 'frontend')))
console.log(path.join(__dirname, '..', 'frontend'))

app.use(bodyparser.json());

app.use(Details);
app.use(addexpense);
app.use(purchase);
app.use(premium)
app.use(resetpassword)
app.use(report)

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

user.hasMany(Forgotpassword);
Forgotpassword.belongsTo(user);

user.hasMany(download);
download.belongsTo(user);

sequelize.sync()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log('server running on port 3000') 
    });
}) 
.catch((err)=>{
    console.log('error while connecting database:',err);
})
//animate.css for making animated response