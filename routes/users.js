const router = require("express").Router();
const usersController = require("../controllers/users");
const auth = require("../config/auth");

router.post("/register", usersController.registerUser);
router.get("/users", usersController.getUsers);
router.post("/login", usersController.login);
router.delete("/:id", usersController.deleteUser);
router.get("/current", auth, usersController.index);
module.exports = router;
