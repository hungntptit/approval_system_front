import {Box, Button, TextField} from "@mui/material";
import axios from "axios";
import Typography from "@mui/material/Typography";

function LoginForm() {
  if (localStorage.getItem("token")) {
    window.location.replace("/");
  }

  function loginHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);

    axios.post(`http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/login`, JSON.stringify(formJson), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      // console.log(response);
      // console.log(response.data);
      const token = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      window.location.replace("/home");
    }).catch(function (error) {
      console.log(error);
      if (error.response) {
        window.alert(error.response.data.detail);
      }
    });
  }

  return (
    <Box width={400}>
      <form method={"post"} onSubmit={loginHandler}>
        <Typography sx={{my: 3}} variant={"h4"}>Đăng nhập</Typography>
        <TextField
          sx={{m: 1}}
          label="Tên đăng nhập"
          type={"text"}
          name={"username"}
          fullWidth
          required
        />
        <TextField
          sx={{m: 1}}
          label="Mật khẩu"
          type={"password"}
          name={"password"}
          fullWidth
          required
        />
        <Button sx={{my: 2}} variant="contained" type={"submit"}>Đăng nhập</Button>
        <br/>
        <Button sx={{}} href={"/register"} variant="text" type={"button"}>Đăng kí</Button>
      </form>
    </Box>
  );
}

export default LoginForm;