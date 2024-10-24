const itemController = require("../controllers/item.controller.js");
const router = require("express").Router();

router.post("/", itemController.create);

router.get("/", itemController.findAll);

router.get("/:id", itemController.findOne);

router.put("/:id", itemController.update);

router.delete("/:id", itemController.delete);

module.exports = router;
