import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {ExpandLess, ExpandMore, FormatListBulleted, Home, MeetingRoom, ShowChart} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CustomListItem from "./CustomListItem.jsx";
import {Collapse} from "@mui/material";
import {useState} from "react";

function HrListItem() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Divider/>
      <List>
        <CustomListItem text={"Trang chủ"} href="/"><Home/></CustomListItem>
        <CustomListItem text={"Phòng"} href="/rooms"><MeetingRoom/></CustomListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <ShowChart/>
            </ListItemIcon>
            <ListItemText primary="Thống kê"/>
            {open ? <ExpandLess/> : <ExpandMore/>}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <CustomListItem text={"Yêu cầu"} href={"/requests"} sx={{pl: 4}}><FormatListBulleted/></CustomListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
}

export default HrListItem;