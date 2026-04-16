const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController");

router.post("/test-finished", testController.testFinished);
router.get("/support-click", testController.supportClick);

module.exports = router;