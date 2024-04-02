const express = require("express");
const router = express.Router();
const messages = require("../controllers/messages.controller");

router.get("/", messages.list);
router.post("/", messages.create);

router.get("/:id", messages.get);
router.put("/:id", messages.update);
router.delete("/:id", messages.remove);

module.exports = router;
