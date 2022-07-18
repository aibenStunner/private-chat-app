import { useQuery } from "@apollo/client";
import {
  Box,
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  TextField,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_MESSAGES } from "../graphql/queries";
import MessageCard from "./MessageCard";

const ChatScreen = () => {
  const { id, name } = useParams();
  const { loading, data, error } = useQuery(GET_MESSAGES, {
    variables: {
      receiverId: +id,
    },
  });

  if (error) return <Typography variant="h6">{error.message}</Typography>;

  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 0 }}>
        <Toolbar>
          {" "}
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
            sx={{ width: "32px", height: "32px", mr: 2 }}
          />
          <Typography variant="h6" color="black">
            {name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        backgroundColor="#f5f5f5"
        height="80vh"
        padding="10px"
        sx={{ overflowY: "auto" }}
      >
        {loading ? (
          <Typography variant="h6">Loading messageas...</Typography>
        ) : (
          data.messagesByUser.map((msg) => {
            return (
              <MessageCard
                text={msg.text}
                date={msg.createdAt}
                direction={msg.receiverId == +id ? "end" : "start"}
              />
            );
          })
        )}
      </Box>
      <TextField
        placeholder="Enter a message"
        variant="standard"
        fullWidth
        multiline
        rows={2}
      />
    </Box>
  );
};

export default ChatScreen;
