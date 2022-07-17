import { Box, Divider, Typography, Stack } from "@mui/material";
import React from "react";
import UserCard from "./UserCard";
import LogoutIcon from "@mui/icons-material/Logout";

const SideBar = () => {
  const users = [
    { id: 1, firstName: "Name", lastName: "dasf" },
    { id: 2, firstName: "Name2", lastName: "dasf" },
    { id: 3, firstName: "Name3", lastName: "dasf" },
  ];

  return (
    <Box backgroundColor="#f7f7f7" height="100vh" width="250px" padding="10px">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Chat</Typography>
        <LogoutIcon />
      </Stack>
      <Divider />
      {users.map((user) => {
        return <UserCard key={user.id} user={user} />;
      })}
    </Box>
  );
};

export default SideBar;
