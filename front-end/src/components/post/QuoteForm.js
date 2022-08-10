import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import axios from "axios";

import Card from "../Ui/Card";
import LoadingSpinner from "../Ui/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const title = useRef();
  const description = useRef();
  const rate = useRef();
  const category = useRef();
  const [file, setFile] = useState();
  const [formShow, setFormShow] = useState(false);

  // const send = event => {

  //   // Axios.post("https://httpbin.org/anything", data)
  //   //   .then(res => console.log(res))
  //   //   .catch(err => console.log(err));
  // };

  const user = JSON.parse(localStorage.getItem("userInfo"))
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { userData: "" };
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.userData.token}`,
    },
  };

  function submitFormHandler(event) {
    event.preventDefault();
    if (!formShow) {
      setFormShow(true);
    } else {
      event.preventDefault();
      const enteredTitle = title.current.value;
      const enteredDescription = description.current.value;
      const enteredCategory = category.current.value;
      const enteredRate = rate.current.value;
      const inputData = new FormData();
      inputData.append("title", enteredTitle);
      inputData.append("description", enteredDescription);
      inputData.append("rate", enteredRate);
      inputData.append("movieCategoryName", enteredCategory);

      inputData.append("image", file);

      const searchHandler = async () => {
        try {
          const { data } = await axios.post(
            "http://localhost:8080/api/movie/new-move",
          {title:enteredTitle

            },
            config
          );
          console.log(data)

          return { userData: data };
        } catch (error) {
          console.log(error)
          return { error: error.response.data };
        }
      };

      searchHandler();
    }
  }

  const clickHandler = () => {
    setFormShow(false);
  };
  return (
    <div>
      {/* <Prompt /> */}
      <Card>
        <form className={classes.form}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          {formShow && (
            <div>
              <div className={classes.control}>
                <label htmlFor="author">title</label>
                <input type="text" id="author" ref={title} />
              </div>
              <div className={classes.control}>
                <label htmlFor="author">category</label>
                <input type="text" id="author" ref={category} />
              </div>

              <div className={classes.control}>
                <label htmlFor="author">rate</label>
                <input type="number" min="1" max="5" step="1" ref={rate} />{" "}
              </div>

              <div>
                <label for="formFileLg" class="form-label">
                  select image
                </label>
                <input
                  class="form-control "
                  id="formFileLg"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFile(file);
                  }}
                />
              </div>

              <div className={classes.control}>
                <label htmlFor="text">description</label>
                <textarea id="text" rows="3" ref={description}></textarea>
              </div>
              <div className={classes.actions}>
                <button onClick={clickHandler} className="btn btn-danger">
                  close
                </button>
              </div>
            </div>
          )}
          <div class="w-100 text-center">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={submitFormHandler}
            >
              Post <i class="bi bi-plus-circle"></i>
            </button>{" "}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default QuoteForm;
