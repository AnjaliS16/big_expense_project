const User = require('../model/model');
const bcrypt=require('bcrypt');
//const jwt=require('jsonwebtoken')

exports.addmethod = async (req, res, next) => {
  try {
    const { username ,email,password} = req.body;
    console.log('from req.body>>>>', username,email,password);

    const newUser = await User.create({
      username,
      email,
      password
      

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


exports.login = async (req, res) => {
  try {
    const{email,password}=req.body;
    console.log(password);

    // Find user by email
     User.findAll({ where: { email: email } }).then(user=>{
      if(user.length>0){
        if(user[0].password===password){
          res.status(200).json({success:true,message:"User loged in successfully"})
          
        }
        else{
         
         return res.status(400).json({ success: false, msg: "incorrect password" });

        }
      }
      else{
        alert('user not fount')
        return res.status(404).json({ success: false, msg: "user not found" });
      
      }

     });

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
