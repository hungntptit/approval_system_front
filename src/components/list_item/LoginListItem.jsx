import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Divider from "@mui/material/Divider";


function LoginListItem() {
  return (
    <>
      <Divider/>
      <ListItem disablePadding>
        <ListItemButton href={"/login"}>
          <ListItemText primary={"Đăng nhập"}/>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton href={"/register"}>
          <ListItemText primary={"Đăng kí"}/>
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default LoginListItem;