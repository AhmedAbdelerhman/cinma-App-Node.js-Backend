import { useEffect, useState } from "react";

const ChatPage = (props) => {
  const [InitValue, setInitValue] = useState("search=&rate=&category=");
  const [ searchedValue, setSearchedValue]=useState('')
  const [ RateValue, setRateValue]=useState('')
  const [ CategoryValue, setCategoryValue]=useState('')
  const [ movies, setMovies]=useState([])
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
    console.log(event.target.value);
    setInitValue(`search=${event.target.value}&rate=${RateValue}&category=${CategoryValue}`);
    setSearchedValue(event.target.value)
  };
  const ratingHandler = (event) => {
    console.log(event.target.value);
    setInitValue(`search=${searchedValue}&rate=${event.target.value}&category=${CategoryValue}`);
    setRateValue(event.target.value)

  };

  const categoryHandler = (event) => {
    setInitValue(`search=${searchedValue}&rate=${RateValue}&category=${event.target.value}`);
    setCategoryValue(event.target.value)

    console.log(event.target.value)
  };

  useEffect(() => {
    const searchHandler = async () => {
      console.log(InitValue)
      const response = await fetch(
        `http://localhost:8080/api/movie?${InitValue}`,
        config
      );
      try {
        const users = await response.json();

        // setSearchedUsers(users);
        setMovies(users)
        console.log(users);
        //    setisLoading(false);
      } catch (error) {
        //   setisLoading(false);
      }
    };
    searchHandler();
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

            <select
                multiple
              >
                <option className="list-group-item" value="happy ">One</option>
                <option className="list-group-item" value="2">Two</option>
                <option className="list-group-item" value="3">Three</option>
                <option className="list-group-item" value="3">Three</option>
                <option className="list-group-item" value="3">Three</option>
                <option className="list-group-item" value="3">Three</option>
                <option className="list-group-item" value="3">Three</option>
                <option className="list-group-item" value="3">Three</option>

              </select>
       
            </ul>
          </form>
        </div>

        <div class="col-md-9 row">
       {  movies.map() <div class="col-md-4">
            <div class="card">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div> rating : 5 </div>
                <div> category : action </div>
                <div> created by : ahmed</div>
              </div>
            </div>
          </div>}

        </div>
      </div>
    </div>
  );
};
export default ChatPage;
