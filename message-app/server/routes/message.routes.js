const messages = require("../controllers/messages.controller.js");
const router = require("express").Router();
const { checkJwt } = require("../middleware/auth");

router.post("/", checkJwt, messages.createMessage);
router.get("/", messages.listMessages);
router.get("/:_id", checkJwt, messages.getMessage);
router.put("/:_id", checkJwt, messages.updateMessage);
router.put("/:_id/like", checkJwt, messages.likeMessage);
router.delete("/:_id", checkJwt, messages.deleteMessage);

module.exports = router;
