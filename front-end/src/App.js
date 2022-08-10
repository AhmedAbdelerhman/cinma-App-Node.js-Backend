import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

import { Redirect } from "react-router-dom";
import {
  Box,

  styled,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Form from "./pages/Form";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";

function App() {


  const ThemeTag = styled("div")({
    position: "fixed",
    top: "3%",
    left: "3%",
  });

  const MyBox = styled(Box)({

  });


  return (

      <MyBox bgcolor="background.default" color={"text.primary"}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home/login" />
          </Route>
          <Route path="/home/login" exact>
            <Form  signUp={false} />
          </Route>
          <Route path="/home/signup" exact>
            <Form signUp={true} />
          </Route>

          <Route path="/main">
            <MainPage  />
          </Route>
          <Route path="/profile">
            <Profile  />
          </Route>
        </Switch>
        <ThemeTag>
    
        </ThemeTag>
      </MyBox>
  );
}

export default App;
