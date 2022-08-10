const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    title: { type: "String" ,trim: true  },
    description: { type: "String"  },
    rate: { type: "String" ,trim: true },
    movieCategoryName: { type: "String", require: true  ,trim: true},
    image: {
      type: "String",
      require: true,
      default:
        "https://flyclipart.com/thumb2/camera-cinema-film-movie-movies-play-icon-68102.png",
    },
    movieUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
