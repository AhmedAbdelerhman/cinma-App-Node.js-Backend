const Movie = require("../models/movieModel");
const Category = require("../models/categoryModel");
const path = require("path");
const fs = require("fs");

//@description     create  a movie
//@route           post /api/movie/new-move
//@access           protected by token
exports.createMovie = async (req, res) => {

  //const { title, description, rate,  movieCategory } = req.body;
  const { title, description, rate, movieCategory } = JSON.parse(req.body.data);
  if (!title || !description || !rate) {
    res.status(400).json({ message: "some data missed" });
    return;
  }

  const isValidCategory = await Category.exists({ title: movieCategory });

  try {
    if (isValidCategory) {
      const movie = await Movie.create({
        title,
        description,
        rate,
        image: `http://${req.headers.host}/${req.file.path.replace("\\", "/")}`,

        movieCategoryName: movieCategory,
        movieUser: req.user._id,
      });

      if (movie) {
        res.status(201).json({
          message: "Movie created successfully",
          movie: movie,
        });
      } else {
        res.status(400).json({ message: "failed to create Movie" });
      }
    } else res.status(400).json({ message: "please select a valid Category" });
  } catch (error) {
    res.status(400).json({ message: "failed to create Movie" + error });
  }
};
//filters
//@description     get all movies with filters (category/rate/name) params  (category/rate/search)
//@route           get /api/movie/?
//@access           protected by token
exports.getAllMovies = async (req, res) => {
  let keyword = null;
 let  search= req.query.search||""
 let  category=  req.query.category||""
let  rate =  req.query.rate||""


  keyword={ title: { $regex: search, $options: "i" } ,
  movieCategoryName: { $regex: category, $options: "i" },
  rate: { $regex:rate, $options: "i" }

  }
  try {
    const movies = await Movie.find(keyword).sort({ title: 1 });

    if (movies) {
      res.status(201).json({
        message: "movies fetched successfully sorted by alphabetical order if exist",
        movies,
      });
    } else {
      res.status(400).json({ message: "failed to fetch movies" });
    }
  } catch (error) {
    res.status(400).json({ message: "failed to fetch movies" + error });
  }
};

//@description     create  a movie
//@route           put /api/movie/:id
//@access           protected by token
exports.updateMovie = async (req, res) => {
  const movieId = req.params.id.trim();
  const { title, description, rate, image, movieCategory } = req.body;

  if (!title || !description || !rate) {
    res.status(400).json({ message: "some data missed" });
    return;
  }
  try {
    const isValidCategory = await Category.exists({ title: movieCategory });
    if (isValidCategory) {
      const movie = await Movie.findOne({ _id: movieId });
      if (movie.movieUser.toString() === req.user._id.toString()) {
        movie.title = title;
        movie.description = description;
        movie.rate = +rate;
        movie.image = image;
        movie.movieCategoryName = movieCategory;

        const updatedMovie = await movie.save();

        if (updatedMovie) {
          res.status(200).json({
            message: "Category updated successfully",
            updatedMovie: updatedMovie,
          });
        } else {
          res.status(400).json({ message: "failed to updated Category" });
        }
      } else {
        res.status(400).json({
          message: " you are not authorized to updated it ",
          movie: movie,
        });
      }
    } else res.status(400).json({ message: "please insert valid Category" });
  } catch (error) {
    res.status(400).json({ message: "failed to updated Category" + error });
  }
};

//@description     delete  a movie
//@route           delete /api/movie/:id
//@access           protected by token
exports.deleteMovie = async (req, res) => {
  const movieId = req.params.id.trim();

  Movie.findOne({
    _id: movieId,
  })
    .then((movie) => {
      if (movie.movieUser.toString() === req.user._id.toString()) {
        deleteImage(movie.image);
        Movie.findOneAndRemove({
          _id: movieId,
        }).then(() => {
          res.status(200).json({
            message: "movie deleted successfully",
          });
        });
      } else
        res.status(400).json({
          message: " you are not authorized to delete it ",
          movie: movie,
        });
    })
    .catch((err) => {
      res.status(200).json({ message: "failed to delete " + err });
    });
};

// helper function
const deleteImage = (filePath) => {
  const imagePath = path.join(__dirname, "..", filePath);

  fs.unlink(imagePath, (err) => {
    if (err) return res.status(404).json({ error: "could not delete  image" });
  });
};
