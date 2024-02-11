const express = require('express');
const cors = require('cors');

const bodyparser = require('body-parser');
const sequelize = require('./util/database');

const Details = require('./router/router');

const path=require('path')

const app = express();

app.use(cors());


app.use(bodyparser.json());

app.use(Details);


// Use the encoded __dirname in the static middleware
//app.use(express.static(path.resolve(__dirname, '..', 'frontend')));

sequelize.sync()
.then(()=>{
    app.listen(3882,()=>{
        console.log('server running on port 3000') 
    });
}) 
.catch((err)=>{
    console.log('error while connecting database:',err);
})
