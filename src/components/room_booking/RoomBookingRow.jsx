import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableCell,
  TableRow
} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import {blueGrey, grey} from "@mui/material/colors";
import {useState} from "react";
import RoomBookingEditForm from "./RoomBookingEditForm.jsx";
import moment from "moment";

function RoomBookingRow(props) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const roomBooking = props.roomBooking;
  const user = props.user;
  const rooms = props.rooms;
  const role = user.role;

  function handleApprove(id) {
    if (window.confirm("Bạn có chắc không?")) {
      axios.put(`http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/room_bookings/` + id, null, {
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
      axios.put(`http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/room_bookings/` + id, null, {
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
  if (roomBooking.process_step.step > 1) color = "warning";
  if (roomBooking.status.includes("đã từ chối")) color = "error";
  if (roomBooking.status.includes("hoàn thành")) color = "success";

  let check = (role === roomBooking.process_step.role) & (!roomBooking.is_done)


  return (
    <>
      <TableRow key={roomBooking.id}
                sx={{
                  cursor: "pointer",
                  '&:hover': {backgroundColor: grey[100]},
                  '&:active': {backgroundColor: blueGrey[50]}
                }}
                onClick={() => {
                  setOpenDetail(true);
                }}
      >
        <TableCell>{roomBooking.title}</TableCell>
        <TableCell>{roomBooking.room.name} ({roomBooking.room.capacity})</TableCell>
        <TableCell>{roomBooking.place}</TableCell>
        <TableCell>{roomBooking.participation}</TableCell>
        <TableCell>{roomBooking.booking_date}</TableCell>
        <TableCell>{moment(roomBooking.start_time, "HH:mm:ss").format("HH:mm")}</TableCell>
        <TableCell>{moment(roomBooking.end_time, "HH:mm:ss").format("HH:mm")}</TableCell>
        <TableCell>
          <Chip
            label={roomBooking.status}
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
                <TableCell><Button variant={"outlined"} onClick={() => handleDeny(roomBooking.id)}
                                   color={"error"}>Từ chối</Button></TableCell>
                <TableCell><Button variant={"contained"}
                                   onClick={() => handleApprove(roomBooking.id)}>Phê duyệt</Button></TableCell>
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
        <DialogTitle>Chi tiết yêu cầu đặt phòng</DialogTitle>
        <DialogContent>
          <Table>
            <TableRow>
              <TableCell sx={{border: 0}}>Tiêu đề:</TableCell>
              <TableCell sx={{border: 0}}>{roomBooking.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{border: 0}}>Phòng:</TableCell>
              <TableCell sx={{border: 0}}>{roomBooking.room.name} ({roomBooking.room.capacity})</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{border: 0}}>Địa điểm:</TableCell>
              <TableCell sx={{border: 0}}>{roomBooking.place}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{border: 0}}>Số người:</TableCell>
              <TableCell sx={{border: 0}}>{roomBooking.participation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{border: 0}}>Ngày đặt:</TableCell>
              <TableCell sx={{border: 0}}>{roomBooking.booking_date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{border: 0}}>Thời gian bắt đầu:</TableCell>
              <TableCell sx={{border: 0}}>{moment(roomBooking.start_time, "HH:mm:ss").format("HH:mm")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{border: 0}}>Thời gian kết thúc:</TableCell>
              <TableCell sx={{border: 0}}>{moment(roomBooking.end_time, "HH:mm:ss").format("HH:mm")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{border: 0}}>Trạng thái:</TableCell>
              <TableCell sx={{border: 0}}>
                <Chip
                  label={roomBooking.status}
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
                          onClick={() => handleDeny(roomBooking.id)} color={"error"}>Từ
                    chối</Button>
                  <Button variant={"contained"}
                          onClick={() => handleApprove(roomBooking.id)}>Phê duyệt</Button>
                </>
              );
            }
            if (role === "user" && roomBooking.process_step.step === 1 && roomBooking.is_done === false) {
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
        <DialogTitle sx={{width: 0.5}}>Sửa yêu cầu đặt phòng</DialogTitle>
        <DialogContent>
          <RoomBookingEditForm roomBooking={roomBooking} rooms={rooms} user={user}/>
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

RoomBookingRow.propTypes = {
  roomBooking: PropTypes.any.isRequired,
  rooms: PropTypes.any.isRequired,
  user: PropTypes.any
};
export default RoomBookingRow;