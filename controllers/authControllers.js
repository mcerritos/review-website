const bcrypt=require('bcryptjs');
const db=require('../models');

const register=(req,res)=>{
	db.User.findOne({email: req.body.email}, (err, foundUser) =>{
		if (foundUser) {
      	return res.status(400).json({status: 400, message: 'Account already registerd, please login'});
    }

    //try not salt data 
    const userData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        }


	db.User.create(userData, (err, newUser) => {
          if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again'});

          res.status(201).json({status: 201, message: 'Success'});
        });

	});
};


const login=(req,res)=>{
  res.status(200);
	db.User.findOne({email: req.body.email}, (err, foundUser) => {
		 if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    // Verify User Account Exists
   		 if (!foundUser) {
      	return res.status(400).json({status: 400, message: 'Invalid credentials'});
    }

    	if(foundUser.password==req.body.password){
    		req.session.currentUser = {
          _id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
        };
        res.status(200).json({status: 200, user: req.session.currentUser});
    	}else{
    		 res.status(400).json({status: 400, error: 'Invalid credentials, please try again'});
    	}

	});


}

// DELETE Session Destroy
const logout = (req, res) => {
  if (!req.session.currentUser) {
    // Not Authorized
    return res.status(401).json({status: 401, error: 'Unauthorized, please login and try again'});
  }
  
  // Destroy Session and Respond with Success
  req.session.destroy((err) => {
    if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again'});

    res.status(200).json({status: 200, message: 'Success'});
  });
};

// Verify Route for Development/Testing
const verify = (req, res) => {
  if (!req.session.currentUser) {
    // Not Authorized
    return res.status(401).json({status: 401, error: 'Unauthorized, please login and try again'});
  }

  return res.json({
    status: 200,
    message: 'Authorized',
    currentUser: req.session.currentUser,
  });
};

module.exports = {
  register,
  login,
  logout,
  verify,
};
