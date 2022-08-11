import axios from "axios";
import {  useEffect, useState } from "react";
import QuoteForm from "../components/post/QuoteForm";
const Profile = (props) => {
  const [profile, setprofile] = useState({});
  const [dataResponse, setDataResponse] = useState({});
  const [ message, setmessage]=useState({})

  const user = JSON.parse(localStorage.getItem("userInfo"))
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { userData: "" };
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.userData.token}`,
    },
  };

  const addCategoryHandler = async (event) => {


    try {
      if (event.key === "Enter") {
        const { data } = await axios.post(
          "http://localhost:8080/api/category/new-category",
          {
            title: event.target.value,
          },
          {
            headers: {
              "Content-type": "application/json",

              Authorization: `Bearer ${user.userData.token}`,
            },
          }
        );
        setmessage(data)
        setDataResponse(data);
        return data
      }
    } catch (e) {
      setmessage(e.response)
       (e);
      return {error:e.response}

    }
  };
  const deleteMovieHandler =async(id) =>{
  const { data } = await axios.delete(
    `http://localhost:8080/api/movie/${id}`,
    {
      headers: {
        "Content-type": "application/json",

        Authorization: `Bearer ${user.userData.token}`,
      },
    }
  );
  
  window.location.reload()
   (data)
  //window.location.reload()

  }

  useEffect(() => {
    const searchHandler = async () => {
      try {
      const response = await fetch(
        "http://localhost:8080/api/user/profile",
        config
        );
        const profile = await response.json();

        // setSearchedUsers(users);
        setprofile(profile);
      } catch (e) {
      }
    };
    searchHandler();
  }, []);

  return (
    <div className="container mt-5">
      <div class="row">
        <a href="/main" class="link-dange">
          back to main
        </a>
        <h1 className="text-center">{profile.message} loaded</h1>
        <div>
          <QuoteForm />
        </div>

        <div class="col-md-3">
          <ul class="list-group">
            <h2>category</h2>
            <p>{message.message}</p>

            <select multiple>
              <option className="list-group-item" value="">
                {profile.categories?.length <= 0 &&
                  "you do not create any category"}
              </option>
              {profile.categories?.map((category) => {
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
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="add category"
              onKeyPress={addCategoryHandler}
            />
          </div>
        </div>
        <div className="col-md-8 row my-5">
          {profile.movies?.map((movie) => {
            return (
              <div class="col-md-4 mb-3" key={movie._id}>
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

                    <br />
                    <button type="button" class="btn btn-primary">
                      Edit
                    </button>
                    <button type="button" class="btn btn-danger"  onClick={()=>deleteMovieHandler(movie._id)}>
                      Delete
                    </button>
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
export default Profile;
