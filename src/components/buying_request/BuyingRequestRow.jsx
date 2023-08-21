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
import moment from "moment";
import {blueGrey, grey} from "@mui/material/colors";
import {useState} from "react";
import BuyingRequestEditForm from "./BuyingRequestEditForm.jsx";

function BuyingRequestRow(props) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const buyingRequest = props.buyingRequest;
  // console.log(buyingRequest);
  const departments = props.departments;
  const user = props.user;
  const role = user.role;

  function handleApprove(id) {
    if (window.confirm("Bạn có chắc không?")) {
      axios.put(`.+$.+` + id, null, {
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
      axios.put(`1` + id, null, {
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
  if (buyingRequest.process_step.step > 1) color = "warning";
  if (buyingRequest.status.includes("đã từ chối")) color = "error";
  if (buyingRequest.status.includes("hoàn thành")) color = "success";

  let check = (role === buyingRequest.process_step.role) & (!buyingRequest.is_done)

  return (
    <>
      <TableRow key={buyingRequest.id}
                sx={{
                  cursor: "pointer",
                  '&:hover': {backgroundColor: grey[100]},
                  '&:active': {backgroundColor: blueGrey[50]}
                }}
                onClick={() => {
                  setOpenDetail(true);
                }}>
        <TableCell>{buyingRequest.department.name}</TableCell>
        <TableCell>{buyingRequest.title}</TableCell>
        <TableCell>{buyingRequest.description}</TableCell>
        <TableCell>{moment(buyingRequest.approve_before, "YYYY-MM-DDTHH:mm").format("DD/MM/YYYY HH:mm")}</TableCell>
        <TableCell>
          <Chip
            label={buyingRequest.status}
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
                <TableCell><Button variant={"outlined"} onClick={() => handleDeny(buyingRequest.id)}
                                   color={"error"}>Từ chối</Button></TableCell>
                <TableCell><Button variant={"contained"}
                                   onClick={() => handleApprove(buyingRequest.id)}>Phê duyệt</Button></TableCell>
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
        <DialogTitle>Chi tiết yêu cầu mua hàng </DialogTitle>
        <DialogContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{border: 0}}>Phòng ban:</TableCell>
                <TableCell sx={{border: 0}}>{buyingRequest.department.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Tiêu đề</TableCell>
                <TableCell sx={{border: 0}}>{buyingRequest.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Mô tả:</TableCell>
                <TableCell sx={{border: 0}}>{buyingRequest.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Ngày yêu cầu:</TableCell>
                <TableCell
                  sx={{border: 0}}>{moment(buyingRequest.created_at, "YYYY-MM-DDTHH:mm").format("DD/MM/YYYY HH:mm")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Phê duyệt trước ngày:</TableCell>
                <TableCell
                  sx={{border: 0}}>{moment(buyingRequest.approve_before, "YYYY-MM-DDTHH:mm").format("DD/MM/YYYY HH:mm")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Địa điểm:</TableCell>
                <TableCell sx={{border: 0}}>{buyingRequest.place}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Bước:</TableCell>
                <TableCell sx={{border: 0}}>{buyingRequest.process_step.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: 0}}>Trạng thái:</TableCell>
                <TableCell sx={{border: 0}}>
                  <Chip
                    label={buyingRequest.status}
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
                          onClick={() => handleDeny(buyingRequest.id)} color={"error"}>Từ
                    chối</Button>
                  <Button variant={"contained"}
                          onClick={() => handleApprove(buyingRequest.id)}>Phê duyệt</Button>
                </>
              );
            }
            if (role === "user" && buyingRequest.process_step.step === 1 && buyingRequest.is_done === false) {
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
        <DialogTitle sx={{width: 0.5}}>Sửa yêu cầu mua hàng</DialogTitle>
        <DialogContent>
          <BuyingRequestEditForm buyingRequest={buyingRequest} departments={departments} user={user}/>
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

BuyingRequestRow.propTypes = {
  buyingRequest: PropTypes.any.isRequired,
  departments: PropTypes.any.isRequired,
  user: PropTypes.any
};
export default BuyingRequestRow;