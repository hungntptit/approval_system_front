import {Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import {useState} from "react";
import moment from "moment/moment.js";


function RoomBookingForm(props) {

  const [roomBooking, setRoomBooking] = useState({
    id: props.roomBooking.id,
    user_id: props.roomBooking.user_id,
    room_id: props.roomBooking.room_id,
    title: props.roomBooking.title,
    place: props.roomBooking.place,
    participation: props.roomBooking.participation,
    booking_date: moment(props.roomBooking.booking_date, "YYYY-MM-DD").format("DD/MM/YYYY"),
    start_time: moment(props.roomBooking.start_time, "HH:mm:ss").format("HH:mm"),
    end_time: moment(props.roomBooking.end_time, "HH:mm:ss").format("HH:mm")
  });


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setRoomBooking({
      ...roomBooking,
      [name]: value,
    });

    console.log(roomBooking);
  };

  function timeFromString(timeString) {
    let [hour, minute] = timeString.split(":");
    hour = parseInt(hour);
    minute = parseInt(minute);
    const time = new Date(0, 0, 0, hour, minute);
    return time;
  }

  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const user = props.user;


    formJson["user_id"] = user.id;
    formJson["room_id"] = parseInt(formJson["room_id"]);
    formJson["participation"] = parseInt(formJson["participation"]);
    const bkDate = moment(formJson["booking_date"], "DD/MM/YYYY");
    formJson["booking_date"] = bkDate.format("YYYY-MM-DD");

    const today = new Date();
    today.setHours(0, 0, 0, 0);


    if (bkDate.toDate() < today) {
      window.alert("Ngày đặt bắt đầu từ ngày hôm nay.");
      return;
    }

    if (timeFromString(formJson["start_time"]) >= timeFromString(formJson["end_time"])) {
      window.alert("Thời gian bắt đầu trước thời gian kết thúc.");
      return;
    }

    console.log(formJson);

    axios.put(
      `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/room_bookings/` + roomBooking.id,
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
          if (window.confirm("Cập nhật yêu cầu đặt phòng thành công.")) {
            window.location.reload();
          }
      })
      .catch(function (error) {
        console.log(error);
        window.alert(error.response.data.detail);
      });
  }


  function handleRoomChange(e, capacity) {
    console.log(capacity);
  }

  if (!localStorage.getItem("token")) {
    return "Not logged in";
  } else {
    const rooms = props.rooms;
    return (
      <form method={"post"} onSubmit={submitHandler} style={{}}>
        <Box component={Paper} sx={{p: 5}}>
          <TextField
            sx={{my: 1}}
            label="Tiêu đề"
            type={"text"}
            name={"title"}
            fullWidth size={"small"}
            required
            value={roomBooking.title}
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
            value={roomBooking.place}
            onChange={handleChange}
          />
          <FormControl sx={{my: 1}} fullWidth size={"small"} required>
            <InputLabel
              // id="demo-simple-select-label"
            >Phòng</InputLabel>
            <Select
              defaultValue=""
              fullWidth size={"small"}
              label="Phòng"
              name="room_id"
              value={roomBooking.room_id}
              onChange={handleChange}
              // onChange={handleRoomChange}
            >
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>{room.name} ({room.capacity}) </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{my: 1}}
            label="Số người"
            type={"number"}
            inputProps={{max: 50}}
            name={"participation"}
            fullWidth size={"small"}
            required
            value={roomBooking.participation}
            onChange={handleChange}
          />
          <TextField
            sx={{my: 1}}
            label="Ngày"
            placeholder="DD/MM/YYYY"
            type={"text"}
            name={"booking_date"}
            inputProps={{
              type: "text",
              pattern: "^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$",
            }}
            fullWidth size={"small"}
            required
            value={roomBooking.booking_date}
            onChange={handleChange}
          />
          <TextField
            sx={{my: 1, mx: 0, width: 0.49}}
            label="Thời gian bắt đầu"
            placeholder="HH:mm"
            type={"text"}
            name={"start_time"}
            inputProps={{
              type: "text",
              pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$",
            }}
            fullWidth size={"small"}
            required
            value={roomBooking.start_time}
            onChange={handleChange}
          />
          <TextField
            sx={{my: 1, mx: 1, width: 0.49}}
            label="Thời gian kết thúc"
            placeholder="HH:mm"
            type={"text"}
            name={"end_time"}
            inputProps={{
              type: "text",
              pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$",
            }}
            fullWidth size={"small"}
            required
            value={roomBooking.end_time}
            onChange={handleChange}
          />
        </Box>
        <Button sx={{my: 2, width: 0.2}} variant="contained" type={"submit"}>Cập nhật yêu cầu</Button>
      </form>
    );
  }
}

RoomBookingForm.propTypes = {
  roomBooking: PropTypes.any.isRequired,
  rooms: PropTypes.any,
  user: PropTypes.any
};

export default RoomBookingForm;