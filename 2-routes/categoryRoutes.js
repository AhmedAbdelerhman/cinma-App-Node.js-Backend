const express = require("express");

const categoryController = require("../1-controllers/categoryController");

const isAuth = require("../isAuth/isAuth");

const router = express.Router();

router.get("/", isAuth, categoryController.getAllCategories);

router.post("/new-category", isAuth, categoryController.createCategory);
router.put("/:id", isAuth, categoryController.updateCategory);

router.delete("/:id", isAuth, categoryController.deleteCategory);

module.exports = router;
