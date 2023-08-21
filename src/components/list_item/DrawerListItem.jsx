import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {useState} from "react";
import {Collapse} from "@mui/material";
import CustomListItem from "./CustomListItem.jsx";
import jwt from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faHouse, faListUl, faTable} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";


function DrawerListItem() {
  const [open, setOpen] = useState(false);

  let payload = jwt(localStorage.getItem("token"));

  const handleClick = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  return (
    <>
      <Divider/>
      <List>
        <CustomListItem text={"Trang chủ"} onClick={() => {
          navigate("/home");
        }}><FontAwesomeIcon icon={faHouse}/></CustomListItem>
        {(() => {
          if (["hr"].includes(payload.role)) {
            return (
              <>
                <CustomListItem text={"Quản lý phòng họp"} onClick={() => {
                  navigate("/rooms");
                }}>
                  <FontAwesomeIcon icon={faTable}/></CustomListItem>
                {/*<CustomListItem text={"Quản lý phòng ban"} onClick={() => {*/}
                {/*  navigate("/departments");*/}
                {/*}}>*/}
                {/*  <FontAwesomeIcon icon={faBuilding}/></CustomListItem>*/}
              </>
            );
          }
        })()}
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faChartLine}/>
            </ListItemIcon>
            <ListItemText primary={"Thống kê"}/>
            {open ? <ExpandLess/> : <ExpandMore/>}
          </ListItemButton>
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {(() => {
              let listItems = [];
              if (["user", "hr", "manager"].includes(payload.role)) {
                listItems.push(<CustomListItem text={"Yêu cầu đặt phòng"} onClick={() => {
                    navigate("/room_bookings");
                  }} sx={{pl: 4}}><FontAwesomeIcon icon={faListUl}/></CustomListItem>
                );
              }
              if (["user", "driver", "manager"].includes(payload.role)
              ) {
                listItems.push(<CustomListItem text={"Yêu cầu đặt xe"} onClick={() => {
                    navigate("/car_bookings");
                  }} sx={{pl: 4}}><FontAwesomeIcon icon={faListUl}/></CustomListItem>
                );
              }
              if (["user", "manager", "hr", "tech"].includes(payload.role)
              ) {
                listItems.push(<CustomListItem text={"Yêu cầu mua hàng"} onClick={() => {
                    navigate("/buying_requests");
                  }} sx={{pl: 4}}><FontAwesomeIcon icon={faListUl}/></CustomListItem>
                );
              }
              return (<>{...listItems}</>);
            })()
            }

          </List>
        </Collapse>
      </List>
    </>
  )
    ;
}

export default DrawerListItem;