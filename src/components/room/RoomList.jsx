import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import PropTypes from "prop-types";
import RoomRow from "./RoomRow.jsx";
import {useNavigate} from "react-router-dom";

function RoomList(props) {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    return "Not logged in.";
  } else {
    const rooms = props.rooms;
    const role = props.role;
    console.log(role);
    return (
      <Container>
        <Button sx={{mt: 8}} onClick={() => {
          navigate("/room");
        }} variant="contained">Thêm phòng</Button>
        <TableContainer sx={{mt: 2}} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <RoomRow key={room.id} room={room} role={role}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

RoomList.propTypes = {
  rooms: PropTypes.any.isRequired,
  role: PropTypes.any
};
export default RoomList;