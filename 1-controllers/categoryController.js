const Category = require("../models/categoryModel");

//@description     Create New category
//@route           POST /api/category/new-category
//@access          Protected

exports.createCategory = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: "please insert title" });
    return;
  }

  try {
    const category = await Category.create({
      title,
      categoryUser: req.user._id,
    });

    if (category) {
      res.status(201).json({
        message: "Category created successfully",
        category: category,
      });
    } else {
      res.status(400).json({ message: "failed to create Category" });
    }
  } catch (error) {
    if (error.code === 11000)
      res.status(400).json({ message: "the Category already in the database" });
    else res.status(400).json({ message: "failed to create Category" + error });
  }
};

//@description     get all categories list for all users
//@route           get /api/category/
//@access          public

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories) {
      res.status(201).json({
        message: "Categories fetched successfully",
        categories: categories,
      });
    } else {
      res.status(400).json({ message: "failed to fetch Categories" });
    }
  } catch (error) {
    res.status(400).json({ message: "failed to fetch Categories" + error });
  }
};

//@description     update category for each user
//@route           put /api/category/:id
//@access          protected

exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id.trim();
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: "please insert title" });
    return;
  }

  Category.findOne({
    _id: categoryId,
  })
    .then(async (category) => {
      if (category.categoryUser.toString() == req.user._id.toString()) {
        category.title = title;
        const updatedCategory = await category.save();

        if (updatedCategory) {
          res.status(200).json({
            message: "Category updated successfully",
            category: category,
          });
        } else {
          res.status(400).json({ message: "failed to updated Category" });
        }
      } else
        res.status(400).json({
          message: " you are not authorized to updated it ",
          category: category,
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "failed to updated  " + err });
    });
};

//@description     delete category for each user
//@route           delete /api/category/:id
//@access          protected

exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id.trim();

  Category.findOne({
    _id: categoryId,
  })
    .then((category) => {
      if (category.categoryUser.toString() === req.user._id.toString()) {
        Category.findOneAndRemove({
          _id: categoryId,
        }).then(() => {
          res.status(200).json({
            message: "Category deleted successfully",
          });
        });
      } else
        res.status(400).json({
          message: " you are not authorized to delete it ",
          category: category,
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "failed to delete " + err });
    });
};
