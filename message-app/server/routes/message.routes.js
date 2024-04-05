const messages = require("../controllers/messages.controller.js");
const router = require("express").Router();

router.post("/", messages.createMessage);
router.get("/", messages.listMessages);
router.get("/:_id", messages.getMessage);
router.put("/:_id", messages.updateMessage);
router.put("/:_id/like", messages.likeMessage);
router.delete("/:_id", messages.deleteMessage);

module.exports = router;
