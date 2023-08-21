import {Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import {useState} from "react";


function CarBookingEditForm(props) {

  // const cars = props.cars;
  // const user = props.user;

  const [carBooking, setCarBooking] = useState({
    id: props.carBooking.id,
    user_id: props.carBooking.user_id,
    car_id: props.carBooking.car_id,
    title: props.carBooking.title,
    place: props.carBooking.place,
    start_time: moment(props.carBooking.start_time, "YYYY-MM-DDTHH:mm").format("DD/MM/YYYY HH:mm"),
    end_time: moment(props.carBooking.end_time, "YYYY-MM-DDTHH:mm").format("DD/MM/YYYY HH:mm"),
    origin: props.carBooking.origin,
    destination: props.carBooking.destination,
    distance: props.carBooking.distance,
    number_of_people: props.carBooking.number_of_people
  });


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setCarBooking({
      ...carBooking,
      [name]: value,
    });

    console.log(carBooking);
  };


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

    axios.put(
      `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/car_bookings/` + carBooking.id,
      JSON.stringify(formJson),
      {
        params: {
          action: "update"
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200)
          if (window.confirm("Cập nhật yêu cầu đặt xe thành công.")) {
            window.location.reload();
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
      <form method={"put"} onSubmit={submitHandler}>
        <Box component={Paper} sx={{p: 4}}>
          <TextField
            sx={{my: 1}}
            label="Tiêu đề"
            type={"text"}
            name={"title"}
            fullWidth size={"small"}
            required
            value={carBooking.title}
            onChange={handleChange}
          />
          <br/>
          <TextField
            sx={{my: 1}}
            label="Địa điểm"
            type={"text"}
            name={"place"}
            fullWidth size={"small"}
            required
            value={carBooking.place}
            onChange={handleChange}
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
              value={carBooking.car_id}
              onChange={handleChange}
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
            value={carBooking.start_time}
            onChange={handleChange}
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
            value={carBooking.end_time}
            onChange={handleChange}
          />
          <TextField
            sx={{my: 1, mx: 0, width: 0.49}}
            label="Nơi bắt đầu"
            type={"text"}
            name={"origin"}
            fullWidth size={"small"}
            required
            value={carBooking.origin}
            onChange={handleChange}
          />
          <TextField
            sx={{my: 1, mx: 1, width: 0.49}}
            label="Nơi kết thúc"
            type={"text"}
            name={"destination"}
            fullWidth size={"small"}
            required
            value={carBooking.destination}
            onChange={handleChange}
          />
          <TextField
            sx={{my: 1, mx: 0, width: 0.49}}
            label="Khoảng cách"
            placeholder={"km"}
            type={"number"}
            name={"distance"}
            fullWidth size={"small"}
            required
            value={carBooking.distance}
            onChange={handleChange}
          />
          <TextField
            sx={{my: 1, mx: 1, width: 0.49}}
            label="Số người"
            type={"number"}
            inputProps={{max: 50}}
            name={"number_of_people"}
            fullWidth size={"small"}
            required
            value={carBooking.number_of_people}
            onChange={handleChange}
          />
        </Box>
        <Button sx={{my: 2, width: 0.2}} variant="contained" type={"submit"}>Cập nhật yêu cầu</Button>
      </form>
    );
  }
}

CarBookingEditForm.propTypes = {
  carBooking: PropTypes.any.isRequired,
  cars: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired,
};

export default CarBookingEditForm;