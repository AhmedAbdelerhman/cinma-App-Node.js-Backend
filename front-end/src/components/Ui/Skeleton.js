import {
  Avatar,
  Button,
  CardHeader,
  IconButton,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { Fragment } from "react";
import { ChatState } from "../../store/ChatProvider";
const CustomSkeleton = (props) => {
  const { setMyChats } = ChatState();
  const user = JSON.parse(localStorage.getItem("userInfo"))
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { userData: "" };

  const addToChatHandler = async () => {
await axios
      .post(
        "http://localhost:8080/api/chat",
        {
          userId: props.id,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.userData.token}`,
          },
        }
      )


      const {data} = await axios
      .get(
        "http://localhost:8080/api/chat",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.userData.token}`,
          },
        }
      )

      setMyChats(data)
  };

  return (
    <Fragment>
      <Button onClick={addToChatHandler}>
        <CardHeader
          avatar={
            props.isLoading ? (
              <Skeleton
                animation="wave"
                variant="circle"
                width={80}
                height={40}
              />
            ) : (
              <Avatar alt="Ted talk" src={props.pic} />
            )
          }
          action={
            props.isLoading ? null : (
              <IconButton aria-label="settings"></IconButton>
            )
          }
          title={
            props.isLoading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="100%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              `${props.name}`
            )
          }
          subheader={
            props.isLoading ? (
              <Skeleton animation="wave" height={10} width="100%" />
            ) : (
              `${props.email}`
            )
          }
        />
      </Button>
    </Fragment>
  );
};
export default CustomSkeleton;
