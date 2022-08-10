import { Fragment, useEffect, useState } from "react";
import QuoteForm from "../components/post/QuoteForm";
const Profile = (props) => {


  
  const user = JSON.parse(localStorage.getItem("userInfo"))
  ? JSON.parse(localStorage.getItem("userInfo"))
  : { userData: "" };
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${user.userData.token}`,
  },
};


  useEffect(() => {
    const searchHandler = async () => {
      
  const response = await fetch(
    'http://localhost:8080/api/user/profile',
    config
  );
  try {
    const users = await response.json();
  
    // setSearchedUsers(users);
    console.log(users);
  }
  catch(e){
    console.log(e)
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
          <div>
            <QuoteForm/>
          </div>
   

        <div class="col-md-3">
          <ul class="list-group">
            <h4 class="list-group-item active"> my categories</h4>
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
            <li class="list-group-item">A fourth item</li>
            <li class="list-group-item">And a fifth one</li>
          </ul>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Recipient's username"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              {" "}
              + add Category{" "}
            </button>
          </div>
        </div>

        <div class="col-md-9 row">
          <h2>my categories</h2>
          <div class="col-md-4">
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
                <br />
                <button type="button" class="btn btn-primary">
                  Edit
                </button>
                <button type="button" class="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
