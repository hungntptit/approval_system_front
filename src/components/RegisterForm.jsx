import {Box, Button, TextField} from "@mui/material";
import axios from "axios";
import Typography from "@mui/material/Typography";

function RegisterForm() {
  if (localStorage.getItem("token")) {
    window.location.replace("/");
  }

  function registerHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    if (formJson.password !== formJson.confirm_password) {
      window.alert("Mật khẩu không khớp!");
      return;
    }
    delete formJson["confirm_password"];
    axios.post(`http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/register`, JSON.stringify(formJson), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response);
      if (response.status === 200) {
        if (window.confirm("Đăng kí thành công. Chuyển hướng sang trang đăng nhập?")) {
          window.location.replace("/login");
        }
      }
    }).catch(function (error) {
      console.log(error);
      if (error.response) {
        window.alert(error.response.data.detail);
      }
    });
  }

  return (
    <Box width={400}>
      <form method={"post"} onSubmit={registerHandler}>
        <Typography sx={{my: 3}} variant={"h4"}>Đăng kí</Typography>
        <TextField
          sx={{m: 1}}
          label="Tên"
          type={"text"}
          name={"name"}
          required
          fullWidth
        />
        <TextField
          sx={{m: 1}}
          label="Tên đăng nhập"
          type={"text"}
          name={"username"}
          required
          fullWidth
        />
        <TextField
          sx={{m: 1}}
          label="Email"
          type={"email"}
          name={"email"}
          required
          fullWidth
        />
        <TextField
          sx={{m: 1}}
          label="Mật khẩu"
          type={"password"}
          name={"password"}
          required
          fullWidth
        />
        <TextField
          sx={{m: 1}}
          label="Xác nhận mật khẩu"
          type={"password"}
          name={"confirm_password"}
          required
          fullWidth
        />
        <Button sx={{my: 2}} variant="contained" type={"submit"}>Đăng kí</Button>
        <br/>
        <Button sx={{}} variant="text" href={"/login"}>Đăng nhập</Button>
      </form>
    </Box>
  );
}

export default RegisterForm;