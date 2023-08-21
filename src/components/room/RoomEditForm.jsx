import {Button, TextField} from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function RoomForm() {

  let params = useParams();
  console.log(params.id);
  const id = parseInt(params.id);

  const [room, setRoom] = useState({
    name: "",
    capacity: 0,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setRoom({
      ...room,
      [name]: value,
    });
  };


  useEffect(() => {
    const url = `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/rooms/` + id;
    axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    ).then((response) => {
      setRoom(response.data);
      // console.log(response.data)
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    formJson["capacity"] = parseInt(formJson["capacity"]);
    console.log(formJson);
    axios.put(
      `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/rooms/` + id,
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
          if (window.confirm("Cập nhật phòng thành công.")) {
            window.location.replace("/rooms");
          }
      })
      .catch(function (error) {
        console.log(error);
        window.alert(error.response.data.detail);
      });
  }

  return (
    <form method={"put"} onSubmit={submitHandler}>
      <h2>Edit Room</h2>
      <TextField
        sx={{m: 1}}
        label="Room name"
        type={"text"}
        name={"name"}
        value={room.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        sx={{m: 1}}
        label="Room capacity"
        type={"number"}
        name={"capacity"}
        value={room.capacity}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button sx={{m: 2}} variant="contained" type={"submit"}>Update</Button>
    </form>
  );
}

export default RoomForm;