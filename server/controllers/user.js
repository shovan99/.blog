const User = require("../models/User")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const bcrypt = require("bcryptjs");

exports.getUserById = async( req , res , next , id ) => {
    await User.findById(id).exec((err , user)=> {
        if(err || !user) {
            return res.status(400).json({
                error: "No User Was Found In DB"
            })
        }
        req.profile = user;
        next()
    })
}

exports.getUser = async(req , res) => {
    req.profile.password = undefined;
    return res.json(req.profile)
}

exports.signup = async( req , res )=> {
    const { name , email , password } = req.body;
    const user = new User({
        name: name,
        email: email,
        password: password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password , salt);
    await user.save((err , user) => {
            if(err) {
            return res.status(400).json({
                error: "Not Able To Save User In DB"
            })
            }
            res.json({
            name: user.name,
            email: user.email,
            id: user._id
            });
    })
}

exports.signin = async( req , res )=>{
    const { email , password } = req.body;

    await User.findOne({ email: email } , async( err , user )=>{

      if(err || !user) {
        return res.status(400).json({
          error : "User Email Doesn't exist"
        })
      }
      
      const match = await bcrypt.compare(password , user.password)
      if(!match) {
        return res.status(400).json({
              error : "Email And Password Do Not Match"
        })
      }
       const token = jwt.sign( {_id : user._id } , "SHOVANAICHTCSNINJAJOININGSOON")
        //Put Token Into Cookies
        res.cookie("token" , token , { expire: new Date() + 2222 })
        //Send Response To Front-End
        const { _id , name , email } = user;
        return res.json({token , user: {_id , name , email }})

      // await bcrypt.compare(password, user.password, ( err , result ) => {
      //   if( err ) {
      //       return res.status(400).json({
      //         error : "Email And Password Do Not Match"
      //       })
      //   }
      //     const token = jwt.sign( {_id : user._id } , "SHOVANAICHTCSNINJAJOININGSOON")
      //     //Put Token Into Cookies
      //     res.cookie("token" , token , { expire: new Date() + 2222 })
      //     //Send Response To Front-End
      //     const { _id , name , email } = user;
      //     return res.json({token , user: {_id , name , email }})
      // })
      // if(!bcrypt.compare(password , user.password)) {
      //   return res.status(400).json({
      //     error : "Email And Password Do Not Match"
      //   })
      // }

      // //Create Token
      // const token = jwt.sign( {_id : user._id } , "SHOVANAICHTCSNINJAJOININGSOON")
      // //Put Token Into Cookies
      // res.cookie("token" , token , { expire: new Date() + 2222 })
      // //Send Response To Front-End
      // const { _id , name , email } = user;
      // return res.json({token , user: {_id , name , email }})

    })
}

exports.signout = ( req , res ) => {
  res.clearCookie("token");
  res.json({
    message: "User Signout Successfully"
  })
}

//Protected Routes
exports.isSignedIn = expressJwt({
  secret: "SHOVANAICHTCSNINJAJOININGSOON",
  requestProperty : "auth"
})

//Custom Middlewares

exports.isAuthenticated = ( req, res , next ) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  if(!checker) {
    return res.status(400).json({
      error: "Access Denied"
    })
  }
  next()
}
