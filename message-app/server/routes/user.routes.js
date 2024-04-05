const users = require("../controllers/users.controller.js");
const router = require("express").Router();
const { checkJwt } = require("../middleware/auth");

router.post("/", users.createOrUpdateUser);
router.get("/", users.listUsers);
router.get("/:sub", checkJwt, users.getUser);
router.put("/:sub", users.updateUser);

module.exports = router;
