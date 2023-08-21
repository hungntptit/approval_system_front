import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import ResponsiveDrawer from "./ResponsiveDrawer.jsx";

function NotFound() {
  const navigate = useNavigate();
  return (
    <ResponsiveDrawer>
      <Box>
        <Typography variant={"h4"} sx={{m: 4}}>Not found</Typography>
        <Button variant={"text"} onClick={() => {
          navigate("/home");
        }}>Home</Button>
      </Box>
    </ResponsiveDrawer>
  );
}

export default NotFound;