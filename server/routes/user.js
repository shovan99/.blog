const express = require("express");
const router = express.Router();

const { getUserById , getUser , isSignedIn , signup , signin , signout } = require("../controllers/user")

router.param("userId" , getUserById);

router.get("/user/:userId" , isSignedIn , getUser);


router.post("/signup" , signup);

router.post("/signin" , signin);

router.get("/signout" , signout);

module.exports = router