import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import RoomBookingRow from "./RoomBookingRow.jsx";
import PropTypes from "prop-types";

function RoomBookingList(props) {

  if (!localStorage.getItem("token")) {
    return "Not logged in.";
  } else {
    const roomBookings = props.roomBookings;
    const rooms = props.rooms;
    const user = props.user;
    const role = user.role;
    return (
      <TableContainer sx={{mt: 10}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Địa điểm</TableCell>
              <TableCell>Số người</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Thời gian bắt đầu</TableCell>
              <TableCell>Thời gian kết thúc</TableCell>
              <TableCell>Trạng thái</TableCell>
              {["hr", "manager"].includes(role) ?
                <>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </> : <></>}
            </TableRow>
          </TableHead>
          <TableBody>
            {roomBookings.map((roomBooking) => (
              <RoomBookingRow key={roomBooking.id} roomBooking={roomBooking} rooms={rooms} user={user}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

RoomBookingList.propTypes = {
  roomBookings: PropTypes.any.isRequired,
  rooms: PropTypes.any,
  user: PropTypes.any
};

export default RoomBookingList;