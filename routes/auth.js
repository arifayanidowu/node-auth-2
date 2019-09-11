const router = require("express").Router();
const usersController = require("../controllers/users");

router.post("/register", usersController.registerUser);
router.get("/users", usersController.getUsers);
router.post("/login", usersController.login);

module.exports = router;
