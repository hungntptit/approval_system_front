import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {FormatListBulleted} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function ManagerListItem() {
  return (
    <>
      <Divider/>
      <List>
        <ListItem disablePadding>
          <ListItemButton href={"/requests"}>
            <ListItemIcon>
              <FormatListBulleted/>
            </ListItemIcon>
            <ListItemText primary="Yêu cầu"/>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default ManagerListItem;