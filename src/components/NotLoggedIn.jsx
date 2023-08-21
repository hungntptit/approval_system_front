import {Box, Button} from "@mui/material";

function NotLoggedIn() {
  return (
    <Box>
      <Button sx={{my: 2}} href={"/register"} variant="contained" type={"button"}>Đăng nhập</Button>
      <br/>
      <Button sx={{}} href={"/register"} variant="text" type={"button"}>Đăng kí</Button>
    </Box>
  );
}

export default NotLoggedIn;
