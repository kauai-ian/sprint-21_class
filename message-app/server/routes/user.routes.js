const users = require("../controllers/users.controller.js");
const router = require("express").Router();
const { checkJwt } = require("../middleware/auth");

router.post("/", users.createOrUpdateUser);
router.get("/", users.listUsers);
router.get("/:sub", checkJwt, users.getUser);
router.put("/:sub", checkJwt, users.updateUser);
router.put("/:sub/follow", checkJwt, users.followUser);
router.put("/:sub/unfollow", checkJwt, users.unFollowUser);

module.exports = router;
