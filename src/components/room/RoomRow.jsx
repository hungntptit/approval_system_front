import {Button, TableCell, TableRow} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function RoomRow(props) {
  const navigate = useNavigate();
  const room = props.room;
  const role = props.role;

  function deleteRoomHandler(id) {
    if (window.confirm("Bạn có chắc không?")) {
      axios.delete(
        `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/rooms/` + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          console.log(response);
          if (response.status === 200)
            if (window.confirm("Xoá phòng thành công.")) {
              window.location.replace("/rooms");
            }
        })
        .catch(function (error) {
          console.log(error);
          window.alert(error.response.data.detail);
        });
    }
  }

  return (
    <TableRow key={room.id}>
      <TableCell>{room.id}</TableCell>
      <TableCell>{room.name}</TableCell>
      <TableCell>{room.capacity}</TableCell>
      <TableCell><Button onClick={() => navigate("/room/" + room.id)}>Edit</Button></TableCell>
      <TableCell><Button onClick={() => {
        deleteRoomHandler(room.id);
      }} color={"error"}>Delete</Button></TableCell>
    </TableRow>
  );

}

RoomRow.propTypes = {
  room: PropTypes.any.isRequired,
  role: PropTypes.any
};
export default RoomRow;