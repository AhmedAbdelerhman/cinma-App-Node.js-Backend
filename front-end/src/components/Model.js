import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CardHeader,
  FilledInput,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Fragment, useRef, useState } from "react";
import { Search, Visibility } from "@mui/icons-material";
import Skeleton from "./Ui/Skeleton";
import axios from "axios";
const Model = (props) => {
  const [IsOpen, setIsOpen] = useState(false);

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const searchRef = useRef();

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: " 40%",
    height: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const user = JSON.parse(localStorage.getItem("userInfo"))
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { userData: "" };
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.userData.token}`,
    },
  };

  const searchHandler = async () => {
    let searchValue = searchRef.current.value;
    setisLoading(true);
    const response = await fetch(
      `http://localhost:8080/api/user?search=${searchValue}`,
      config
    );
    try {
      const users = await response.json();
      setSearchedUsers(users);
      console.log(users);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };

  

  return (
    <Fragment>
      <div>
        <Button
          onClick={handleOpen}
          variant="contained"
          endIcon={<GroupAddIcon />}
        >
          Add Group
        </Button>
        <Modal
          open={IsOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              textAlign={"center"}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Text in a modal
            </Typography>

            <FilledInput
              sx={{ width: "100% !important", margin: "auto !important" }}
              id="filled-adornment-password"
              type="text"
              inputRef={searchRef}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={searchHandler}
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              }
            />
            <Box sx={{ height: "70%", overflowY: "scroll" }}>
              {searchedUsers.map((user) => {
                return (
                  <Skeleton
                    name={user.name}
                    email={user.email}
                    pic={user.pic}
                    isLoading={isLoading}
                   id={user._id}
                  />
                );
              })}
              {isLoading && (
                <div>
                  <Skeleton isLoading={true} />
                  <Skeleton isLoading={true} />
                  <Skeleton isLoading={true} />
                </div>
              )}
            </Box>
          </Box>
        </Modal>
      </div>
    </Fragment>
  );
};
export default Model;

/*

     <Autocomplete
              sx={{
                display: "block",
                width: "80% !important",
                margin: "auto",
                position: "absolute",
              }}
              id="combo-box-demo"
              options={chats}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Combo box" variant="outlined" />
              )}
            />


*/
