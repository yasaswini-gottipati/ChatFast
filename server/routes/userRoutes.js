const router = require('express').Router();
const {register,login,setAvathar,getAllUsers} = require('../controllers/userControllers');

router.post("/register",register);
router.post("/login",login);
router.post("/avathar/:id",setAvathar)
router.get("/allusers/:id",getAllUsers);

module.exports = router;