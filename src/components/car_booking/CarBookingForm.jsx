import {Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import Typography from "@mui/material/Typography";


function CarBookingForm(props) {


  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const user = props.user;


    formJson["user_id"] = user.id;
    formJson["car_id"] = parseInt(formJson["car_id"]);

    let startTime = moment(formJson["start_time"], "DD/MM/YYYY HH:mm");
    formJson["start_time"] = startTime.format("YYYY-MM-DD HH:mm");
    let endTime = moment(formJson["end_time"], "DD/MM/YYYY HH:mm");
    formJson["end_time"] = endTime.format("YYYY-MM-DD HH:mm");

    const today = new Date().getTime();
    // console.log(today)
    // console.log(startTime.toDate().getTime())

    if (startTime.toDate().getTime() < today) {
      window.alert("Thời gian bắt đầu từ thời điểm hiện tại.");
      return;
    }

    if (startTime.toDate().getTime() >= endTime.toDate().getTime()) {
      window.alert("Thời gian bắt đầu trước thời gian kết thúc.");
      return;
    }

    console.log(formJson);

    axios.post(
      `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/car_bookings`,
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
          if (window.confirm("Yêu cầu đặt xe thành công.")) {
            window.location.replace("/");
          }
      })
      .catch(function (error) {
        console.log(error);
        window.alert(error.response.data.detail);
      });
  }

  if (!localStorage.getItem("token")) {
    return "Not logged in.";
  } else {
    const cars = props.cars;
    return (
      <form method={"post"} onSubmit={submitHandler} style={{"marginTop": 50}}>
        <Typography variant={"h5"} fontWeight={"bold"} sx={{my: 2}}>Yêu cầu đặt xe</Typography>
        <Box component={Paper} sx={{p: 4}}>
          <TextField
            sx={{my: 1}}
            label="Tiêu đề"
            type={"text"}
            name={"title"}
            fullWidth size={"small"}
            required
          />
          <br/>
          <TextField
            sx={{my: 1}}
            label="Địa điểm"
            type={"text"}
            name={"place"}
            fullWidth size={"small"}
            required
          />
          <FormControl sx={{my: 1}} fullWidth size={"small"} required>
            <InputLabel
              // id="demo-simple-select-label"
            >Xe</InputLabel>
            <Select
              defaultValue=""
              fullWidth size={"small"}
              label="Xe"
              name="car_id"
              // onChange={handleRoomChange}
            >
              {cars.map((car) => (
                <MenuItem key={car.id} value={car.id}>{car.name} ({car.seats}) </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{my: 1, mx: 0, width: 0.49}}
            label="Ngày bắt đầu"
            placeholder="DD/MM/YYYY HH:mm"
            type={"text"}
            name={"start_time"}
            inputProps={{
              type: "text",
              pattern: "^([1-9]|([012][0-9])|(3[01]))\\/([0]{0,1}[1-9]|1[012])\\/\\d\\d\\d\\d\\s([0-1]?[0-9]|2?[0-3]):([0-5]\\d)$",
            }}
            fullWidth size={"small"}
            required
          />
          <TextField
            sx={{my: 1, mx: 1, width: 0.49}}
            label="Ngày kết thúc"
            placeholder="DD/MM/YYYY HH:mm"
            type={"text"}
            name={"end_time"}
            inputProps={{
              type: "text",
              pattern: "^([1-9]|([012][0-9])|(3[01]))\\/([0]{0,1}[1-9]|1[012])\\/\\d\\d\\d\\d\\s([0-1]?[0-9]|2?[0-3]):([0-5]\\d)$",
            }}
            fullWidth size={"small"}
            required
          />
          <TextField
            sx={{my: 1, mx: 0, width: 0.49}}
            label="Nơi bắt đầu"
            type={"text"}
            name={"origin"}
            fullWidth size={"small"}
            required
          />
          <TextField
            sx={{my: 1, mx: 1, width: 0.49}}
            label="Nơi kết thúc"
            type={"text"}
            name={"destination"}
            fullWidth size={"small"}
            required
          />
          <TextField
            sx={{my: 1, mx: 0, width: 0.49}}
            label="Khoảng cách"
            placeholder={"km"}
            type={"number"}
            name={"distance"}
            fullWidth size={"small"}
            required
          />
          <TextField
            sx={{my: 1, mx: 1, width: 0.49}}
            label="Số người"
            type={"number"}
            inputProps={{max: 50}}
            name={"number_of_people"}
            fullWidth size={"small"}
            required
          />
        </Box>
        <Button sx={{my: 2, width: 0.2}} variant="contained" type={"submit"}>Gửi yêu cầu</Button>
      </form>
    );
  }
}

CarBookingForm.propTypes = {
  cars: PropTypes.any,
  user: PropTypes.any
};

export default CarBookingForm;