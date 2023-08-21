import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Divider from "@mui/material/Divider";


function LogoutListItem(props) {

  const username = props.username;
  const role = props.role;

  function logoutHandler() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <Divider/>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={username}/>
          <ListItemText primary={role}/>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={logoutHandler}>
          <ListItemText primary={"Đăng xuất"}/>
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default LogoutListItem;