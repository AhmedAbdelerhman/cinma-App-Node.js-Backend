import { useEffect, useState } from "react";

const ChatPage = (props) => {
  const [InitValue, setInitValue] = useState("search=&rate=&category=");
  const [searchedValue, setSearchedValue] = useState("");
  const [RateValue, setRateValue] = useState("");
  const [CategoryValue, setCategoryValue] = useState("");
  const [movies, setMoviesObj] = useState({});
  const [categories, setCategories] = useState({});
  const user = JSON.parse(localStorage.getItem("userInfo"))
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { userData: "" };
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.userData.token}`,
    },
  };

  const searchHandler = (event) => {
    setInitValue(
      `search=${event.target.value}&rate=${RateValue}&category=${CategoryValue}`
    );
    setSearchedValue(event.target.value);
  };
  const ratingHandler = (event) => {
    setInitValue(
      `search=${searchedValue}&rate=${event.target.value}&category=${CategoryValue}`
    );
    setRateValue(event.target.value);
  };

  const categoryHandler = (event) => {
    setInitValue(
      `search=${searchedValue}&rate=${RateValue}&category=${event.target.value}`
    );
    setCategoryValue(event.target.value);

  };

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `http://localhost:8080/api/movie?${InitValue}`,
        config
      );
      try {
        const movies = await response.json();

        setMoviesObj(movies);
      } catch (error) {}
    };

    const getCategoriesHandler = async () => {
      const response = await fetch(
        `http://localhost:8080/api/category`,
        config
      );
      try {
        const categories = await response.json();

        setCategories(categories);
      } catch (error) {}
    };
    getCategoriesHandler();
    getMovies();
  }, [InitValue]);
  return (
    <div className="container mt-5">
      <div class="row">
        <div>
          <a href="/profile" class=" btn-danger  btn">
            my profile
          </a>
        </div>
        <div class="col-md-3">
          <h2> filters</h2>

          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="write movie title"
              onChange={searchHandler}
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              search
            </button>
          </div>

          <form class="radio" onChange={ratingHandler}>
            <div class="form-check ">
              <h4> Rating</h4>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value=""
              />
              <label class="form-check-label" for="flexRadioDefault1">
                without Rating
              </label>
            </div>
            <div class="form-check radio">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="1"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                1{" "}
              </label>
            </div>
            <div class="form-check radio">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="2"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                2
              </label>
            </div>
            <div class="form-check radio">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="3"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                3
              </label>
            </div>
            <div class="form-check radio">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="4"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                4
              </label>
            </div>
            <div class="form-check radio">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="5"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                5
              </label>
            </div>
          </form>

          <form onChange={categoryHandler}>
            <ul class="list-group">
              <h2>category</h2>

              <select multiple>
                <option className="list-group-item" value="">
                  default
                </option>
                {categories.categories?.map((category) => {
                  return (
                    <option
                      className="list-group-item"
                      key={category._id}
                      value={category.title}
                    >
                      {category.title}
                    </option>
                  );
                })}
              </select>
            </ul>
          </form>
        </div>

        <div class="col-md-9 row">
          {movies.movies?.map((movie) => {
            return (
              <div class="col-md-4" key={movie._id}>
                <div class="card">
                  <img
                    crossorigin="anonymous"
                    src={movie.image}
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">title :{movie.title}</h5>
                    <p class="card-text"> description :{movie.description}</p>
                    <div> rating : {movie.rate}</div>
                    <div> category : {movie.movieCategoryName} </div>
                    <div> created by : {movie.movieUser.name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
