import { Box, Divider, Typography, Stack } from "@mui/material";
import React from "react";
import UserCard from "./UserCard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/queries";

const SideBar = ({ setLoggedIn }) => {
  const { loading, data, error } = useQuery(GET_ALL_USERS);

  if (loading) return <Typography variant="h6">Loading chats...</Typography>;
  if (error) return <Typography variant="h6">{error.message}</Typography>;

  return (
    <Box backgroundColor="#f7f7f7" height="100vh" width="250px" padding="10px">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Chat</Typography>
        <LogoutIcon
          onClick={() => {
            localStorage.removeItem("jwt");
            setLoggedIn(false);
          }}
        />
      </Stack>
      <Divider />
      {data.users.map((user) => {
        return <UserCard key={user.id} user={user} />;
      })}
    </Box>
  );
};

export default SideBar;
