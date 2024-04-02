const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");

router.get("/", users.list);
router.post("/", users.create);

router.get("/:id", users.get);
router.put("/:id", users.update);

module.exports = router;
