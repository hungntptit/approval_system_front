import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import {useState} from "react";
import {blueGrey, grey} from "@mui/material/colors";
import CarBookingEditForm from "./CarBookingEditForm.jsx";
import moment from "moment";

function CarBookingRow(props) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const carBooking = props.carBooking;
  const cars = props.cars;
  const user = props.user;
  const role = user.role;

  function handleApprove(id) {
    if (window.confirm("Bạn có chắc không?")) {
      axios.put(`http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/car_bookings/` + id, null, {
        params: {
          action: "approve"
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }).then(response => {
        console.log(response);
        if (window.confirm("Duyệt thành công.")) {
          window.location.reload();
        }
      }).catch(error => {
        console.log(error);
        window.alert(error.response.data.detail);
      });
    }
  }

  function handleDeny(id) {
    if (window.confirm("Bạn có chắc không?")) {
      axios.put(`http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/car_bookings/` + id, null, {
        params: {
          action: "deny"
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }).then(response => {
        console.log(response);
        if (window.confirm("Từ chối thành công.")) {
          window.location.reload();
        }
      }).catch(error => {
        console.log(error);
        window.alert(error.response.data.detail);
      });
    }
  }


  let color = "default";
  if (carBooking.process_step.step > 1) color = "warning";
  if (carBooking.status.includes("đã từ chối")) color = "error";
  if (carBooking.status.includes("hoàn thành")) color = "success";

  let check = (role === carBooking.process_step.role) & (!carBooking.is_done)

  let startTime = moment(carBooking.start_time, "YYYY-MM-DDTHH:mm").format("DD/MM/YYYY HH:mm");
  let endTime = moment(carBooking.end_time, "YYYY-MM-DDTHH:mm").format("DD/MM/YYYY HH:mm");

  return (
    <>
      <TableRow key={carBooking.id} sx={{
        cursor: "pointer",
        '&:hover': {backgroundColor: grey[100]},
        '&:active': {backgroundColor: blueGrey[50]}
      }} onClick={() => {
        setOpenDetail(true);
      }}
      >
        <TableCell>{carBooking.title}</TableCell>
        <TableCell>{carBooking.car.name} ({carBooking.car.seats})</TableCell>
        <TableCell>{carBooking.place}</TableCell>
        <TableCell>{startTime}</TableCell>
        <TableCell>{endTime}</TableCell>
        <TableCell>{carBooking.origin}</TableCell>
        <TableCell>{carBooking.destination}</TableCell>
        <TableCell>
          <Chip
            label={carBooking.status}
            size="small"
            color={color}
            sx={{
              height: 'auto',
              '& .MuiChip-label': {
                display: 'block',
                whiteSpace: 'normal',
              },
            }}
          />
        </TableCell>
        {(() => {
          if (check) {
            return (
              <>
                <TableCell><Button variant={"outlined"} onClick={() => handleDeny(carBooking.id)}
                                   color={"error"}>Từ chối</Button></TableCell>
                <TableCell><Button variant={"contained"}
                                   onClick={() => handleApprove(carBooking.id)}>Phê duyệt</Button></TableCell>
              </>
            );
          } else {
            return (
              <>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </>
            );
          }
        })()}
      </TableRow>
      <Dialog
        open={openDetail}
        onClose={() => {
          setOpenDetail(false);
        }}
        fullWidth
      >
        <DialogTitle sx={{width: 0.5}}>Chi tiết yêu cầu đặt xe</DialogTitle>
        <DialogContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{border: 0}}>Tiêu đề:</TableCell>
                <TableCell sx={{border: 0}}>{carBooking.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>ID xe:</TableCell>
                <TableCell sx={{border: 0}}>{carBooking.car_id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Địa điểm:</TableCell>
                <TableCell sx={{border: 0}}>{carBooking.place}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Thời gian bắt đầu:</TableCell>
                <TableCell sx={{border: 0}}>{startTime}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Thời gian kết thúc:</TableCell>
                <TableCell sx={{border: 0}}>{endTime}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Nơi bắt đầu:</TableCell>
                <TableCell sx={{border: 0}}>
                  {carBooking.origin}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Nơi kết thúc:</TableCell>
                <TableCell sx={{border: 0}}>{carBooking.destination}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Khoảng cách:</TableCell>
                <TableCell sx={{border: 0}}>{carBooking.distance}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Số người:</TableCell>
                <TableCell sx={{border: 0}}>{carBooking.number_of_people}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Trạng thái:</TableCell>
                <TableCell sx={{border: 0}}>
                  <Chip
                    label={carBooking.status}
                    size="small"
                    color={color}
                    sx={{
                      height: 'auto',
                      '& .MuiChip-label': {
                        display: 'block',
                        whiteSpace: 'normal',
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button sx={{m: 1}} onClick={() => {
            setOpenDetail(false);
          }}>Đóng</Button>
          <div style={{flex: '1 0 0'}}/>
          {(() => {
            if (check) {
              return (
                <>
                  <Button variant={"outlined"}
                          onClick={() => handleDeny(carBooking.id)} color={"error"}>Từ
                    chối</Button>
                  <Button variant={"contained"}
                          onClick={() => handleApprove(carBooking.id)}>Phê duyệt</Button>
                </>
              );
            }
            if (role === "user" && carBooking.process_step.step === 1 && carBooking.is_done === false) {
              return (
                <>
                  <Button sx={{m: 1}} variant={"outlined"}
                          onClick={() => {
                            setOpenDetail(false);
                            setOpenEdit(true);
                          }}
                  >Sửa</Button>
                </>
              );
            }
          })()}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
        fullScreen
        sx={{m: 10}}
      >
        <DialogTitle sx={{width: 0.5}}>Sửa yêu cầu đặt xe</DialogTitle>
        <DialogContent>
          <CarBookingEditForm carBooking={carBooking} cars={cars} user={user}/>
        </DialogContent>
        <DialogActions>
          <Button sx={{m: 1}} onClick={() => {
            setOpenEdit(false);
          }}>Đóng</Button>

        </DialogActions>
      </Dialog>
    </>
  );
}

CarBookingRow.propTypes = {
  carBooking: PropTypes.any.isRequired,
  cars: PropTypes.any.isRequired,
  user: PropTypes.any
};
export default CarBookingRow;