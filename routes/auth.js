const router = require("express").Router();
const usersController = require("../controllers/users");

router.post("/register", usersController.registerUser);
router.get("/users", usersController.getUsers);
router.post("/login", usersController.login);
router.delete("/:id", usersController.deleteUser);
router.get("/", usersController.index);

module.exports = router;
