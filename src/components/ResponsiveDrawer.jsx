import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import jwt from "jwt-decode";
import DrawerListItem from "./list_item/DrawerListItem.jsx";
import {Button, ButtonBase} from "@mui/material";
import {Image} from 'mui-image';


const drawerWidth = 240;

export default function ResponsiveDrawer({children}) {
  const [payload, setPayload] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      const token = localStorage.getItem('token');
      // console.log(token)
      const payload = jwt(token);
      setPayload(payload);
    }
  }, [localStorage]);

  function logoutHandler() {
    localStorage.clear();
    window.location.replace("/");
  }


  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar>
          {/*<IconButton*/}
          {/*  size="large"*/}
          {/*  edge="start"*/}
          {/*  color="inherit"*/}
          {/*  aria-label="menu"*/}
          {/*  sx={{mr: 2}}*/}
          {/*>*/}
          {/*</IconButton>*/}
          {/*<Image src={"/vite.svg"} width={48} sx={{flexGrow: 1}}/>*/}
          <Box display="flex" sx={{flexGrow: 1}}>
            <ButtonBase href={"/home"}>
              <Image src={"/vite.svg"} height={48} width={48} fit={"contain"} sx={{p: 1}}/>
              <Image src={"/react.svg"} height={48} width={48} fit={"contain"} sx={{p: 1}}/>
            </ButtonBase>
          </Box>
          {(() => {
            if (localStorage.getItem('token') != null) {
              return (
                <>
                  <Typography variant="h6" component="div" sx={{p: 2}}>
                    {payload.sub} ({payload.role})
                  </Typography>
                  <Button sx={{m: 2}} onClick={logoutHandler} color="inherit" variant={"outlined"}>Đăng xuất</Button>
                </>
              );
            } else {
              return (
                <Button href={"/login"} color="inherit" variant={"outlined"}>Đăng nhập</Button>
              );
            }
          })()}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        }}
      >
        <Toolbar/>
        <Box sx={{overflow: 'auto'}}>
          {localStorage.getItem("token") ? <DrawerListItem/> : <></>}
        </Box>
      </Drawer>
      {/*<Box component="main" sx={{flexGrow: 1, p: 3}}>*/}
      {/*<Toolbar/>*/}
      {/*</Box>*/}
      {children}
    </Box>
  )
    ;
}