import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  Box,
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_MESSAGES } from "../graphql/queries";
import MessageCard from "./MessageCard";
import { SEND_MESSAGE } from "../graphql/mutations";
import { MSG_SUB } from "../graphql/subscriptions";

const ChatScreen = () => {
  const { id, name } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: {
      receiverId: +id,
    },
    onCompleted(data) {
      setMessages(data.messagesByUser);
    },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted(data) {
      // setMessages((prevMessages) => [...prevMessages, data.createMessage]);
    },
  });

  const { data: subData } = useSubscription(MSG_SUB, {
    onSubscriptionComplete(data) {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data.messageAdded]);
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
                key={msg.id}
                text={msg.text}
                date={msg.createdAt}
                direction={msg.receiverId === +id ? "end" : "start"}
              />
            );
          })
        )}
      </Box>
      <Stack direction="row">
        <TextField
          placeholder="Enter a message"
          variant="standard"
          fullWidth
          multiline
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SendIcon
          fontSize="large"
          onClick={() =>
            sendMessage({
              variables: {
                receiverId: +id,
                text,
              },
            })
          }
        />
      </Stack>
    </Box>
  );
};

export default ChatScreen;
