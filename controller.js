const User = require('../model/model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
require('dotenv').config({ path: __dirname + '/../.env' });
//const crypto=require('crypto')
//const keyLengthBytes = 32;


const jwtSecretKey = process.env.JWTSECRETKE;
console.log('RAZORPAY_KEY_SECRET:', process.env.jwtSecretKey)
console.log("Generated JWT Secret Key:", jwtSecretKey);


exports.addmethod = async (req, res, next) => {
  try {
    const { username ,email,password} = req.body;
    console.log('from req.body>>>>', username,email,password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password:hashedPassword
      

    })
    res.json({ newuser: newUser})
    console.log('response from add method', newUser);
    next();
  }
  catch (error) {
    res.json({ Error: error })
    console.log('error from add method in add.js', error);
    next();
  }
  
}

function generatetoken(id){
 return jwt.sign({userId:id},jwtSecretKey )
}
//token:generatetoken(user[0].id)

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);

    
    const user = await User.findOne({ where: { email } });

    if (user) {
     
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token=generatetoken(user.id);
        res.status(200).json({ success: true, message: "User logged in successfully",token });
      } else {
        res.status(400).json({ success: false, msg: "Incorrect password" });
      }
    } else {
      res.status(404).json({ success: false, msg: "User not found" });
    }

  } catch (e) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getmethod = async (req, res,next) => {
  try {
    const data = await User.findAll();
    const modifiedData = data.map((User) => ({
      id: User.id, 
      username: User.username,
      email: User.email,
      password:User.password,
      
    }));
    res.json({ alluser: modifiedData });
    next();
  } catch (error) {
    console.log('Error from add.js get method', error);
    res.json({ Error: error });
    next();
  }
};
