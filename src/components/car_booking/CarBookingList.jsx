import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import CarBookingRow from "./CarBookingRow.jsx";
import PropTypes from "prop-types";

function CarBookingList(props) {

  if (!localStorage.getItem("token")) {
    return "Not logged in.";
  } else {
    const carBookings = props.carBookings;
    const cars = props.cars;
    const user = props.user;

    return (
      <TableContainer sx={{mt: 10}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Xe</TableCell>
              <TableCell>Địa điểm</TableCell>
              <TableCell>Thời gian bắt đầu</TableCell>
              <TableCell>Thời gian kết thúc</TableCell>
              <TableCell>Nơi bắt đầu</TableCell>
              <TableCell>Nơi kết thúc</TableCell>
              <TableCell>Trạng thái</TableCell>
              {["driver", "manager"].includes(user.role) ?
                <>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </> : <></>}
            </TableRow>
          </TableHead>
          <TableBody>
            {carBookings.map((carBooking) => (
              <CarBookingRow key={carBooking.id} carBooking={carBooking} user={user} cars={cars}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

CarBookingList.propTypes = {
  carBookings: PropTypes.any.isRequired,
  cars: PropTypes.any.isRequired,
  user: PropTypes.any
};

export default CarBookingList;