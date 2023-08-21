import {Button, TextField} from "@mui/material";
import axios from "axios";
import Typography from "@mui/material/Typography";

function RoomForm() {
  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    axios.post(
      `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/rooms`,
      JSON.stringify(formJson),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200)
          if (window.confirm("Thêm phòng thành công.")) {
            window.location.replace("/rooms");
          }
      })
      .catch(function (error) {
        console.log(error);
        window.alert(error.response.data.detail);
      });
  }

  return (
    <form method={"post"} onSubmit={submitHandler}>
      <Typography variant={"h5"} fontWeight={"bold"} sx={{my: 2}}>Thêm phòng</Typography>
      <TextField
        sx={{m: 1}}
        label="Tên phòng"
        type={"text"}
        name={"name"}
        fullWidth
        size={"small"}
        required
      />
      <TextField
        sx={{m: 1}}
        label="Sức chứa"
        type={"number"}
        name={"capacity"}
        fullWidth
        size={"small"}
        required
      />
      <Button sx={{m: 2}} variant="contained" type={"submit"}>Thêm</Button>
    </form>
  );
}

export default RoomForm;