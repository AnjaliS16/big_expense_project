const express = require('express');
const cors = require('cors');

const bodyparser = require('body-parser');
const sequelize = require('./util/database');

const Details = require('./router/router');

const app = express();

app.use(cors());


app.use(bodyparser.json());

app.use(Details);

sequelize.sync()
.then(()=>{
    app.listen(3600,()=>{
        console.log('server running on port 3000')  
    });
}) 
.catch((err)=>{
    console.log('error while connecting database:',err);
})
