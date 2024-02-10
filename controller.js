const User = require('../model/model');

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

